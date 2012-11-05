========
Workflow
========

A barcamp has the following workflow states and transitions:

States
======

created -- the barcamp has been created but is only visible to users with the barcamp admin role. This is in the beginning
the creator of the barcamp until other users are added as barcamp admins.
in-preparation -- the barcamp is public. A date is known and people can subscribe to the barcamp. This means that they can e.g. can receive a newsletter and the barcamp is in their list of subscribed barcamps
registration-open -- now users can register for the barcamp. Being subscribed to a barcamp does not mean necessarily that you also attend it. If you register you say that you want to attend it.
running -- The barcamp is ongoing. The transition to this state is done automatically if the date is inside the barcamp date range.
finished -- The barcamp is over and you will see the documentation. 
cancelled -- The barcamp was cancelled.


Implenentation
==============

The above are more the conceptual states of a barcamp. Implementationwise it is not just a string which changes 
but needs to be computed more dynamically instead. E.g. the ``running`` state is derived from the date the barcamp 
is happening. Thus there is a dynamic property called ``workflow_state`` which does this computing task.

Moreover there are some flags a user can set on the barcamp such as private/public and the date when the registration starts. 
