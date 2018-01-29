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
import registrationwizard
import ticketwizard
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
import wizard
import ticketeditor
import mytickets
import ticketlist
import legal
import legaledit
import socialedit
import duplicate
import customfields

from starflyer import Module, URL

class BarcampModule(Module):
    """handles everything regarding barcamps"""

    name = "barcamps"

    routes = [
        URL('/b/setup',                     'setup',                            add.SetupView),
        URL('/b/add/<paid>',                'add',                              add.AddView),
        URL('/b/validate',                  'validate',                         add.ValidateView),
        URL('/<slug>',                      'index_redirect',                   index.RedirectView),
        URL('/<slug>/',                     'index',                            index.View),
        URL('/<slug>/validate',             'validate',                         add.ValidateView),
        URL('/<slug>/delete',               'delete',                           delete.DeleteConfirmView),
        URL('/<slug>/edit',                 'edit',                             edit.EditView),
        URL('/<slug>/legaledit',            'legaledit',                        legaledit.LegalEditView),
        URL('/<slug>/socialedit',           'socialedit',                       socialedit.SocialEditView),
        URL('/<slug>/mails_edit',           'email_template_editor',            edit.MailsEditView),
        URL('/<slug>/newsletter_send',      'newsletter_send',                  newsletter.NewsletterEditView),
        URL('/<slug>/participants_edit',    'participants_edit',                edit.ParticipantsEditView),
        URL('/<slug>/registration_editor',  'registration_form_editor',         customfields.ParticipantsDataEditView),
        URL('/<slug>/registration.xls',     'registration_data_export',         registration.RegistrationDataExport),

        #URL('/<slug>/sponsors',     'sponsors',         index.BarcampSponsors),
        
        URL('/<slug>/location',             'location',                         location.LocationView),
        URL('/<slug>/planning',             'planning_pad',                     pads.PlanningPadView),
        URL('/<slug>/planning/toggle',      'planning_pad_toggle',              pads.PadPublicToggleView),
        URL('/<slug>/docpad',               'documentation_pad',                pads.DocumentationPadView),
        URL('/<slug>/lists',                'userlist',                         userlist.UserLists),
        URL('/<slug>/tweetwally',           'tweetwally',                       tweetwally.TweetWallyView),
        URL('/<slug>/permissions',          'permissions',                      permissions.Permissions),
        URL('/<slug>/permissions/admin',    'admin',                            permissions.Admin),
        
        URL('/<slug>/tos',                  'tos',                              legal.TOSView),
        URL('/<slug>/cancellation',         'cancellation',                     legal.CancelView),

        URL('/<slug>/sessions',             'sessions',                         sessions.SessionList),
        URL('/<slug>/sessions.xls',         'session_export',                   sessions.SessionExport),
        URL('/<slug>/sessions/<sid>',       'session',                          sessions.SessionHandler),
        URL('/<slug>/sessions/<sid>/vote',  'session_vote',                     sessions.Vote),
        URL('/<slug>/sessions/<sid>/comments', 'session_comments',              sessions.CommentHandler),
        
        URL('/<slug>/admin/logo/upload',    'logo_upload',                      images.LogoUpload),
        URL('/<slug>/admin/logo/delete',    'logo_delete',                      images.LogoDelete),
        URL('/<slug>/logo',                 'barcamp_logo',                     images.Logo),
        URL('/<slug>/admin/dashboard',      'dashboard',                        dashboard.DashboardView),
        URL('/<slug>/admin/sponsors',       'sponsors',                         sponsors.SponsorsView),
        URL('/<slug>/admin/sponsors/sort',  'sponsors_sort',                    sponsors.SponsorsSort),


        URL('/<slug>/admin/design',         'admin_design',                     design.DesignView),
        URL('/<slug>/admin/design/upload',  'admin_design_upload',              design.LogoUpload),

        URL('/<slug>/subscribe',            'subscribe',                        registration.BarcampSubscribe),
        URL('/<slug>/register',             'register',                         registration.BarcampRegister),
        URL('/<slug>/wizard',               'wizard',                           registrationwizard.RegistrationWizard),
        URL('/<slug>/wizard/tologin',       'tologin',                          registrationwizard.LoginRedirect),
        URL('/<slug>/validate_email',       'validate_email',                   registrationwizard.EMailValidation),
        URL('/<slug>/registration_form',    'registration_form',                registration.RegistrationForm),
        URL('/<slug>/registrationdata',     'registrationdata',                 registration.RegistrationData),

        URL('/<slug>/tickets',              'tickets',                          ticketwizard.TicketWizard),
        URL('/<slug>/mytickets',            'mytickets',                        mytickets.MyTickets),
        URL('/<slug>/mytickets/<ticket_id>/cancel',            'ticketcancel',                     mytickets.TicketCancel),
        URL('/<slug>/mytickets/<ticket_id>','ticketpdf',                        mytickets.TicketPDF),

        URL('/<slug>/admin/galleries',      'admin_galleries',                  galleries.GalleryList),
        URL('/<slug>/admin/galleries/<gid>','admin_gallery',                    galleries.GalleryAdminEdit),
        URL('/<slug>/admin/galleries/<gid>/edit', 'gallery_image_edit',         galleries.GalleryImageEdit),
        URL('/<slug>/admin/galleries/<gid>/title', 'gallery_title_edit',        galleries.GalleryTitleEdit),

        URL('/<slug>/admin/wizard',         'admin_wizard',                     wizard.BarcampWizard),
        
        URL('/<slug>/admin/duplicate',      'admin_duplicate',                  duplicate.DuplicateBarcamp),

        URL('/<slug>/admin/tickets',        'admin_ticketeditor',               ticketeditor.TicketEditor),
        URL('/<slug>/admin/tickets/<tc_id>','admin_ticketedit',                 ticketeditor.TicketClassEdit),
        URL('/<slug>/admin/tickets/config', 'admin_ticketconfig',               ticketeditor.TicketingConfig),
        URL('/<slug>/admin/tickets/users',  'admin_ticketlist',                 ticketlist.TicketList),
        URL('/<slug>/admin/tickets/<ticket_id>/cancel','admin_ticketcancel',        ticketlist.TicketCancel),
        URL('/<slug>/admin/tickets/<ticket_id>/resend','admin_ticketresend',        ticketlist.TicketResend),

        URL('/<slug>/events',               'user_events',                      user_events.Events),
        URL('/<slug>/events/<eid>',         'user_event',                       user_events.Event),
        URL('/<slug>/events/<eid>/<session_slug>', 'sessionpad',                sessionpad.SessionPad),

        URL('/<slug>/admin/events',         'events',                           events.EventsView),
        URL('/<slug>/admin/events/<eid>',   'event',                            events.EventView),
        URL('/<slug>/admin/events/<eid>/sessionboard', 'sessionboard',          sessionboard.SessionBoard),
        URL('/<slug>/admin/events/<eid>/sessionboard/data', 'sessionboard_data', sessionboard.SessionBoardData),
        URL('/<slug>/admin/events/<eid>/sessionboard.pdf', 'sessionboard_print', sessionboard.SessionBoardPrint),
        URL('/<slug>/admin/events/<eid>/users', 'event_participants',           events.EventParticipants),


        # TODO: rename this and move this out of events (in base?)
        URL('/_/admin/getlocation',         'event_location',                   events.GetLocation), # not bound to barcamp so it also works in add form
    ]

barcamp_module = BarcampModule(__name__)
