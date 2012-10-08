$.fn.uploader = (opts = {}) ->
    file_completed = false     
    myfilename = null          

    # show uploadbar and hide upload button
    on_upload = (filename) ->  
        $("#uploadbutton").hide()       
        $("#progressbar").show()

    init = () ->
        url = $(this).attr("action")
        widget = this
        uploader = new qq.FileUploaderBasic(
            button: $(widget).find(".uploadbutton")[0]
            action: url
            multiple: false
            sizeLimit: 200*1024*1024
            onProgress: (id, filename, loaded, total) ->
                perc = parseInt(Math.floor(loaded/total*100))+"%"
                $(widget).find(".progressbar .progress").css("width", perc)
            onSubmit: (id, filename) ->
                $(widget).find(".progressbar").show()
                $(widget).find(".uploadsuccess").hide()
                $(widget).find(".uploaderror").hide()
            onComplete: (id, filename, json) ->
                if json.error
                    file_completed = false
                    myfilename = null
                    $(widget).find(".uploadbutton").show()
                    $(widget).find(".progressbar").hide()
                    return false
                if json.success
                    file_completed = true
                    if json.redirect
                        window.location = json.redirect
                        return
                    myfilename = json.filename
                    $(widget).find(".uploadbutton").show()
                    $(widget).find(".uploadsuccess").show()
                    $(widget).find(".progressbar").hide()
        )
    $(this).each(init)
    this

$(document).ready( () ->
    $(".uploadform").uploader()
    $(".logo-delete").click( () ->
        confirm_message = $(this).data("confirm")
        url = $(this).data("url")
        if confirm(confirm_message)
            $.ajax(
                url: url
                type: "POST"
                data:
                    method: "delete"
                success: () ->
                    window.location.reload()
            )
        else
            return
    )
)


