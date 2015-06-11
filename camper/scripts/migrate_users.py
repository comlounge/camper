from starflyer import ScriptBase

class MigrateUsers(ScriptBase):
    """script for migrating users to new userbase format"""

    def __call__(self):
        users = self.app.config.dbs.db.users

        for u in users.find():
            u['_password'] = u['password']
            del u['password']

            users.save(u)
            log.info("user %s saved" %u['fullname'])

        

def migrate_users(*args, **kwargs):
    s = MigrateUsers()
    s()
