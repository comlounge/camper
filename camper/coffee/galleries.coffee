$(document).ready () ->

    $("#imagelisting").on "click", ".imagedetailblock .edittoggle", () ->
        $(this).closest(".imagedetails").hide()
        id = $(this).data("image-id")
        $("#imageform-"+id).show()

    $("#imagelisting").on "click", ".imagedetailblock .canceltoggle", () ->
        $(this).closest(".imagedetailform").hide()
        id = $(this).data("image-id")
        $("#details-"+id).show()

    $("#imagelisting").on "submit", ".imagedetailform", () ->
        event.preventDefault()
        id = $(this).data("image-id")
        url = $(this).attr("action")
        $.ajax
            type: "post"
            url: url
            data: $(this).serialize()
            contentType: "application/x-www-form-urlencoded"
            success: (data) ->

                # update the form and details
                $("#block-"+id).replaceWith($(data.html))

                # show details again
                $("#imageform-"+id).hide()
                $("#details-"+id).show()
                
            error: () ->
                alert("an error occurred, please try again later")
            

    # we use a separate delete button here because bootstrap confirmation
    # does not work anymore after an element has dynamically been added
    # it's simply easier this way.
    $(".listing").on "click", ".deletebtn", () ->
        d = $(this).data("image-id")
        url = $(this).data("url")
        msg = $("body").data("i18n-areyousure")
        if confirm(msg)
            $.ajax(
                url: url
                type: "POST"
                data:
                    method: "delete"
                    entry: d
                success: (data) ->
                    if data.id
                        $("#"+data.id).css({'background-color' : '#eaa'})
                        $("#"+data.id).slideUp()
                )

        return false



