from starflyer import Handler, redirect, asjson
from camper import logged_in, is_admin, ensure_barcamp
from bson import ObjectId
from camper.barcamps.base import BarcampBaseHandler

__all__=['WorkflowView']

class WorkflowView(BarcampBaseHandler):
    """set the workflow state"""

    @logged_in()
    @ensure_barcamp()
    @is_admin()
    @asjson()
    def post(self, slug = None, eid = None, state = None):
        """render the view"""
        if state not in ('published', 'draft'):
            return {'status' : 'error', 'msg' : 'wrong workflow state given'}
        entry = self.config.dbs.blog.get(ObjectId(eid))
        entry.workflow = state
        entry.save()
        return { 'status' : 'success', 'new_state' : entry.workflow }

