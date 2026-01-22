#!/usr/bin/env python
# coding=utf-8
"""
Script to find all barcamp admins from the last N years and return their email addresses.

Usage:
    python scripts/get_barcamp_admins.py [--years N] [--config path/to/config.ini]

Examples:
    # Get admins from last 3 years (default)
    python scripts/get_barcamp_admins.py

    # Get admins from last 5 years
    python scripts/get_barcamp_admins.py --years 5

    # Use custom config file
    python scripts/get_barcamp_admins.py --config etc/dev.ini
"""

import pymongo
import datetime
import argparse
import sys
from bson import ObjectId


def parse_config(config_file):
    """Parse the .ini config file to extract MongoDB connection details."""
    mongodb_url = None
    mongodb_name = None

    try:
        with open(config_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('mongodb_url:'):
                    mongodb_url = line.split(':', 1)[1].strip()
                elif line.startswith('mongodb_name:'):
                    mongodb_name = line.split(':', 1)[1].strip()
    except IOError as e:
        print >> sys.stderr, "Error reading config file: %s" % e
        sys.exit(1)

    return mongodb_url, mongodb_name


def get_barcamp_admin_emails(mongodb_url, mongodb_name, years=3):
    """
    Find all barcamp admins from the last N years and return their email addresses.

    Args:
        mongodb_url: MongoDB connection URL
        mongodb_name: Database name
        years: Number of years to look back (default: 3)

    Returns:
        List of email addresses (deduplicated and sorted)
    """
    # Connect to MongoDB
    try:
        client = pymongo.MongoClient(mongodb_url)
        db = client[mongodb_name]
    except Exception as e:
        print >> sys.stderr, "Error connecting to MongoDB: %s" % e
        sys.exit(1)

    # Calculate the date N years ago
    cutoff_date = datetime.date.today() - datetime.timedelta(days=years * 365)
    # Convert to datetime for MongoDB query (MongoDB stores datetime, not date)
    cutoff_datetime = datetime.datetime.combine(cutoff_date, datetime.time.min)

    print >> sys.stderr, "Looking for barcamps with start_date >= %s" % cutoff_date

    # Query barcamps from the last N years
    try:
        barcamps = db.barcamps.find({
            'start_date': {'$gte': cutoff_datetime}
        })
    except Exception as e:
        print >> sys.stderr, "Error querying barcamps: %s" % e
        sys.exit(1)

    # Collect all unique admin user IDs
    admin_ids = set()
    barcamp_count = 0

    for barcamp in barcamps:
        barcamp_count += 1
        admins = barcamp.get('admins', [])

        # Convert string IDs to ObjectIds
        for admin_id_str in admins:
            try:
                # Admin IDs are stored as strings, need to convert to ObjectId
                admin_ids.add(ObjectId(admin_id_str))
            except Exception as e:
                print >> sys.stderr, "Warning: Invalid admin ID '%s' in barcamp '%s': %s" % (
                    admin_id_str, barcamp.get('name', 'unknown'), e)

    print >> sys.stderr, "Found %d barcamps with %d unique admin IDs" % (barcamp_count, len(admin_ids))

    if not admin_ids:
        print >> sys.stderr, "No admins found"
        return []

    # Look up email addresses from users collection
    try:
        users = db.users.find({
            '_id': {'$in': list(admin_ids)}
        }, {
            '_id': 1,
            'email': 1,
            'fullname': 1,
            'deleted': 1
        })
    except Exception as e:
        print >> sys.stderr, "Error querying users: %s" % e
        sys.exit(1)

    # Collect email addresses
    emails = []
    deleted_count = 0

    for user in users:
        # Skip deleted users
        if user.get('deleted', False):
            deleted_count += 1
            continue

        email = user.get('email')
        if email:
            emails.append({
                'email': email,
                'fullname': user.get('fullname', ''),
                '_id': str(user.get('_id'))
            })

    print >> sys.stderr, "Found %d users (%d deleted, %d with emails)" % (
        len(admin_ids), deleted_count, len(emails))

    # Sort by email
    emails.sort(key=lambda x: x['email'])

    return emails


def main():
    parser = argparse.ArgumentParser(
        description='Find all barcamp admins from the last N years and return their email addresses.'
    )
    parser.add_argument(
        '--years',
        type=int,
        default=3,
        help='Number of years to look back (default: 3)'
    )
    parser.add_argument(
        '--config',
        type=str,
        default='etc/dev.ini',
        help='Path to config file (default: etc/dev.ini)'
    )
    parser.add_argument(
        '--format',
        choices=['emails', 'csv', 'json'],
        default='emails',
        help='Output format: emails (one per line), csv (email,fullname), json (default: emails)'
    )

    args = parser.parse_args()

    # Parse config file
    mongodb_url, mongodb_name = parse_config(args.config)

    if not mongodb_url or not mongodb_name:
        print >> sys.stderr, "Error: Could not find MongoDB configuration in %s" % args.config
        sys.exit(1)

    print >> sys.stderr, "Using MongoDB: %s/%s" % (mongodb_url, mongodb_name)

    # Get admin emails
    results = get_barcamp_admin_emails(mongodb_url, mongodb_name, args.years)

    # Output results
    if args.format == 'emails':
        # Just email addresses, one per line
        for item in results:
            print item['email']
    elif args.format == 'csv':
        # CSV format: email,fullname
        print "email,fullname"
        for item in results:
            # Escape commas and quotes in fullname
            fullname = item['fullname'].replace('"', '""')
            if ',' in fullname or '"' in fullname:
                fullname = '"%s"' % fullname
            print "%s,%s" % (item['email'], fullname)
    elif args.format == 'json':
        # JSON format
        import json
        print json.dumps(results, indent=2)

    print >> sys.stderr, "\nTotal: %d email addresses" % len(results)


if __name__ == '__main__':
    main()
