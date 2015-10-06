
Array::toDict = (key) ->
    @reduce ((dict, obj) -> dict[ obj[key] ] = obj if obj[key]?; return dict), {}

guid = () ->
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4()

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

$.fn.sessionboard = (opts = {}) ->

    element = null
    init = (opts) ->
        element = $(this)
        $(this).on("update", () ->
            saveState()
            render()
        )
        loadState()
        element.version = 0

    loadState = () ->
        $.ajax
            url: "sessionboard/data"
            dataType: 'json'
            cache: false
            success: (data) ->
                element.data = data
                render()
            error: (xhr, status, err) ->
                console.error("url", status, err.toString())

    saveState = () ->
        $.ajax
            url: "sessionboard/data"
            data : JSON.stringify(element.data)
            contentType : 'application/json'
            type : 'POST'
            success: (data) ->
                console.log "ok"
            error: (data) ->
                console.log "not so ok"

    render = () ->
        colwidth = 90/(element.data.rooms.length+1)
        html = JST["sessiontest"](
            data: element.data
            colwidth: colwidth
            version: element.version
        )
        $("#newsessions").html(html)
        init_handlers()
        element.version = element.version + 1

    # initialize all drag/drop/sortable handlers
    init_handlers = () ->
        
        # sortable
        room_dict = element.data.rooms.toDict("id")
        $("#roomcontainment").sortable(
            axis: 'x'
            helper: "clone"
            items: "td"
            placeholder: "sortable-placeholder"
            containment: 'parent'
            cancel: ".not-sortable"
            opacity: 0.5
            update: (event, ui) ->
                new_rooms = []
                $("#newsessions #roomcontainment .sorted").each () ->
                    id = $(this).data("id")
                    new_rooms.push(room_dict[id])
                element.data.rooms = new_rooms
                $("#newsessions").trigger("update")
        )

        $("#add-room-modal-button").click () ->
            html = JST["room-modal"](
                add_room: true
            )
            $("#modals").html(html)
            $('#add-room-modal').modal('show')
            $('#room-form-name').focus()

            $(".add-room-button").click () ->
                room = $("#add-room-form").serializeObject()
                if !room.name
                    return alert("Please enter a name")
                if !room.capacity
                    return alert("Please enter a capacity")
                element.data.rooms.push(room)
                $("#newsessions").trigger("update")
                $('#add-room-modal').modal('hide')
                return
            return false

        $(".del-room-button").click () ->
            if confirm($('body').data("i18n-areyousure"))
                idx = $(this).data("index")
                element.data.rooms.splice(idx,1)
                $("#newsessions").trigger("update")

        $(".edit-room-modal-button").click () ->
            idx = $(this).data("index")
            room = element.data.rooms[idx]
            html = JST["room-modal"](
                room: room
                room_idx: idx
                add_room: false
            )
            $("#modals").html(html)
            $('#add-room-modal').modal('show')
            $('#room-form-name').focus()

            $(".update-room-button").click () ->
                room = $("#add-room-form").serializeObject()
                console.log room
                room_idx = room['room_idx']
                if !room_idx
                    return alert("Error")
                if !room.name
                    return alert("Please enter a name")
                if !room.capacity
                    return alert("Please enter a capacity")
                room = JSON.parse(JSON.stringify(room))
                console.log room_idx
                element.data.rooms[room_idx] = room
                $("#newsessions").trigger("update")
                $('#add-room-modal').modal('hide')
                return


            false




        
    $(this).each(init)
    this

$(document).ready () ->
    $("#newsessions").sessionboard()