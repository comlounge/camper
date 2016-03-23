# eventlist is used on the registration screen

$.fn.eventlist = (opts, {}) ->
    
    dataurl = null
    data = null

    update_event = (d) ->
        elem = $("#e-"+d.eid)
        elem.find(".plabel").hide()
        # reset all checkmarks and bold fonts
        elem.find(".dlabel").hide().css("font-weight", "normal").find("i").remove()
        elem.find("button").hide()
        if not d.participant and not d.waitinglist and not d.maybe
            if d.full
                elem.find(".btn-joinwl").show()
            else
                elem.find(".btn-join").show()
            elem.find(".btn-maybe").show()
            elem.find(".infolabel.plabel-going").hide()
            elem.find(".infolabel.plabel-notgoing").show()
        else
            # we have somehow signed up
            elem.find(".dropdown-toggle").removeClass("btn-info").removeClass("btn-success").removeClass("btn-warning")
            if d.participant
                elem.find(".label-going").show()
                elem.find(".infolabel.plabel-going").show()
                elem.find(".infolabel.plabel-notgoing").hide()
                elem.find(".dlabel.maybe").show()
                # show the active state as a non-clickable element with a checkmark in front
                elem.find(".dlabel.going").show().css("font-weight","bold")
                .prepend('<i class="fa fa-check"></i> ')
                .parent()
                .addClass("disabled")

                elem.find(".dropdown-toggle").addClass("btn-success")
            else if d.waitinglist
                elem.find(".label-waitinglist").show()
                elem.find(".infolabel.plabel-going").hide()
                elem.find(".infolabel.plabel-notgoing").show()
                elem.find(".dlabel.maybe").show()
                elem.find(".dropdown-toggle").addClass("btn-warning")
                elem.find(".dlabel.going").show().css("font-weight","bold")
                .prepend('<i class="fa fa-check"></i> ')
                .parent()
                .addClass("disabled")
            else if d.maybe
                elem.find(".label-maybe").show()
                elem.find(".infolabel.plabel-going").hide()
                elem.find(".infolabel.plabel-notgoing").show()
                elem.find(".dlabel.going").show()
                elem.find(".dropdown-toggle").addClass("btn-info")
                elem.find(".dlabel.maybe").show().css("font-weight","bold")
                .prepend('<i class="fa fa-check"></i> ')
                .parent()
                .addClass("disabled")
            elem.find(".pselect").css('display', 'inline-block')
            elem.find(".dropdown-toggle").show()

        # set the event size
        elem.find(".filled").text(d.filled)
        elem.find(".size").text(d.size)



        # update datelist
        elem = $("#ne-"+d.eid)
        elem.find(".plabel").hide()

        if d.participant
            elem.find(".plabel-going").show()
        else if d.maybe
            elem.find(".plabel-maybe").show()
        else if d.waitinglist
            elem.find(".plabel-waiting").show()
        else
            elem.find(".plabel-not").show()

    
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


$ ->
    $("#eventlist").eventlist()
    $('.participant-avatar').tooltip
        container: 'body'

    # handle tab preload
    hash = document.location.hash
    prefix = "tab_";
    if hash
        $('.nav-tabs a[href='+hash.replace(prefix,"")+']').tab('show') 

    $('.nav-tabs a').on 'shown', (e) ->
        window.location.hash = e.target.hash.replace("#", "#" + prefix)

