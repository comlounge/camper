#!/usr/bin/env python
# coding=utf-8
"""
GDPR User Deletion Script

Permanently deletes users from the camper database except for a whitelist.
Used for server migration and GDPR compliance.

Usage:
    python scripts/delete_users_gdpr.py --config etc/production.ini --whitelist emails.txt [--dry-run]

Examples:
    # Dry run to see what would be deleted
    python scripts/delete_users_gdpr.py --config etc/production.ini --whitelist keep.txt --dry-run

    # Actually delete users
    python scripts/delete_users_gdpr.py --config etc/production.ini --whitelist keep.txt

IMPORTANT: Always backup your database before running this script!
"""

import pymongo
import datetime
import argparse
import sys
import hashlib
import uuid
from bson import ObjectId

# =============================================================================
# CONFIGURATION - Edit these values as needed
# =============================================================================
ANON_EMAIL = "anonymous@barcamps.eu"
ANON_USERNAME = "anonymous"
ANON_PASSWORD = "gdpr_anonymous_user_2025"  # Change this to something random
ANON_FULLNAME = "Anonymous User"

# Password salt (should match your config, but doesn't matter for anonymous user)
DEFAULT_PW_SALT = "changeme"


def parse_config(config_file):
    """Parse the .ini config file to extract MongoDB connection details."""
    mongodb_url = None
    mongodb_name = None
    pw_salt = DEFAULT_PW_SALT

    try:
        with open(config_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('mongodb_url:'):
                    mongodb_url = line.split(':', 1)[1].strip()
                elif line.startswith('mongodb_name:'):
                    mongodb_name = line.split(':', 1)[1].strip()
                elif line.startswith('modules.userbase.pw_salt:'):
                    pw_salt = line.split(':', 1)[1].strip()
    except IOError as e:
        print >> sys.stderr, "Error reading config file: %s" % e
        sys.exit(1)

    return mongodb_url, mongodb_name, pw_salt


def hash_password(password, salt):
    """Hash a password using the same method as userbase module."""
    return hashlib.md5(password + salt).hexdigest()


def create_or_get_anonymous_user(db, pw_salt):
    """
    Create the anonymous user if it doesn't exist, or return it if it does.

    Returns:
        ObjectId of the anonymous user
    """
    users = db.users

    # Check if anonymous user exists
    anon_user = users.find_one({'email': ANON_EMAIL})

    if anon_user:
        print >> sys.stderr, "Anonymous user already exists: %s (ID: %s)" % (ANON_EMAIL, anon_user['_id'])
        return anon_user['_id']

    # Create anonymous user
    print >> sys.stderr, "Creating anonymous user: %s" % ANON_EMAIL

    user_doc = {
        'email': ANON_EMAIL,
        'username': ANON_USERNAME,
        'fullname': ANON_FULLNAME,
        'password': hash_password(ANON_PASSWORD, pw_salt),
        'created': datetime.datetime.utcnow(),
        'updated': datetime.datetime.utcnow(),
        'deleted': False,
        'email_verified': True,
    }

    result = users.insert_one(user_doc)
    print >> sys.stderr, "Created anonymous user with ID: %s" % result.inserted_id
    return result.inserted_id


def read_whitelist(whitelist_file):
    """
    Read email addresses from whitelist file (one per line).

    Returns:
        Set of email addresses to keep (lowercase, stripped)
    """
    emails = set()
    try:
        with open(whitelist_file, 'r') as f:
            for line in f:
                email = line.strip().lower()
                if email and not email.startswith('#'):
                    emails.add(email)
    except IOError as e:
        print >> sys.stderr, "Error reading whitelist file: %s" % e
        sys.exit(1)

    return emails


def get_users_to_delete(db, whitelist_emails, anon_user_id):
    """
    Get list of user IDs to delete (not in whitelist, not anonymous user).

    Returns:
        List of ObjectIds to delete
    """
    users = db.users

    # Get all users
    all_users = list(users.find({}, {'_id': 1, 'email': 1, 'fullname': 1}))

    to_delete = []
    to_keep = []

    for user in all_users:
        user_id = user['_id']
        email = user.get('email', '').lower().strip()

        # Skip anonymous user
        if user_id == anon_user_id:
            continue

        # Check if in whitelist
        if email in whitelist_emails:
            to_keep.append({'email': email, 'fullname': user.get('fullname', ''), 'id': user_id})
        else:
            to_delete.append(user_id)

    print >> sys.stderr, "\n=== User Analysis ==="
    print >> sys.stderr, "Total users in database: %d" % len(all_users)
    print >> sys.stderr, "Users to KEEP (in whitelist): %d" % len(to_keep)
    print >> sys.stderr, "Users to DELETE: %d" % len(to_delete)
    print >> sys.stderr, "Anonymous user: %s (ID: %s)" % (ANON_EMAIL, anon_user_id)

    return to_delete, to_keep


def update_barcamp_admins(db, user_ids_to_delete, dry_run=False):
    """Remove deleted user IDs from barcamp admins arrays."""
    barcamps = db.barcamps

    # Convert ObjectIds to strings (barcamp admins are stored as strings)
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        # Count how many barcamps have these admins
        count = barcamps.count_documents({'admins': {'$in': user_id_strings}})
        print >> sys.stderr, "  [DRY RUN] Would update %d barcamps (remove admins)" % count
    else:
        result = barcamps.update_many(
            {'admins': {'$in': user_id_strings}},
            {'$pull': {'admins': {'$in': user_id_strings}}}
        )
        print >> sys.stderr, "  Updated %d barcamps (removed admins)" % result.modified_count


def update_event_participants(db, user_ids_to_delete, dry_run=False):
    """Remove deleted user IDs from event participants and waiting_list arrays."""
    barcamps = db.barcamps

    # Convert ObjectIds to strings
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        # Count barcamps with events that have these participants
        count = barcamps.count_documents({
            '$or': [
                {'events.participants': {'$in': user_id_strings}},
                {'events.waiting_list': {'$in': user_id_strings}}
            ]
        })
        print >> sys.stderr, "  [DRY RUN] Would update events in %d barcamps (remove participants/waiting_list)" % count
    else:
        # Pull from participants arrays in all events
        result = barcamps.update_many(
            {'events.participants': {'$in': user_id_strings}},
            {'$pull': {'events.$[].participants': {'$in': user_id_strings}}}
        )
        print >> sys.stderr, "  Removed from participants in %d barcamps" % result.modified_count

        # Pull from waiting_list arrays in all events
        result = barcamps.update_many(
            {'events.waiting_list': {'$in': user_id_strings}},
            {'$pull': {'events.$[].waiting_list': {'$in': user_id_strings}}}
        )
        print >> sys.stderr, "  Removed from waiting_list in %d barcamps" % result.modified_count


def anonymize_content(db, user_ids_to_delete, anon_user_id, dry_run=False):
    """Transfer ownership of content to anonymous user."""
    anon_id_string = unicode(anon_user_id)
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    collections_to_anonymize = [
        ('sessions', 'user_id'),
        ('session_comments', 'user_id'),
        ('blog', 'created_by'),
        ('pages', 'created_by'),
        ('galleries', 'created_by'),
    ]

    for collection_name, field_name in collections_to_anonymize:
        collection = db[collection_name]

        if dry_run:
            count = collection.count_documents({field_name: {'$in': user_id_strings}})
            print >> sys.stderr, "  [DRY RUN] Would anonymize %d documents in %s" % (count, collection_name)
        else:
            result = collection.update_many(
                {field_name: {'$in': user_id_strings}},
                {'$set': {field_name: anon_id_string}}
            )
            print >> sys.stderr, "  Anonymized %d documents in %s" % (result.modified_count, collection_name)


def delete_session_votes(db, user_ids_to_delete, dry_run=False):
    """Delete all votes by removing user IDs from voted_for arrays and resetting vote_count."""
    sessions = db.sessions
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        count = sessions.count_documents({'voted_for': {'$in': user_id_strings}})
        print >> sys.stderr, "  [DRY RUN] Would delete votes in %d sessions" % count
    else:
        # Remove user IDs from voted_for arrays
        result = sessions.update_many(
            {'voted_for': {'$in': user_id_strings}},
            {'$pull': {'voted_for': {'$in': user_id_strings}}}
        )
        print >> sys.stderr, "  Removed votes from %d sessions" % result.modified_count

        # Recalculate vote_count for all sessions (set to length of voted_for array)
        # We need to do this with aggregation pipeline in MongoDB 4.2+
        # For older versions, we'd need to iterate
        try:
            # Try modern approach (MongoDB 4.2+)
            sessions.update_many(
                {},
                [{'$set': {'vote_count': {'$size': '$voted_for'}}}]
            )
            print >> sys.stderr, "  Recalculated vote_count for all sessions"
        except:
            # Fallback: iterate and update
            print >> sys.stderr, "  Recalculating vote_count (legacy method)..."
            for session in sessions.find({}, {'_id': 1, 'voted_for': 1}):
                vote_count = len(session.get('voted_for', []))
                sessions.update_one(
                    {'_id': session['_id']},
                    {'$set': {'vote_count': vote_count}}
                )


def delete_tickets_and_related(db, user_ids_to_delete, dry_run=False):
    """Delete tickets, user favorites, and participant data."""
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    collections_to_delete = [
        ('tickets', 'user_id'),
        ('userfavs', 'user_id'),
        ('participant_data', 'user_id'),
    ]

    for collection_name, field_name in collections_to_delete:
        collection = db[collection_name]

        if dry_run:
            count = collection.count_documents({field_name: {'$in': user_id_strings}})
            print >> sys.stderr, "  [DRY RUN] Would delete %d documents from %s" % (count, collection_name)
        else:
            result = collection.delete_many({field_name: {'$in': user_id_strings}})
            print >> sys.stderr, "  Deleted %d documents from %s" % (result.deleted_count, collection_name)


def delete_users(db, user_ids_to_delete, dry_run=False):
    """Delete user records from users collection."""
    users = db.users

    if dry_run:
        count = len(user_ids_to_delete)
        print >> sys.stderr, "  [DRY RUN] Would delete %d users" % count
    else:
        result = users.delete_many({'_id': {'$in': user_ids_to_delete}})
        print >> sys.stderr, "  Deleted %d users" % result.deleted_count


def main():
    parser = argparse.ArgumentParser(
        description='Delete users from camper database except for whitelist (GDPR compliance)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
IMPORTANT: Always backup your database before running this script!

This script will:
1. Create/verify anonymous user
2. Remove deleted users from barcamp admins
3. Transfer content ownership to anonymous user
4. Clean up participants, votes, tickets, etc.
5. Delete user records

Example usage:
    # Dry run first
    python scripts/delete_users_gdpr.py --config etc/production.ini --whitelist keep.txt --dry-run

    # Then actually delete
    python scripts/delete_users_gdpr.py --config etc/production.ini --whitelist keep.txt
        """
    )
    parser.add_argument(
        '--config',
        type=str,
        required=True,
        help='Path to config file (e.g., etc/production.ini)'
    )
    parser.add_argument(
        '--whitelist',
        type=str,
        required=True,
        help='Path to file containing email addresses to KEEP (one per line)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Show what would be deleted without actually deleting'
    )

    args = parser.parse_args()

    # Parse config
    mongodb_url, mongodb_name, pw_salt = parse_config(args.config)

    if not mongodb_url or not mongodb_name:
        print >> sys.stderr, "Error: Could not find MongoDB configuration in %s" % args.config
        sys.exit(1)

    print >> sys.stderr, "=" * 70
    print >> sys.stderr, "GDPR USER DELETION SCRIPT"
    print >> sys.stderr, "=" * 70
    print >> sys.stderr, "MongoDB: %s/%s" % (mongodb_url, mongodb_name)
    print >> sys.stderr, "Config: %s" % args.config
    print >> sys.stderr, "Whitelist: %s" % args.whitelist
    print >> sys.stderr, "Mode: %s" % ("DRY RUN" if args.dry_run else "LIVE DELETE")
    print >> sys.stderr, "=" * 70

    # Connect to MongoDB
    try:
        client = pymongo.MongoClient(mongodb_url)
        db = client[mongodb_name]
    except Exception as e:
        print >> sys.stderr, "Error connecting to MongoDB: %s" % e
        sys.exit(1)

    # Step 1: Create/verify anonymous user
    print >> sys.stderr, "\n[Step 1] Creating/verifying anonymous user..."
    anon_user_id = create_or_get_anonymous_user(db, pw_salt)

    # Step 2: Read whitelist
    print >> sys.stderr, "\n[Step 2] Reading whitelist..."
    whitelist_emails = read_whitelist(args.whitelist)
    print >> sys.stderr, "Whitelist contains %d email addresses" % len(whitelist_emails)

    # Step 3: Get users to delete
    print >> sys.stderr, "\n[Step 3] Analyzing users..."
    user_ids_to_delete, users_to_keep = get_users_to_delete(db, whitelist_emails, anon_user_id)

    if len(user_ids_to_delete) == 0:
        print >> sys.stderr, "\nNo users to delete. Exiting."
        sys.exit(0)

    # Confirmation prompt (skip in dry-run mode)
    if not args.dry_run:
        print >> sys.stderr, "\n" + "!" * 70
        print >> sys.stderr, "WARNING: You are about to PERMANENTLY DELETE %d users!" % len(user_ids_to_delete)
        print >> sys.stderr, "!" * 70
        print >> sys.stderr, "\nThis will:"
        print >> sys.stderr, "  - Remove users from barcamp admins"
        print >> sys.stderr, "  - Transfer content to anonymous user"
        print >> sys.stderr, "  - Delete tickets, favorites, and participant data"
        print >> sys.stderr, "  - Delete user accounts"
        print >> sys.stderr, "\nHave you backed up your database? (yes/no): "

        response = raw_input().strip().lower()
        if response != 'yes':
            print >> sys.stderr, "Aborted by user."
            sys.exit(0)

    # Step 4: Update barcamp admins
    print >> sys.stderr, "\n[Step 4] Updating barcamp admins..."
    update_barcamp_admins(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 5: Update event participants
    print >> sys.stderr, "\n[Step 5] Cleaning up event participants and waiting lists..."
    update_event_participants(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 6: Anonymize content
    print >> sys.stderr, "\n[Step 6] Anonymizing content (sessions, comments, blog, pages, galleries)..."
    anonymize_content(db, user_ids_to_delete, anon_user_id, dry_run=args.dry_run)

    # Step 7: Delete session votes
    print >> sys.stderr, "\n[Step 7] Deleting session votes..."
    delete_session_votes(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 8: Delete tickets and related data
    print >> sys.stderr, "\n[Step 8] Deleting tickets, favorites, and participant data..."
    delete_tickets_and_related(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 9: Delete users
    print >> sys.stderr, "\n[Step 9] Deleting user records..."
    delete_users(db, user_ids_to_delete, dry_run=args.dry_run)

    # Summary
    print >> sys.stderr, "\n" + "=" * 70
    print >> sys.stderr, "SUMMARY"
    print >> sys.stderr, "=" * 70
    if args.dry_run:
        print >> sys.stderr, "DRY RUN completed - no actual changes were made"
        print >> sys.stderr, "Run without --dry-run to perform actual deletion"
    else:
        print >> sys.stderr, "Deletion completed successfully!"
    print >> sys.stderr, "Users deleted: %d" % len(user_ids_to_delete)
    print >> sys.stderr, "Users kept: %d" % len(users_to_keep)
    print >> sys.stderr, "=" * 70


if __name__ == '__main__':
    main()
