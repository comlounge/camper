$(document).ready () ->

    $(".delete-entry").click () ->                                                                                                                                                                                                                                            
        d = $(this).data("entry")
        url = $(this).data("url")

        $.ajax(
            url: url
            type: "POST"
            data:
                method: "delete"
                entry: d
            success: () ->
                window.location.reload()
            )

        return false
