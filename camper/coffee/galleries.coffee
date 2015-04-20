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
            





