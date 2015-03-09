$(document).ready () ->

    $(".delete-entry").click () ->                                                                                                                                                                                                                                            
        d = $(this).data("entry")
        url = $(this).data("url")
        console.log url
        console.log d

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
