import index
import images
import add
import edit
import sessions
import userlist
import pads
import permissions
import location
import registration
import delete
import tweetwally

from starflyer import Module, URL

class BarcampModule(Module):
    """handles everything regarding barcamps"""

    name = "barcamps"

    routes = [
        URL('/b/add',               'add',              add.AddView),
        URL('/b/validate',          'validate',         add.ValidateView, defaults = {'slug' : None}),
        URL('/<slug>',              'index',            index.View),
        URL('/<slug>/validate',     'validate',         add.ValidateView),
        URL('/<slug>/delete',       'delete',           delete.DeleteConfirmView),
        URL('/<slug>/edit',         'edit',             edit.EditView),
        URL('/<slug>/participants_edit', 'participants_edit', edit.ParticipantsEditView),
        URL('/<slug>/registration_form_editor', 'registration_form_editor', edit.ParticipantsDataEditView),
        URL('/<slug>/sponsors',     'sponsors',         index.BarcampSponsors),
        URL('/<slug>/location',     'location',         location.LocationView),
        URL('/<slug>/subscribe',    'subscribe',        registration.BarcampSubscribe),
        URL('/<slug>/register',     'register',         registration.BarcampRegister),
        URL('/<slug>/unregister',   'unregister',       registration.BarcampUnregister),
        URL('/<slug>/planning',     'planning_pad',     pads.PlanningPadView),
        URL('/<slug>/planning/toggle', 'planning_pad_toggle', pads.PadPublicToggleView),
        URL('/<slug>/docpad',       'documentation_pad', pads.DocumentationPadView),
        URL('/<slug>/lists',        'userlist', userlist.UserLists),
        URL('/<slug>/tweetwally',   'tweetwally', tweetwally.TweetWallyView),
        URL('/<slug>/permissions',  'permissions', permissions.Permissions),
        URL('/<slug>/permissions/admin', 'admin', permissions.Admin),
        URL('/<slug>/sessions',     'sessions', sessions.SessionList),
        URL('/<slug>/sessions.xls', 'session_export', sessions.SessionExport),
        URL('/<slug>/sessions/<sid>', 'session', sessions.SessionHandler),
        URL('/<slug>/sessions/<sid>/vote', 'session_vote', sessions.Vote),
        URL('/<slug>/sessions/<sid>/comments', 'session_comments', sessions.CommentHandler),
        URL('/<slug>/logo/upload',  'logo_upload', images.LogoUpload),
        URL('/<slug>/logo/delete',  'logo_delete', images.LogoDelete),
        URL('/<slug>/logo', 'barcamp_logo', images.Logo),
    ]

barcamp_module = BarcampModule(__name__)
