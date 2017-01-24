#encoding=utf8    
from mongogogo import *
import datetime
from camper.exceptions import *
import isodate

__all__ = ['TicketClassSchema', 'TicketClass', 'TicketSchema', 'Ticket', 'Tickets']



class TicketClassSchema(Schema):
    """ticket class in case ticket mode is enabled for a barcamp"""
    
    _id                 = String()  # UUID identifying the ticket class internally
    created             = DateTime()
    updated             = DateTime()
    created_by          = String()  # TODO: should be ref to user
    
    name                = String()  # name of the ticket class
    description         = String()  # description (maybe html) about what this ticket class offers you
    price               = String()  # price in EUR in case 
    events              = List(String())    # list of event ids you are allowed to enter
    size                = Integer() # max amount of people allowed for this ticket

    # time when this ticket is allowed to be sold
    start_date          = Date()
    end_date            = Date()


class TicketClass(Record):
    """this extends the ticket class by some useful methods"""
    schema = TicketClassSchema()
    _protected = ['_barcamp', '_size', 'fullfull']

    def __init__(self, *args, **kwargs):
        """initialize the event"""
        super(TicketClass, self).__init__(*args, **kwargs)
        self._barcamp = kwargs.get('_barcamp', None)
        self._userbase = kwargs.get('_userbase', None)

    @property
    def full(self):
        """check if the ticket class is already sold out in terms if confirmed or pending tickets"""
        all_tickets = self.get_tickets(['confirmed', 'pending'])
        return len(all_tickets) >= self.size

    def get_tickets(self, status = "confirmed"):
        """the amount of sold tickets meaning confirmed tickets only

        :param status: a list or string of statuses we want to return
        :return: a list of ticket dicts
        """
        if type(status) != type([]):
            status = [status]
        my_tickets = self._barcamp.tickets.get(self._id, {})
        tickets = []
        for tid, ticket in my_tickets.items():
            if ticket['status'] not in status:
                continue
            ticket['_id'] = tid
            tickets.append(ticket)

        # fill in the users
        uids = [t['user_id'] for t in tickets]
        users = self._userbase.get_users_by_ids(uids)
        userdict = {}
        for user in users:
            userdict[str(user._id)] = user
        new_tickets = []

        for t in tickets:
            t['user'] = userdict.get(t['user_id'], None)
            new_tickets.append(t)

        return new_tickets

    def get_ticket_users(self, status = "confirmed"):
        """return just the users for this ticket class"""
        return [t['user'] for t in self.get_tickets(status)]

    def get_tickets_by_userid(self, user_id, status = "confirmed"):
        """return the tickets for a specific user ids"""
        if type(status) != type([]):
            status = [status]

        my_tickets = self._barcamp.tickets.get(self._id, {})
        result = []
        for tid, ticket in my_tickets.items():
            if ticket['user_id'] != user_id:
                continue
            if ticket['status'] not in status:
                continue
        return result


class TicketSchema(Schema):
    """models a ticket acquired by a user"""


    created             = DateTime()
    updated             = DateTime()
    workflow            = String(required = True, default = "pending")

    barcamp_id          = String()  # uid if the barcamp this ticket belongs to
    ticketclass_id      = String()  # the id of the ticket class this ticket belongs to
    user_id             = String()  # owner of the ticket
    workflow            = String()  # see status above


class Ticket(Record):
    """a single ticket reserved for a barcamp"""
    _protected = ['schema', 'collection', '_protected', '_schemaless', 'default_values', 'workflow_states', 'initial_workflow_state']
    initial_workflow_state = "created"
    default_values = {
        'created'       : datetime.datetime.utcnow,
        'updated'       : datetime.datetime.utcnow,
        'workflow'      : 'pending',
    }

    workflow_states = {
        'in_registration'   : ['pending', 'confirmed'], # this state is used if user is still being registered
        'pending'           : ['confirmed'], # might be pending if prereg is on
        'confirmed'         : ['cancelled', 'deleted'], # ticket is live
        'cancelled'         : [], # ticket was cancelled by user 
        'deleted'           : [], # ticket was cancelled by admin
    }
    
class Tickets(Collection):

    data_class = Ticket


    def get_tickets_for_user(self, user_id, status="confirmed"):
        """return the tickets for a specific user id.

        :param user_id: the user id of the user to retrieve the tickets for 
        :param status: a string or list of strings defining which tickets to retrieve
        :return: list of ticket objects
        """

        # always a list
        if type(status) != type([]):
            status = [status]
        
        result = []
        for tc in self.ticketlist:
            for uid, ticket in self.tickets.get(tc._id, {}).items():
                if uid == user_id and ticket['status'] in status:
                    result.append(tc)
        return result





