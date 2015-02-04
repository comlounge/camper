$.fn.eventlist = (opts, {}) ->
    
    dataurl = null

    update_event = (d) ->
        elem = $("#e-"+d.eid)
        elem.find(".plabel").hide()
        elem.find(".dlabel").hide()
        elem.find("button").hide()
        if not d.participant and not d.waitinglist and not d.maybe
            if d.full
                elem.find(".btn-joinwl").show()
            else
                elem.find(".btn-join").show()
            elem.find(".btn-maybe").show()
        else
            # we have somehow signed up
            elem.find(".dropdown-toggle").removeClass("btn-info").removeClass("btn-success").removeClass("btn-warning")
            if d.participant
                elem.find(".label-going").show()
                elem.find(".dlabel.maybe").show()
                elem.find(".dropdown-toggle").addClass("btn-success")
            else if d.waitinglist
                elem.find(".label-waitinglist").show()
                elem.find(".dlabel.maybe").show()
                elem.find(".dropdown-toggle").addClass("btn-warning")
            else if d.maybe
                elem.find(".label-maybe").show()
                elem.find(".dlabel.going").show()
                elem.find(".dropdown-toggle").addClass("btn-info")
            elem.find(".pselect").show()
            elem.find(".dropdown-toggle").show()

        # set the event size
        elem.find(".filled").text(d.filled)
        elem.find(".size").text(d.size)
    
    init = () ->
        dataurl = $(this).data("url")
        $.ajax 
            url: dataurl
            type: "GET"
            success: (data) ->
                for d in data
                    update_event(d)

        $(this).find(".actions > button").click () ->
            change_status(this)
        $(this).find(".dropdown-menu a").click () ->
            change_status(this)

    change_status = (elem) ->
        # get id
        eid = $(elem).closest(".event").data("id")
        status = $(elem).data("status")
        $.ajax
            url: dataurl
            method: "POST"
            data:
                eid: eid
                status: status
            success: (data) ->
                update_event(data)
            error: () ->
                alert("An unknown error occurred, please try again")

    $(this).each(init)
    this


$(document).ready () ->
    $("#eventlist").eventlist()