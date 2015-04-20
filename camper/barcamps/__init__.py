import index
import images
import add
import edit
import newsletter
import sessions
import userlist
import pads
import permissions
import location
import registration
import dashboard
import delete
import tweetwally
import sponsors
import events
import sessionboard
import user_events
import sessionpad
import galleries
import design

from starflyer import Module, URL

class BarcampModule(Module):
    """handles everything regarding barcamps"""

    name = "barcamps"

    routes = [
        URL('/b/add',               'add',                              add.AddView),
        URL('/b/validate',          'validate',                         add.ValidateView),
        URL('/<slug>',              'index',                            index.View),
        URL('/<slug>/validate',     'validate',                         add.ValidateView),
        URL('/<slug>/delete',       'delete',                           delete.DeleteConfirmView),
        URL('/<slug>/edit',         'edit',                             edit.EditView),
        URL('/<slug>/mails_edit',   'email_template_editor',            edit.MailsEditView),
        URL('/<slug>/newsletter_send', 'newsletter_send',               newsletter.NewsletterEditView),
        URL('/<slug>/participants_edit', 'participants_edit',           edit.ParticipantsEditView),
        URL('/<slug>/registration_editor', 'registration_form_editor',  edit.ParticipantsDataEditView),
        URL('/<slug>/registration.xls', 'registration_data_export',     registration.RegistrationDataExport),

        #URL('/<slug>/sponsors',     'sponsors',         index.BarcampSponsors),
        
        URL('/<slug>/location',     'location',                         location.LocationView),
        URL('/<slug>/planning',     'planning_pad',                     pads.PlanningPadView),
        URL('/<slug>/planning/toggle', 'planning_pad_toggle',           pads.PadPublicToggleView),
        URL('/<slug>/docpad',       'documentation_pad',                pads.DocumentationPadView),
        URL('/<slug>/lists',        'userlist',                         userlist.UserLists),
        URL('/<slug>/tweetwally',   'tweetwally',                       tweetwally.TweetWallyView),
        URL('/<slug>/permissions',  'permissions',                      permissions.Permissions),
        URL('/<slug>/permissions/admin', 'admin',                       permissions.Admin),

        URL('/<slug>/sessions',     'sessions',                         sessions.SessionList),
        URL('/<slug>/sessions.xls', 'session_export',                   sessions.SessionExport),
        URL('/<slug>/sessions/<sid>', 'session',                        sessions.SessionHandler),
        URL('/<slug>/sessions/<sid>/vote', 'session_vote',              sessions.Vote),
        URL('/<slug>/sessions/<sid>/comments', 'session_comments',      sessions.CommentHandler),
        
        URL('/<slug>/admin/logo/upload',  'logo_upload',                images.LogoUpload),
        URL('/<slug>/admin/logo/delete',  'logo_delete',                images.LogoDelete),
        URL('/<slug>/logo', 'barcamp_logo',                             images.Logo),
        URL('/<slug>/admin/dashboard', 'dashboard',                     dashboard.DashboardView),
        URL('/<slug>/admin/sponsors', 'sponsors',                       sponsors.SponsorsView),

        URL('/<slug>/admin/design', 'admin_design',                     design.DesignView),

        URL('/<slug>/subscribe',    'subscribe',                        registration.BarcampSubscribe),
        URL('/<slug>/register',     'register',                         registration.BarcampRegister),
        URL('/<slug>/registration_form',     'registration_form',       registration.RegistrationForm),
        URL('/<slug>/admin/register',     'admin_register',             registration.BarcampAdminRegister),
        URL('/<slug>/unregister',   'unregister',                       registration.BarcampUnregister),
        URL('/<slug>/registrationdata', 'registrationdata',             registration.RegistrationData),

        URL('/<slug>/events', 'user_events',                            user_events.Events),
        URL('/<slug>/events/<eid>', 'user_events',                      user_events.Events),
        URL('/<slug>/events/<eid>/<session_slug>', 'sessionpad',        sessionpad.SessionPad),

        URL('/<slug>/admin/galleries', 'admin_galleries',               galleries.GalleryList),
        URL('/<slug>/admin/galleries/<gid>', 'admin_gallery',           galleries.GalleryAdminEdit),
        URL('/<slug>/admin/galleries/<gid>/edit', 'gallery_image_edit', galleries.GalleryImageEdit),


        URL('/<slug>/admin/events', 'events',                           events.EventsView),
        URL('/<slug>/admin/events/<eid>', 'event',                      events.EventView),
        URL('/<slug>/admin/events/<eid>/sessionboard', 'sessionboard',  sessionboard.SessionBoard),
        URL('/<slug>/admin/events/<eid>/sessionboard/data', 'sessionboard_data', sessionboard.SessionBoardData),

        # TODO: rename this and move this out of events (in base?)
        URL('/_/admin/getlocation', 'event_location',                   events.GetLocation), # not bound to barcamp so it also works in add form
    ]

barcamp_module = BarcampModule(__name__)
