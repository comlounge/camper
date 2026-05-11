#!/usr/bin/env python
# coding=utf-8
import sys
import os
import argparse
import pymongo

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CONFIG = os.path.join(SCRIPT_DIR, '..', '..', '..', 'etc', 'env.ini')


def parse_config(config_file):
    mongodb_name = None
    virtual_host = None

    with open(config_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line.startswith('#'):
                continue
            if line.startswith('mongodb_name'):
                mongodb_name = line.split(':', 1)[1].strip()
            elif line.startswith('virtual_host'):
                virtual_host = line.split(':', 1)[1].strip()

    if not mongodb_name:
        raise ValueError("Could not find mongodb_name in %s" % config_file)
    if not virtual_host:
        raise ValueError("Could not find virtual_host in %s" % config_file)

    return mongodb_name, virtual_host.rstrip('/')


def main():
    parser = argparse.ArgumentParser(
        description='Get the activation link for a user by email'
    )
    parser.add_argument('email', help='Email address of the user')
    parser.add_argument('--config', default=DEFAULT_CONFIG,
                        help='Path to config file (default: etc/env.ini)')

    args = parser.parse_args()

    try:
        mongodb_name, virtual_host = parse_config(args.config)

        db = pymongo.MongoClient()['%s' % mongodb_name]

        email = args.email.lower()
        user = db.users.find_one({'email': email})

        if user is None:
            print >> sys.stderr, "Error: No user found with email '%s'" % args.email
            sys.exit(1)

        if user.get('active', False):
            print >> sys.stderr, "Warning: User '%s' is already active." % args.email

        code = user.get('activation_code')
        if not code:
            print >> sys.stderr, "Error: User '%s' has no activation code." % args.email
            sys.exit(1)

        print "%s/u/activate?code=%s" % (virtual_host, code)

    except Exception as e:
        print >> sys.stderr, "Error: %s" % e
        sys.exit(1)


if __name__ == '__main__':
    main()
