$.fn.sessionvoter = (opts = {}) ->
    console.log "init"
    init = () ->
        url = $(this).data("url")
        that = this
        $(this).find("a.vote").click( () ->
            $.ajax(
                url: url
                type: "POST"
                success: (data, status) ->
                    $(that).find(".votes").text(data.votes)
                    if data.active
                        $(that).find("a.vote").removeClass("inactive").addClass("active")
                    else
                        $(that).find("a.vote").removeClass("active").addClass("inactive")
            )
            return false
        )
    $(this).each(init)
    this


$(document).ready( () ->
    $(".votecontainer").sessionvoter()
)


