import argparse
import pymongo
from starflyer import ScriptBase

class PathChanger(ScriptBase):
    """script for changing the base path in the image database due to broken setup"""

    def extend_parser(self):
        """extend the change path script with necessary arguments"""

        self.parser.add_argument('--old_path', required=True, help='old path (e.g. /home/user/images)')
        self.parser.add_argument('--new_path', required=True, help='new path (e.g. /home/user2/new_images)')
        
    def __call__(self):
        data = vars(self.args)
        op = data['old_path']
        np = data['new_path']
        db = self.app.config.dbs.db
        for asset in db.assets.find():
            p = asset['store_metadata']['path']
            p = p.replace(op, np)
            asset['store_metadata']['path'] = p
            db.assets.save(asset)
        

        

def change_path(*args, **kwargs):
    pc = PathChanger()
    pc()
