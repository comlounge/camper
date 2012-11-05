===================
Roles & Permissions
===================

We have the following roles:

Admin (global) -- main admin of all things barcamp tool
Barcamp Admin (local) -- local to a barcamp, can manage everything regarding a barcamp
Subscriber (local) -- has subscribed to a barcamp and receives news about it
Participant (local) -- is participating in a barcamp. Probably there is not much different permission wise from subscriber.

The local roles are determined by a method which takes either the logged in user or a userid and checks which roles apply
to the user for that particular barcamp. The roles are stored as lists of subscribers, participants and admins along
the barcamp object.





