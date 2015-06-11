from starflyer import ScriptBase

class MigrateUsers(ScriptBase):
    """script for migrating users to new userbase format"""

    def __call__(self):
        users = self.app.config.dbs.db.users

        for u in users.find():
            print u
            if u.has_key('password'):
                u['_password'] = u['password']
                del u['password']
                users.save(u)
            else:
                print "** user %s could not be converted" %u['fullname']
            print "user %s saved" %u['fullname']

        

def migrate_users(*args, **kwargs):
    s = MigrateUsers()
    s()
