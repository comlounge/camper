#!/usr/bin/env python
# coding=utf-8
"""
Get Active Registration Barcamps

This script finds barcamps with active registration and reports on their
admins and registered participants. This is useful for notifying barcamp
organizers about future changes before implementing them.

Usage:
    # Get human-readable summary
    python scripts/get_active_barcamps.py --config etc/dev.ini

    # Export to CSV for email campaigns
    python scripts/get_active_barcamps.py --config etc/production.ini --format csv > active_barcamps.csv

    # Get all email addresses for bulk notification
    python scripts/get_active_barcamps.py --config etc/production.ini --format emails > notification_list.txt

    # Find barcamps with real participants (not just admins testing)
    python scripts/get_active_barcamps.py --config etc/production.ini --only-non-admin

    # Include waiting list participants
    python scripts/get_active_barcamps.py --config etc/production.ini --include-waiting-list --format emails
"""

import sys
import argparse
import json
import csv
import datetime
from bson import ObjectId
import pymongo


def parse_config(config_file):
    """Parse config file to extract MongoDB connection details.

    Args:
        config_file: Path to .ini config file

    Returns:
        Tuple of (mongodb_url, mongodb_name)
    """
    mongodb_url = None
    mongodb_name = None

    with open(config_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line.startswith('mongodb_url'):
                mongodb_url = line.split(':', 1)[1].strip()
            elif line.startswith('mongodb_name'):
                mongodb_name = line.split(':', 1)[1].strip()

    if not mongodb_url or not mongodb_name:
        raise ValueError("Could not find mongodb_url and mongodb_name in config file")

    return mongodb_url, mongodb_name


def get_active_registration_barcamps(db):
    """Query MongoDB for barcamps with active registration.

    Args:
        db: MongoDB database connection

    Returns:
        List of barcamp documents
    """
    today = datetime.date.today()
    today_datetime = datetime.datetime.combine(today, datetime.time.min)

    query = {
        'workflow': 'registration',
        'end_date': {'$gte': today_datetime}
    }

    barcamps = list(db.barcamps.find(query))
    return barcamps


def collect_user_ids(barcamp, include_waiting_list=False):
    """Collect user IDs from barcamp (admins, participants, waiting list).

    Args:
        barcamp: Barcamp document
        include_waiting_list: Whether to include waiting list participants

    Returns:
        Tuple of (admin_ids_set, participant_ids_set, waiting_list_ids_set, event_details)
    """
    admin_ids = set(barcamp.get('admins', []))
    participant_ids = set()
    waiting_list_ids = set()
    event_details = []

    events = barcamp.get('events', {})
    for event_name, event_data in events.items():
        participants = event_data.get('participants', [])
        waiting_list = event_data.get('waiting_list', [])

        participant_ids.update(participants)
        if include_waiting_list:
            waiting_list_ids.update(waiting_list)

        event_details.append({
            'name': event_name,
            'participant_count': len(participants),
            'waiting_list_count': len(waiting_list)
        })

    return admin_ids, participant_ids, waiting_list_ids, event_details


def lookup_users(db, user_id_strings, skip_deleted=True):
    """Lookup user details from MongoDB.

    Args:
        db: MongoDB database connection
        user_id_strings: List/set of user ID strings
        skip_deleted: Whether to skip deleted users

    Returns:
        Tuple of (list of user dicts, deleted_count, invalid_count)
    """
    if not user_id_strings:
        return [], 0, 0

    object_ids = []
    invalid_count = 0

    for user_id_str in user_id_strings:
        try:
            object_ids.append(ObjectId(user_id_str))
        except Exception as e:
            print >> sys.stderr, "Warning: Invalid user ID '%s': %s" % (user_id_str, e)
            invalid_count += 1

    if not object_ids:
        return [], 0, invalid_count

    users = list(db.users.find(
        {'_id': {'$in': object_ids}},
        {'_id': 1, 'email': 1, 'fullname': 1, 'deleted': 1}
    ))

    deleted_count = 0
    active_users = []

    for user in users:
        if skip_deleted and user.get('deleted', False):
            deleted_count += 1
        else:
            active_users.append(user)

    return active_users, deleted_count, invalid_count


def process_barcamp(db, barcamp, include_waiting_list=False):
    """Process a single barcamp to collect all relevant data.

    Args:
        db: MongoDB database connection
        barcamp: Barcamp document
        include_waiting_list: Whether to include waiting list participants

    Returns:
        Dict with structured barcamp data
    """
    # Collect user IDs
    admin_ids, participant_ids, waiting_list_ids, event_details = collect_user_ids(
        barcamp, include_waiting_list
    )

    # Lookup users
    admins, admin_deleted, admin_invalid = lookup_users(db, admin_ids, skip_deleted=True)
    participants, participant_deleted, participant_invalid = lookup_users(db, participant_ids, skip_deleted=True)
    waiting_list_users = []
    waiting_list_deleted = 0
    waiting_list_invalid = 0

    if include_waiting_list:
        waiting_list_users, waiting_list_deleted, waiting_list_invalid = lookup_users(
            db, waiting_list_ids, skip_deleted=True
        )

    # Determine if there are non-admin participants
    has_non_admin_participants = bool(participant_ids - admin_ids)

    return {
        'slug': barcamp.get('slug', ''),
        'name': barcamp.get('name', ''),
        'start_date': barcamp.get('start_date'),
        'end_date': barcamp.get('end_date'),
        'location': barcamp.get('location', ''),
        'admins': admins,
        'participants': participants,
        'waiting_list': waiting_list_users,
        'event_details': event_details,
        'has_non_admin_participants': has_non_admin_participants,
        'stats': {
            'admin_count': len(admins),
            'participant_count': len(participants),
            'waiting_list_count': len(waiting_list_users),
            'admin_deleted': admin_deleted,
            'admin_invalid': admin_invalid,
            'participant_deleted': participant_deleted,
            'participant_invalid': participant_invalid,
            'waiting_list_deleted': waiting_list_deleted,
            'waiting_list_invalid': waiting_list_invalid,
        }
    }


def format_text(results):
    """Format results as human-readable text.

    Args:
        results: List of processed barcamp dicts
    """
    print "=" * 60
    print "Active Registration Barcamps"
    print "=" * 60
    print ""

    if not results:
        print "No barcamps with active registration found."
        return

    for result in results:
        print "Barcamp: %s" % result['name']
        print "Slug: %s" % result['slug']
        print "Dates: %s to %s" % (
            result['start_date'].strftime('%Y-%m-%d') if result['start_date'] else 'N/A',
            result['end_date'].strftime('%Y-%m-%d') if result['end_date'] else 'N/A'
        )
        print "Location: %s" % result['location']
        print ""

        print "Admins (%d):" % result['stats']['admin_count']
        for admin in result['admins']:
            print "  - %s <%s>" % (
                admin.get('fullname', 'N/A'),
                admin.get('email', 'N/A')
            )
        print ""

        print "Participants (%d total):" % result['stats']['participant_count']
        if result['has_non_admin_participants']:
            print "  * Has non-admin participants: YES"
        else:
            print "  * Has non-admin participants: NO (only admins)"

        for event in result['event_details']:
            print "  - %s: %d participants" % (event['name'], event['participant_count'])

        # Show sample participant emails
        if result['participants']:
            print "  Sample participant emails:"
            for participant in result['participants'][:10]:
                print "    - %s <%s>" % (
                    participant.get('fullname', 'N/A'),
                    participant.get('email', 'N/A')
                )
            if len(result['participants']) > 10:
                print "    ... and %d more" % (len(result['participants']) - 10)
        print ""

        if result['waiting_list']:
            print "Waiting List (%d):" % result['stats']['waiting_list_count']
            for user in result['waiting_list'][:5]:
                print "  - %s <%s>" % (
                    user.get('fullname', 'N/A'),
                    user.get('email', 'N/A')
                )
            if len(result['waiting_list']) > 5:
                print "  ... and %d more" % (len(result['waiting_list']) - 5)
            print ""

        print "-" * 60
        print ""

    # Summary
    total_admins = sum(r['stats']['admin_count'] for r in results)
    total_participants = sum(r['stats']['participant_count'] for r in results)
    total_waiting = sum(r['stats']['waiting_list_count'] for r in results)
    non_admin_count = sum(1 for r in results if r['has_non_admin_participants'])

    print "=" * 60
    print "Summary"
    print "=" * 60
    print "Total barcamps: %d" % len(results)
    print "Barcamps with non-admin participants: %d" % non_admin_count
    print "Total unique admins: %d" % total_admins
    print "Total unique participants: %d" % total_participants
    print "Total waiting list: %d" % total_waiting


def format_csv(results):
    """Format results as CSV.

    Args:
        results: List of processed barcamp dicts
    """
    writer = csv.writer(sys.stdout)

    # Write header
    writer.writerow([
        'slug', 'name', 'start_date', 'end_date', 'location',
        'admin_count', 'participant_count', 'waiting_list_count',
        'has_non_admin_participants', 'admin_emails', 'sample_participant_emails'
    ])

    # Write data rows
    for result in results:
        admin_emails = ','.join(
            user.get('email', '') for user in result['admins']
        )

        # First 5 participant emails
        sample_participant_emails = ','.join(
            user.get('email', '') for user in result['participants'][:5]
        )

        writer.writerow([
            result['slug'],
            result['name'].encode('utf-8') if result['name'] else '',
            result['start_date'].strftime('%Y-%m-%d') if result['start_date'] else '',
            result['end_date'].strftime('%Y-%m-%d') if result['end_date'] else '',
            result['location'].encode('utf-8') if result['location'] else '',
            result['stats']['admin_count'],
            result['stats']['participant_count'],
            result['stats']['waiting_list_count'],
            'yes' if result['has_non_admin_participants'] else 'no',
            admin_emails.encode('utf-8') if admin_emails else '',
            sample_participant_emails.encode('utf-8') if sample_participant_emails else ''
        ])


def format_json(results):
    """Format results as JSON.

    Args:
        results: List of processed barcamp dicts
    """
    output = {
        'query_date': datetime.datetime.now().isoformat(),
        'total_barcamps': len(results),
        'barcamps': []
    }

    for result in results:
        # Convert ObjectIds to strings for JSON serialization
        barcamp_data = {
            'slug': result['slug'],
            'name': result['name'],
            'start_date': result['start_date'].isoformat() if result['start_date'] else None,
            'end_date': result['end_date'].isoformat() if result['end_date'] else None,
            'location': result['location'],
            'has_non_admin_participants': result['has_non_admin_participants'],
            'stats': result['stats'],
            'events': result['event_details'],
            'admins': [
                {
                    'id': unicode(user['_id']),
                    'email': user.get('email', ''),
                    'fullname': user.get('fullname', '')
                }
                for user in result['admins']
            ],
            'participants': [
                {
                    'id': unicode(user['_id']),
                    'email': user.get('email', ''),
                    'fullname': user.get('fullname', '')
                }
                for user in result['participants']
            ],
            'waiting_list': [
                {
                    'id': unicode(user['_id']),
                    'email': user.get('email', ''),
                    'fullname': user.get('fullname', '')
                }
                for user in result['waiting_list']
            ]
        }
        output['barcamps'].append(barcamp_data)

    print json.dumps(output, indent=2, default=str)


def format_emails(results):
    """Format results as deduplicated email list.

    Args:
        results: List of processed barcamp dicts
    """
    emails = set()

    for result in results:
        # Collect admin emails
        for user in result['admins']:
            email = user.get('email', '')
            if email:
                emails.add(email)

        # Collect participant emails
        for user in result['participants']:
            email = user.get('email', '')
            if email:
                emails.add(email)

        # Collect waiting list emails
        for user in result['waiting_list']:
            email = user.get('email', '')
            if email:
                emails.add(email)

    # Sort and print
    for email in sorted(emails):
        print email


def main():
    """Main function."""
    parser = argparse.ArgumentParser(
        description='Find barcamps with active registration and report on admins and participants'
    )
    parser.add_argument(
        '--config',
        default='etc/dev.ini',
        help='Path to config file (default: etc/dev.ini)'
    )
    parser.add_argument(
        '--format',
        choices=['text', 'csv', 'json', 'emails'],
        default='text',
        help='Output format (default: text)'
    )
    parser.add_argument(
        '--include-waiting-list',
        action='store_true',
        help='Include waiting list participants'
    )
    parser.add_argument(
        '--only-non-admin',
        action='store_true',
        help='Only show barcamps with non-admin participants'
    )

    args = parser.parse_args()

    try:
        # Parse config
        mongodb_url, mongodb_name = parse_config(args.config)
        print >> sys.stderr, "Connecting to MongoDB: %s/%s" % (mongodb_url, mongodb_name)

        # Connect to MongoDB
        client = pymongo.MongoClient(mongodb_url)
        db = client[mongodb_name]

        # Get active barcamps
        print >> sys.stderr, "Querying for active registration barcamps..."
        barcamps = get_active_registration_barcamps(db)
        print >> sys.stderr, "Found %d barcamps with active registration" % len(barcamps)

        # Process each barcamp
        results = []
        for barcamp in barcamps:
            print >> sys.stderr, "Processing barcamp: %s" % barcamp.get('name', 'N/A')
            result = process_barcamp(db, barcamp, args.include_waiting_list)

            # Filter if only-non-admin is set
            if args.only_non_admin and not result['has_non_admin_participants']:
                continue

            results.append(result)

        print >> sys.stderr, "Processing complete. Outputting results...\n"

        # Format output
        if args.format == 'text':
            format_text(results)
        elif args.format == 'csv':
            format_csv(results)
        elif args.format == 'json':
            format_json(results)
        elif args.format == 'emails':
            format_emails(results)

    except Exception as e:
        print >> sys.stderr, "Error: %s" % e
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
