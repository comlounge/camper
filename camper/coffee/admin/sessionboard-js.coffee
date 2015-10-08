
Array::toDict = (key) ->
    @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

s4 = () ->
    Math.floor((1 + Math.random()) * 0x10000)
           .toString(16)
           .substring(1)

guid = () ->
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4()

Handlebars.registerHelper "formatTime", (datetime, format) ->
    format = "HH:mm"
    return moment(datetime).tz('UTC').format(format)

$.fn.serializeObject = () ->
    o = {}
    a = this.serializeArray()
    $.each a, () ->
        if o[this.name] != undefined
            if not o[this.name].push
                o[this.name] = [o[this.name]]
            o[this.name].push(this.value || '')
        else
            o[this.name] = this.value || ''

    return o

do ( $ = jQuery, window, document ) ->

    pluginName = "sessionboard"
    defaults =
        foo: "bar"

    class Plugin
        constructor: (@element, options) ->

            @data = {}
            @options = $.extend {}, defaults, options

            @_defaults = defaults
            @_name = pluginName

            @init()

        init: () ->
            @loadState()

        update: ->
            @saveState()
            @render()

        loadState: () ->
            $.ajax
                url: "sessionboard/data"
                dataType: 'json'
                cache: false
                success: (data) =>
                    @data = data
                    @render()
                error: (xhr, status, err) =>
                    console.error("url", status, err.toString())

        saveState: () ->
            data =
                rooms: this.data.rooms
                timeslots: this.data.timeslots
                sessions: this.data.sessions
            $.ajax
                url: "sessionboard/data"
                data : JSON.stringify(this.data)
                contentType : 'application/json'
                type : 'POST'
                success: (data) =>
                    console.log "ok"
                error: (data) =>
                    console.log "not so ok"

        get_session_id: (slot, room) ->
            ###
            generate a session if from slot and room
            ###
            d = new Date(slot.time)
            fd = moment(d).tz('UTC').format("HH:mm")
            idx = room.id+"@"+fd
            return idx


        generate_sessiontable: () ->
            ###
            generates the session table for rendering.

            It basically is a list of lists for each column and row
            ###
            table = []
            for slot in @data.timeslots
                row =
                    time: moment(slot.time).tz('UTC').format('HH:mm')
                    blocked: slot.blocked
                    reason: slot.reason
                    slots: []
                for room in @data.rooms
                    sid = @get_session_id(slot, room)
                    if @data.sessions[sid]
                        row.slots.push @data.sessions[sid]
                    else
                        row.slots.push {
                            _id: sid
                        }
                table.push row
            return table

        render: () ->
            html = JST["sessiontest"](
                data: @data
                sessions: @generate_sessiontable()
                colwidth: 90/(this.data.rooms.length+1)
            )
            $("#newsessions").html(html)
            this.init_handlers()

        add_room_modal: () =>
            html = JST["room-modal"](
                add_room: true
            )
            $("#modals").html(html)
            $('#add-room-modal').modal('show')
            $('#room-form-name').focus()

            $(".add-room-button").click @add_room
            return false

        add_room: () =>
            room = $("#add-room-form").serializeObject()
            room.id = guid()
            if !room.name
                return alert("Please enter a name")
            if !room.capacity
                return alert("Please enter a capacity")
            @data.rooms.push(room)
            @update()
            $('#add-room-modal').modal('hide')
            return

        del_room: (event) =>
            ###
            delete a room after asking for confirmation
            ###
            if confirm($('body').data("i18n-areyousure"))
                idx = $(event.currentTarget).data("index")
                @data.rooms.splice(idx,1)
                @update()

        edit_room_modal: (event) =>
            idx = $(event.currentTarget).data("index")
            room = @data.rooms[idx]
            html = JST["room-modal"](
                room: room
                room_idx: idx
                add_room: false
            )
            $("#modals").html(html)
            $('#add-room-modal').modal('show')
            $('#room-form-name').focus()
            $(".update-room-button").click @edit_room
            false

        edit_room: (event) =>
            room = $("#add-room-form").serializeObject()
            room_idx = room['room_idx']
            if !room_idx
                return alert("Error")
            if !room.name
                return alert("Please enter a name")
            if !room.capacity
                return alert("Please enter a capacity")

            # copy room data
            room = JSON.parse(JSON.stringify(room))

            # don't save index as we have it in the list already
            if room.room_idx
                delete room.room_idx

            @data.rooms[room_idx] = room
            @update()
            $('#add-room-modal').modal('hide')
            false

        set_next_time: () ->
            ###
            computes the next possible time for the timeslot modal
            ###

            l = @data.timeslots.length
            if l
                last_time = new Date(@data.timeslots[l-1].time)
                last_time = new Date(last_time.getTime() + last_time.getTimezoneOffset() * 60000) # convert to UTC
                new_time = new Date(last_time.getTime() + 60*60000)
                $("#timepicker").timepicker('setTime', new_time)
            else
                d = Date.now() # TODO: set the date of the day of the event
                dd = new Date()
                dd.setTime(d)
                dd.setHours(9)
                dd.setMinutes(0)
                dd.setSeconds(0)
                $("#timepicker").timepicker('option', 'minTime', '00:00')
                $("#timepicker").timepicker('setTime', dd)


        add_timeslot_modal: (event) =>
            ###
            show the timeslot modal and set the next available time
            ###

            # compute the new time and set the timepicker
            html = JST["timeslot-modal"]()
            $("#modals").html(html)
            $("#timepicker").timepicker
                timeFormat: "G:i"
                show24: true
            @set_next_time()
            $('#add-timeslot-modal').modal('show')
            $('#timepicker').focus()
            $("#add-timeslot-button").click @add_timeslot
            return false

        add_timeslot: (event) =>
            ###
            add a new timeslot to the list of timeslots
            ###

            timeslot = $("#add-timeslot-form").serializeObject()

            # get the local timezone offset
            now = new Date()
            localOffset = now.getTimezoneOffset()
            
            # convert to utc by removing the local offset
            entered_time = $("#timepicker").timepicker("getTime")

            utc = new Date(entered_time - localOffset*60000)
            
            timeslot.time = utc
            @data.timeslots.push timeslot

            @data.timeslots = _.sortBy(@data.timeslots, (item) ->
                t = item.time
                # loaded timeslots are string and not objects
                if typeof(t) == 'string'
                    return new Date(t)
                return t
            )
            @update()
            $('#add-timeslot-modal').modal('hide')
            return


        add_session_modal: (event) =>
            sid = $(event.currentTarget).data("id")

            # check if session already exists so we can prefill
            
            payload = @data.sessions[sid]
            if !payload
                payload = {}
            payload.session_idx = sid

            html = JST["session-modal"] payload
            $("#modals").html(html)

            # create moderator typeahead
            moderators = new Bloodhound
                datumTokenizer: Bloodhound.tokenizers.whitespace
                queryTokenizer: Bloodhound.tokenizers.whitespace
                local: @data.participants.map (p) -> p.name

            $("#moderator").tagsinput
                tagClass: 'btn btn-info btn-xs'
                typeaheadjs:
                    source: moderators.ttAdapter()

            # create session name typeahead
            proposals = new Bloodhound
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label')
                queryTokenizer: Bloodhound.tokenizers.whitespace
                local: @data.proposals

            $('#ac-title').typeahead(
                {   
                    hint: true,
                    minLength: 1
                },
                {
                    name: 'proposals'
                    displayKey: 'label'
                    source: proposals.ttAdapter()
                }
            ).bind("typeahead:select", (obj, datum, name) =>
                
                # we found a session, put in the rest of the form data

                $("#session-description").text(datum.description)
                user_id = datum.user_id
                for user in @data.participants
                    if user._id == user_id
                        $('#moderator').tagsinput('removeAll')
                        $('#moderator').tagsinput('add', user.name)
            )


            $('#edit-session-modal').modal('show')
            $("#update-session-button").click @update_session


        update_session: (event) =>
            ###
            actually add the session to the data structure
            ###
            fd = $("#edit-session-form").serializeObject()
            if not fd.session_idx
                alert("An error occurred, please reload the page")
            session = 
                sid: null # will be generated on the server
                slug: null # will be generated on the server
                _id: fd.session_idx
                title: fd.title
                description: fd.description
                moderator: fd.moderator
            @data.sessions[fd.session_idx] = session
            @update()
            $('#edit-session-modal').modal('hide')

        # initialize all drag/drop/sortable handlers
        init_handlers: () ->

            that = this
            
            # sortable
            try
                room_dict = @data.rooms.toDict("id")
            catch
                room_dict = {}
            $("#roomcontainment").sortable
                axis: 'x'
                helper: "clone"
                items: "td"
                placeholder: "sortable-placeholder"
                containment: 'parent'
                cancel: ".not-sortable"
                opacity: 0.5
                update: (event, ui) =>
                    new_rooms = []
                    $("#newsessions #roomcontainment .sorted").each () ->
                        id = $(this).data("id")
                        new_rooms.push(room_dict[id])
                    @data.rooms = new_rooms
                    @update()

            $("#add-room-modal-button").click @add_room_modal
            $(".del-room-button").click @del_room
            $(".edit-room-modal-button").click @edit_room_modal
            $("#add-timeslot-modal-button").click @add_timeslot_modal
            $(".sessionslot").click @add_session_modal

    $.fn[pluginName] = ( options ) ->
        return this.each( () ->
            if  not $.data(this, "plugin_" + pluginName)
                $.data(this, "plugin_" + pluginName,
                    new Plugin( this, options ))
        )


$(document).ready () ->
    $("#newsessions").sessionboard()