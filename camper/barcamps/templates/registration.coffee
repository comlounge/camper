$.fn.eventlist = (opts, {}) ->
    
    init = () ->
        dataurl = $(this).data("url")
        $.ajax
            url: url
            type: "GET"
            success: (data) ->
                console.log data

$(document).ready () ->
    $("#eventlist").eventlist()