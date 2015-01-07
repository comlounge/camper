$.fn.sessionvoter = (opts = {}) ->
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
    $("#new-proposal-button").click( () ->
        $(this).hide()
        $("#proposal-form-container").show()
        false
    )
    $("#proposal-cancel").click( () ->
        $("#new-proposal-button").show()
        $("#proposal-form-container").hide()
        false
    )

    $(".session-edit-button").click( () ->
        $(this).closest(".show-box").hide()
        $(this).closest(".show-box").parent().find(".edit-box").show()
    )
    $(".session-cancel-button").click( () ->
        $(this).closest(".edit-box").hide();
        $(this).closest(".edit-box").parent().find(".show-box").show();
    )

    $(".session-delete-button").click( () ->
        confirm_msg = $(this).data("confirm")
        that = this
        if confirm(confirm_msg) 
            $(that).closest("article").css("background-color", "red").slideUp()
            url = $(this).data("url")
            $.ajax(
                url: url
                data:
                    method: "delete"
                type: "POST"
                success: (data, status) ->
                    if (data.status == "success")
                        $(that).closest("article").css("background-color", "red").slideUp()
            )
        return false
                

    )
)


