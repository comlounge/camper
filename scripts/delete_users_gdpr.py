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


class DualLogger(object):
    """Logger that writes to both stderr and a file."""

    def __init__(self, log_file):
        import codecs
        self.log_file = codecs.open(log_file, 'w', encoding='utf-8')
        self.stderr = sys.stderr

    def write(self, message):
        # Handle both str and unicode in Python 2
        if isinstance(message, str):
            message = message.decode('utf-8', 'replace')
        self.stderr.write(message.encode('utf-8', 'replace') if isinstance(message, unicode) else message)
        self.log_file.write(message)
        self.log_file.flush()

    def close(self):
        self.log_file.close()

# =============================================================================
# CONFIGURATION - Edit these values as needed
# =============================================================================
ANON_EMAIL = "anonymous@barcamps.eu"
ANON_USERNAME = "anonymous"
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

        # Validate that existing user matches expected structure
        if anon_user.get('username') != ANON_USERNAME:
            print >> sys.stderr, "WARNING: Existing anonymous user has unexpected username: %s" % anon_user.get('username')
            print >> sys.stderr, "         Expected: %s" % ANON_USERNAME

        return anon_user['_id']

    # Create anonymous user with random password (security: never hardcode passwords)
    print >> sys.stderr, "Creating anonymous user: %s" % ANON_EMAIL

    # Generate a secure random password that will never be used
    random_password = str(uuid.uuid4()) + str(uuid.uuid4())

    user_doc = {
        'email': ANON_EMAIL,
        'username': ANON_USERNAME,
        'fullname': ANON_FULLNAME,
        '_password': hash_password(random_password, pw_salt),
        'created': datetime.datetime.utcnow(),
        'updated': datetime.datetime.utcnow(),
        'active': True,
        'permissions': [],
        'bad_login_attempts': 0,
        'last_ip': '',
        'last_login': None,
        'activation_time': datetime.datetime.utcnow(),
        'activation_code': None,
        'activation_code_sent': None,
        'activation_code_expires': None,
        'pw_code': None,
        'pw_code_sent': None,
        'pw_code_expires': None,
        'last_failed_login': None,
    }

    user_id = users.insert(user_doc)
    print >> sys.stderr, "Created anonymous user with ID: %s" % user_id
    return user_id


def read_whitelist(whitelist_file):
    """
    Read email addresses from whitelist file (one per line).

    Returns:
        Set of email addresses to keep (lowercase, stripped)
    """
    import re
    email_pattern = re.compile(r'^[^@]+@[^@]+\.[^@]+$')

    emails = set()
    invalid_emails = []
    line_num = 0

    try:
        with open(whitelist_file, 'r') as f:
            for line in f:
                line_num += 1
                email = line.strip().lower()

                # Skip empty lines and comments
                if not email or email.startswith('#'):
                    continue

                # Validate email format
                if not email_pattern.match(email):
                    invalid_emails.append((line_num, email))
                else:
                    emails.add(email)

    except IOError as e:
        print >> sys.stderr, "Error reading whitelist file: %s" % e
        sys.exit(1)

    # Always whitelist the anonymous user email to prevent accidents
    emails.add(ANON_EMAIL.lower())

    # Show warnings for invalid emails
    if invalid_emails:
        print >> sys.stderr, "\nWARNING: Found %d invalid email addresses in whitelist:" % len(invalid_emails)
        for line_num, email in invalid_emails[:5]:  # Show first 5
            print >> sys.stderr, "  Line %d: %s" % (line_num, email)
        if len(invalid_emails) > 5:
            print >> sys.stderr, "  ... and %d more" % (len(invalid_emails) - 5)

    # Require at least one email (excluding anonymous)
    if len(emails) <= 1:  # Only anonymous email
        print >> sys.stderr, "\nERROR: Whitelist must contain at least one valid email address"
        print >> sys.stderr, "       (excluding the automatic anonymous user entry)"
        sys.exit(1)

    return emails


def get_users_to_delete(db, whitelist_emails, anon_user_id):
    """
    Get list of user IDs to delete (not in whitelist, not anonymous user).

    Returns:
        Tuple of (List of ObjectIds to delete, List of user dicts to keep)
    """
    users = db.users

    # Get all users
    all_users = list(users.find({}, {'_id': 1, 'email': 1, 'fullname': 1}))

    to_delete = []
    to_keep = []

    for user in all_users:
        user_id = user['_id']
        email = user.get('email', '').lower().strip()

        # Critical: Always skip anonymous user (by ID and email)
        if user_id == anon_user_id or email == ANON_EMAIL.lower():
            continue

        # Check if in whitelist
        if email in whitelist_emails:
            to_keep.append({'email': email, 'fullname': user.get('fullname', ''), 'id': user_id})
        else:
            to_delete.append(user_id)

    # Double-check anonymous user is not in deletion list (safety check)
    if anon_user_id in to_delete:
        print >> sys.stderr, "\nERROR: Anonymous user found in deletion list! This should never happen."
        print >> sys.stderr, "       Aborting to prevent data corruption."
        sys.exit(1)

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
        count = barcamps.find({'admins': {'$in': user_id_strings}}).count()
        print >> sys.stderr, "  [DRY RUN] Would update %d barcamps (remove admins)" % count
    else:
        result = barcamps.update(
            {'admins': {'$in': user_id_strings}},
            {'$pull': {'admins': {'$in': user_id_strings}}},
            multi=True
        )
        print >> sys.stderr, "  Updated %d barcamps (removed admins)" % result.get('nModified', 0)


def update_barcamp_created_by(db, user_ids_to_delete, anon_user_id, dry_run=False):
    """Anonymize barcamp created_by field for deleted users."""
    barcamps = db.barcamps
    anon_id_string = unicode(anon_user_id)
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        count = barcamps.find({'created_by': {'$in': user_id_strings}}).count()
        print >> sys.stderr, "  [DRY RUN] Would anonymize %d barcamps (created_by field)" % count
    else:
        result = barcamps.update(
            {'created_by': {'$in': user_id_strings}},
            {'$set': {'created_by': anon_id_string}},
            multi=True
        )
        print >> sys.stderr, "  Anonymized %d barcamps (created_by field)" % result.get('nModified', 0)


def update_barcamp_user_arrays(db, user_ids_to_delete, dry_run=False):
    """Remove deleted user IDs from barcamp user arrays (invited_admins, subscribers)."""
    barcamps = db.barcamps
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        count_invited = barcamps.find({'invited_admins': {'$in': user_id_strings}}).count()
        count_subscribers = barcamps.find({'subscribers': {'$in': user_id_strings}}).count()
        print >> sys.stderr, "  [DRY RUN] Would update %d barcamps (remove invited_admins)" % count_invited
        print >> sys.stderr, "  [DRY RUN] Would update %d barcamps (remove subscribers)" % count_subscribers
    else:
        # Remove from invited_admins
        result = barcamps.update(
            {'invited_admins': {'$in': user_id_strings}},
            {'$pull': {'invited_admins': {'$in': user_id_strings}}},
            multi=True
        )
        print >> sys.stderr, "  Removed from invited_admins in %d barcamps" % result.get('nModified', 0)

        # Remove from subscribers
        result = barcamps.update(
            {'subscribers': {'$in': user_id_strings}},
            {'$pull': {'subscribers': {'$in': user_id_strings}}},
            multi=True
        )
        print >> sys.stderr, "  Removed from subscribers in %d barcamps" % result.get('nModified', 0)


def update_event_participants(db, user_ids_to_delete, dry_run=False):
    """Remove deleted user IDs from event participants, waiting_list, and maybe arrays."""
    barcamps = db.barcamps

    # Convert ObjectIds to strings
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]
    user_id_set = set(user_id_strings)

    if dry_run:
        # Count barcamps with events that have these participants
        count = 0
        total_participants = 0
        for barcamp in barcamps.find({'events': {'$exists': True}}, {'events': 1}):
            events = barcamp.get('events', {})
            has_deleted_users = False
            for event_id, event in events.items():
                for field in ['participants', 'waiting_list', 'maybe']:
                    event_list = event.get(field, [])
                    if any(uid in user_id_set for uid in event_list):
                        has_deleted_users = True
                        total_participants += sum(1 for uid in event_list if uid in user_id_set)
            if has_deleted_users:
                count += 1
        print >> sys.stderr, "  [DRY RUN] Would clean %d registrations from events in %d barcamps" % (total_participants, count)
    else:
        # MongoDB-version-agnostic approach: fetch, modify, save
        # This works with all MongoDB versions and ensures cleanup is complete

        print >> sys.stderr, "  Removing user IDs from event arrays (this may take a while)..."

        updated_count = 0
        total_cleaned = 0

        # Find all barcamps with events
        for barcamp in barcamps.find({'events': {'$exists': True}}, {'_id': 1, 'events': 1}):
            events = barcamp.get('events', {})
            if not events:
                continue

            modified = False

            # Iterate through all events in this barcamp
            for event_id, event in events.items():
                # Clean participants list
                if 'participants' in event:
                    original_len = len(event['participants'])
                    event['participants'] = [uid for uid in event['participants'] if uid not in user_id_set]
                    cleaned = original_len - len(event['participants'])
                    if cleaned > 0:
                        modified = True
                        total_cleaned += cleaned

                # Clean waiting_list
                if 'waiting_list' in event:
                    original_len = len(event['waiting_list'])
                    event['waiting_list'] = [uid for uid in event['waiting_list'] if uid not in user_id_set]
                    cleaned = original_len - len(event['waiting_list'])
                    if cleaned > 0:
                        modified = True
                        total_cleaned += cleaned

                # Clean maybe list
                if 'maybe' in event:
                    original_len = len(event['maybe'])
                    event['maybe'] = [uid for uid in event['maybe'] if uid not in user_id_set]
                    cleaned = original_len - len(event['maybe'])
                    if cleaned > 0:
                        modified = True
                        total_cleaned += cleaned

            # Save if any changes were made
            if modified:
                barcamps.update(
                    {'_id': barcamp['_id']},
                    {'$set': {'events': events}}
                )
                updated_count += 1

                # Show progress every 10 barcamps
                if updated_count % 10 == 0:
                    print >> sys.stderr, "    Processed %d barcamps, cleaned %d registrations..." % (updated_count, total_cleaned)

        print >> sys.stderr, "  Completed: cleaned %d registrations from %d barcamps" % (total_cleaned, updated_count)


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
            count = collection.find({field_name: {'$in': user_id_strings}}).count()
            print >> sys.stderr, "  [DRY RUN] Would anonymize %d documents in %s" % (count, collection_name)
        else:
            result = collection.update(
                {field_name: {'$in': user_id_strings}},
                {'$set': {field_name: anon_id_string}},
                multi=True
            )
            print >> sys.stderr, "  Anonymized %d documents in %s" % (result.get('nModified', 0), collection_name)


def clean_registration_data(db, user_ids_to_delete, dry_run=False):
    """Remove user IDs from registration_data dictionary keys in barcamps."""
    barcamps = db.barcamps
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        # Count barcamps that have registration_data with these user IDs as keys
        count = 0
        for barcamp in barcamps.find({'registration_data': {'$exists': True}}, {'registration_data': 1}):
            reg_data = barcamp.get('registration_data', {})
            if any(uid in reg_data for uid in user_id_strings):
                count += 1
        print >> sys.stderr, "  [DRY RUN] Would clean registration_data in %d barcamps" % count
    else:
        # For each barcamp with registration_data, remove keys matching deleted user IDs
        updated_count = 0
        for barcamp in barcamps.find({'registration_data': {'$exists': True}}, {'_id': 1, 'registration_data': 1}):
            reg_data = barcamp.get('registration_data', {})
            keys_to_remove = [uid for uid in user_id_strings if uid in reg_data]

            if keys_to_remove:
                # Build $unset operation for each key
                unset_fields = {('registration_data.%s' % key): 1 for key in keys_to_remove}
                barcamps.update(
                    {'_id': barcamp['_id']},
                    {'$unset': unset_fields}
                )
                updated_count += 1

        print >> sys.stderr, "  Cleaned registration_data in %d barcamps" % updated_count


def anonymize_nested_barcamp_content(db, user_ids_to_delete, anon_user_id, dry_run=False):
    """Anonymize nested content in barcamps: blogposts[].user_id and ticketclasses[].created_by."""
    barcamps = db.barcamps
    anon_id_string = unicode(anon_user_id)
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        # Count barcamps with nested content from these users
        count_blogposts = barcamps.find({'blogposts.user_id': {'$in': user_id_strings}}).count()
        count_ticketclasses = barcamps.find({'ticketclasses.created_by': {'$in': user_id_strings}}).count()
        print >> sys.stderr, "  [DRY RUN] Would anonymize blogposts in %d barcamps" % count_blogposts
        print >> sys.stderr, "  [DRY RUN] Would anonymize ticketclasses in %d barcamps" % count_ticketclasses
    else:
        # Iterate over barcamps and update nested arrays
        # This is MongoDB 2.x compatible (doesn't use advanced array operators)
        blogpost_count = 0
        ticketclass_count = 0

        for barcamp in barcamps.find(
            {'$or': [
                {'blogposts.user_id': {'$in': user_id_strings}},
                {'ticketclasses.created_by': {'$in': user_id_strings}}
            ]},
            {'_id': 1, 'blogposts': 1, 'ticketclasses': 1}
        ):
            updated = False

            # Update blogposts
            blogposts = barcamp.get('blogposts', [])
            if blogposts:
                for post in blogposts:
                    if post.get('user_id') in user_id_strings:
                        post['user_id'] = anon_id_string
                        updated = True

            # Update ticketclasses
            ticketclasses = barcamp.get('ticketclasses', [])
            if ticketclasses:
                for tc in ticketclasses:
                    if tc.get('created_by') in user_id_strings:
                        tc['created_by'] = anon_id_string
                        updated = True

            # Save updated barcamp if any changes were made
            if updated:
                barcamps.update(
                    {'_id': barcamp['_id']},
                    {
                        '$set': {
                            'blogposts': blogposts,
                            'ticketclasses': ticketclasses
                        }
                    }
                )
                if any(post.get('user_id') == anon_id_string for post in blogposts):
                    blogpost_count += 1
                if any(tc.get('created_by') == anon_id_string for tc in ticketclasses):
                    ticketclass_count += 1

        print >> sys.stderr, "  Anonymized blogposts in %d barcamps" % blogpost_count
        print >> sys.stderr, "  Anonymized ticketclasses in %d barcamps" % ticketclass_count


def delete_session_votes(db, user_ids_to_delete, dry_run=False):
    """Delete all votes by removing user IDs from voted_for arrays and resetting vote_count."""
    sessions = db.sessions
    user_id_strings = [unicode(uid) for uid in user_ids_to_delete]

    if dry_run:
        count = sessions.find({'voted_for': {'$in': user_id_strings}}).count()
        print >> sys.stderr, "  [DRY RUN] Would delete votes in %d sessions" % count
    else:
        # Remove user IDs from voted_for arrays and track affected sessions
        result = sessions.update(
            {'voted_for': {'$in': user_id_strings}},
            {'$pull': {'voted_for': {'$in': user_id_strings}}},
            multi=True
        )
        affected_count = result.get('nModified', 0)
        print >> sys.stderr, "  Removed votes from %d sessions" % affected_count

        # Recalculate vote_count only for affected sessions (optimization)
        if affected_count > 0:
            print >> sys.stderr, "  Recalculating vote_count for affected sessions..."
            # Find sessions that might have been affected (had any of these user IDs)
            # Since we already removed them, we need to recalc all that might have had them
            # For safety, recalc all sessions with vote_count > 0 or voted_for array exists
            for session in sessions.find(
                {'$or': [{'vote_count': {'$gt': 0}}, {'voted_for': {'$exists': True}}]},
                {'_id': 1, 'voted_for': 1}
            ):
                vote_count = len(session.get('voted_for', []))
                sessions.update(
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
            count = collection.find({field_name: {'$in': user_id_strings}}).count()
            print >> sys.stderr, "  [DRY RUN] Would delete %d documents from %s" % (count, collection_name)
        else:
            result = collection.remove({field_name: {'$in': user_id_strings}})
            print >> sys.stderr, "  Deleted %d documents from %s" % (result.get('n', 0), collection_name)


def delete_users(db, user_ids_to_delete, dry_run=False):
    """Delete user records from users collection."""
    users = db.users

    if dry_run:
        count = len(user_ids_to_delete)
        print >> sys.stderr, "  [DRY RUN] Would delete %d users" % count
    else:
        result = users.remove({'_id': {'$in': user_ids_to_delete}})
        print >> sys.stderr, "  Deleted %d users" % result.get('n', 0)


def verify_deletion_complete(db, user_ids_deleted, anon_user_id):
    """
    Verify that all user references have been removed or anonymized.

    Returns:
        List of (collection, field, user_id) tuples for any orphaned references found
    """
    user_id_strings = [unicode(uid) for uid in user_ids_deleted]
    orphaned_refs = []

    print >> sys.stderr, "  Checking for orphaned user references..."

    # Check barcamps collection
    barcamps = db.barcamps

    # Direct fields
    for field in ['created_by', 'admins', 'invited_admins', 'subscribers']:
        if barcamps.find_one({field: {'$in': user_id_strings}}):
            for bc in barcamps.find({field: {'$in': user_id_strings}}, {'_id': 1, field: 1}):
                value = bc.get(field)
                if isinstance(value, list):
                    for uid in value:
                        if uid in user_id_strings:
                            orphaned_refs.append(('barcamps', field, uid))
                elif value in user_id_strings:
                    orphaned_refs.append(('barcamps', field, value))

    # Nested event arrays
    for field in ['events.participants', 'events.waiting_list', 'events.maybe']:
        if barcamps.find_one({field: {'$in': user_id_strings}}):
            orphaned_refs.append(('barcamps', field, '<nested>'))

    # Registration data dictionary keys
    for bc in barcamps.find({'registration_data': {'$exists': True}}, {'registration_data': 1}):
        reg_data = bc.get('registration_data', {})
        for uid in user_id_strings:
            if uid in reg_data:
                orphaned_refs.append(('barcamps', 'registration_data', uid))

    # Nested blogposts and ticketclasses
    if barcamps.find_one({'blogposts.user_id': {'$in': user_id_strings}}):
        orphaned_refs.append(('barcamps', 'blogposts.user_id', '<nested>'))
    if barcamps.find_one({'ticketclasses.created_by': {'$in': user_id_strings}}):
        orphaned_refs.append(('barcamps', 'ticketclasses.created_by', '<nested>'))

    # Check sessions
    sessions = db.sessions
    if sessions.find_one({'user_id': {'$in': user_id_strings}}):
        # This is OK if anonymized, check if it's actually the anon user
        anon_str = unicode(anon_user_id)
        for sess in sessions.find({'user_id': {'$in': user_id_strings}}, {'user_id': 1}):
            if sess.get('user_id') != anon_str:
                orphaned_refs.append(('sessions', 'user_id', sess.get('user_id')))

    if sessions.find_one({'voted_for': {'$in': user_id_strings}}):
        orphaned_refs.append(('sessions', 'voted_for', '<array>'))

    # Check session_comments
    comments = db.session_comments
    if comments.find_one({'user_id': {'$in': user_id_strings}}):
        anon_str = unicode(anon_user_id)
        for comment in comments.find({'user_id': {'$in': user_id_strings}}, {'user_id': 1}):
            if comment.get('user_id') != anon_str:
                orphaned_refs.append(('session_comments', 'user_id', comment.get('user_id')))

    # Check collections that should be deleted (not anonymized)
    for collection_name, field_name in [
        ('tickets', 'user_id'),
        ('userfavs', 'user_id'),
        ('participant_data', 'user_id'),
    ]:
        collection = db[collection_name]
        if collection.find_one({field_name: {'$in': user_id_strings}}):
            for doc in collection.find({field_name: {'$in': user_id_strings}}, {field_name: 1}):
                orphaned_refs.append((collection_name, field_name, doc.get(field_name)))

    # Check anonymized collections
    for collection_name, field_name in [
        ('blog', 'created_by'),
        ('pages', 'created_by'),
        ('galleries', 'created_by'),
    ]:
        collection = db[collection_name]
        if collection.find_one({field_name: {'$in': user_id_strings}}):
            anon_str = unicode(anon_user_id)
            for doc in collection.find({field_name: {'$in': user_id_strings}}, {field_name: 1}):
                if doc.get(field_name) != anon_str:
                    orphaned_refs.append((collection_name, field_name, doc.get(field_name)))

    # Check users collection
    users = db.users
    if users.find_one({'_id': {'$in': user_ids_deleted}}):
        for user in users.find({'_id': {'$in': user_ids_deleted}}, {'email': 1}):
            orphaned_refs.append(('users', '_id', user.get('email', '<unknown>')))

    return orphaned_refs


def main():
    parser = argparse.ArgumentParser(
        description='Delete users from camper database except for whitelist (GDPR compliance)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
IMPORTANT: Always backup your database before running this script!

This script will:
1. Create/verify anonymous user
2. Remove deleted users from barcamp admins and user arrays
3. Transfer content ownership to anonymous user
4. Clean up participants, votes, tickets, etc.
5. Delete user records
6. Verify deletion completeness

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

    # Set up logging to file
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    log_file = 'gdpr_deletion_%s.log' % timestamp
    logger = DualLogger(log_file)
    sys.stderr = logger

    print >> sys.stderr, "Logging to: %s" % log_file
    print >> sys.stderr, "Started at: %s\n" % datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Parse config
    mongodb_url, mongodb_name, pw_salt = parse_config(args.config)

    if not mongodb_url or not mongodb_name:
        print >> sys.stderr, "Error: Could not find MongoDB configuration in %s" % args.config
        logger.close()
        sys.exit(1)

    print >> sys.stderr, "=" * 70
    print >> sys.stderr, "GDPR USER DELETION SCRIPT"
    print >> sys.stderr, "=" * 70
    print >> sys.stderr, "MongoDB: %s/%s" % (mongodb_url, mongodb_name)
    print >> sys.stderr, "Config: %s" % args.config
    print >> sys.stderr, "Whitelist: %s" % args.whitelist
    print >> sys.stderr, "Mode: %s" % ("DRY RUN" if args.dry_run else "LIVE DELETE")
    print >> sys.stderr, "Log file: %s" % log_file
    print >> sys.stderr, "=" * 70

    # Connect to MongoDB
    try:
        client = pymongo.MongoClient(mongodb_url)
        db = client[mongodb_name]

        # Check MongoDB version
        build_info = db.command('buildInfo')
        mongo_version = build_info.get('version', 'unknown')
        print >> sys.stderr, "\nMongoDB version: %s" % mongo_version

        # Warn if MongoDB version is old (nested array operators require 3.6+)
        version_parts = mongo_version.split('.')
        if version_parts and int(version_parts[0]) < 3:
            print >> sys.stderr, "WARNING: MongoDB version < 3.0 detected."
            print >> sys.stderr, "         Some array update operations may not work as expected."
        elif len(version_parts) >= 2 and int(version_parts[0]) == 3 and int(version_parts[1]) < 6:
            print >> sys.stderr, "WARNING: MongoDB version < 3.6 detected."
            print >> sys.stderr, "         Nested array updates (events.$[]) may not work correctly."
            print >> sys.stderr, "         Script will continue but you should verify results carefully."

    except Exception as e:
        print >> sys.stderr, "Error connecting to MongoDB: %s" % e
        logger.close()
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

        # Show sample of users to be deleted
        print >> sys.stderr, "\nFirst 5 users to be DELETED:"
        for user_dict in list(db.users.find({'_id': {'$in': user_ids_to_delete[:5]}}, {'email': 1, 'fullname': 1})):
            print >> sys.stderr, "  - %s (%s)" % (user_dict.get('email', '?'), user_dict.get('fullname', '?'))
        if len(user_ids_to_delete) > 5:
            print >> sys.stderr, "  ... and %d more users" % (len(user_ids_to_delete) - 5)

        # Show sample of users to be kept
        print >> sys.stderr, "\nFirst 5 users to be KEPT:"
        for user_info in users_to_keep[:5]:
            print >> sys.stderr, "  - %s (%s)" % (user_info['email'], user_info['fullname'])
        if len(users_to_keep) > 5:
            print >> sys.stderr, "  ... and %d more users" % (len(users_to_keep) - 5)

        print >> sys.stderr, "\nThis operation will:"
        print >> sys.stderr, "  - Remove users from barcamp admins and user arrays"
        print >> sys.stderr, "  - Transfer content ownership to anonymous user"
        print >> sys.stderr, "  - Delete tickets, favorites, and participant data"
        print >> sys.stderr, "  - Permanently delete user accounts"
        print >> sys.stderr, "\nHave you backed up your database? (yes/no): "

        response = raw_input().strip().lower()
        if response != 'yes':
            print >> sys.stderr, "Aborted by user."
            logger.close()
            sys.exit(0)

        # Require typing exact phrase for additional safety
        confirmation_phrase = "DELETE %d USERS" % len(user_ids_to_delete)
        print >> sys.stderr, "\nType exactly '%s' to confirm: " % confirmation_phrase

        response = raw_input().strip()
        if response != confirmation_phrase:
            print >> sys.stderr, "Confirmation phrase did not match. Aborted."
            logger.close()
            sys.exit(0)

        print >> sys.stderr, "\nProceeding with deletion..."

    # Step 4: Update barcamp admins
    print >> sys.stderr, "\n[Step 4] Updating barcamp admins..."
    update_barcamp_admins(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 4a: Update barcamp created_by
    print >> sys.stderr, "\n[Step 4a] Anonymizing barcamp creators..."
    update_barcamp_created_by(db, user_ids_to_delete, anon_user_id, dry_run=args.dry_run)

    # Step 4b: Update barcamp user arrays (invited_admins, subscribers)
    print >> sys.stderr, "\n[Step 4b] Cleaning barcamp invited_admins and subscribers..."
    update_barcamp_user_arrays(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 5: Update event participants and waiting lists
    print >> sys.stderr, "\n[Step 5] Cleaning up event participants, waiting lists, and maybe lists..."
    update_event_participants(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 5a: Clean registration data
    print >> sys.stderr, "\n[Step 5a] Cleaning registration_data dictionary..."
    clean_registration_data(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 6: Anonymize content
    print >> sys.stderr, "\n[Step 6] Anonymizing content (sessions, comments, blog, pages, galleries)..."
    anonymize_content(db, user_ids_to_delete, anon_user_id, dry_run=args.dry_run)

    # Step 6a: Anonymize nested barcamp content
    print >> sys.stderr, "\n[Step 6a] Anonymizing nested barcamp content (blogposts, ticketclasses)..."
    anonymize_nested_barcamp_content(db, user_ids_to_delete, anon_user_id, dry_run=args.dry_run)

    # Step 7: Delete session votes
    print >> sys.stderr, "\n[Step 7] Deleting session votes..."
    delete_session_votes(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 8: Delete tickets and related data
    print >> sys.stderr, "\n[Step 8] Deleting tickets, favorites, and participant data..."
    delete_tickets_and_related(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 9: Delete users
    print >> sys.stderr, "\n[Step 9] Deleting user records..."
    delete_users(db, user_ids_to_delete, dry_run=args.dry_run)

    # Step 10: Verify deletion completeness (only for non-dry-run)
    if not args.dry_run:
        print >> sys.stderr, "\n[Step 10] Verifying deletion completeness..."
        orphaned_refs = verify_deletion_complete(db, user_ids_to_delete, anon_user_id)

        if orphaned_refs:
            print >> sys.stderr, "\n" + "!" * 70
            print >> sys.stderr, "ERROR: Found %d orphaned user references!" % len(orphaned_refs)
            print >> sys.stderr, "!" * 70
            print >> sys.stderr, "\nOrphaned references (first 20):"
            for collection, field, user_id in orphaned_refs[:20]:
                print >> sys.stderr, "  - %s.%s: %s" % (collection, field, user_id)
            if len(orphaned_refs) > 20:
                print >> sys.stderr, "  ... and %d more" % (len(orphaned_refs) - 20)
            print >> sys.stderr, "\nDeletion was NOT complete. Please review the script and try again."
            logger.close()
            sys.exit(1)
        else:
            print >> sys.stderr, "  ✓ Verification passed - no orphaned references found"

    # Summary
    print >> sys.stderr, "\n" + "=" * 70
    print >> sys.stderr, "SUMMARY"
    print >> sys.stderr, "=" * 70
    if args.dry_run:
        print >> sys.stderr, "DRY RUN completed - no actual changes were made"
        print >> sys.stderr, "Run without --dry-run to perform actual deletion"
    else:
        print >> sys.stderr, "Deletion completed successfully!"
        print >> sys.stderr, "All user data verified as removed or anonymized."
    print >> sys.stderr, "Users deleted: %d" % len(user_ids_to_delete)
    print >> sys.stderr, "Users kept: %d" % len(users_to_keep)
    print >> sys.stderr, "\nCompleted at: %s" % datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print >> sys.stderr, "Log file: %s" % log_file
    print >> sys.stderr, "=" * 70

    logger.close()


if __name__ == '__main__':
    main()
