$.fn.uploader = (opts = {}) ->
    file_completed = false     
    myfilename = null          

    # show uploadbar and hide upload button
    on_upload = (filename) ->  
        $("#uploadbutton").hide()       
        $("#progressbar").show()

    init = () ->
        url = $("#uploadform").attr("action")
        uploader = new qq.FileUploaderBasic(
            button: $("#uploadbutton")[0]
            action: url
            multiple: false
            sizeLimit: 200*1024*1024
            onProgress: (id, filename, loaded, total) ->
                perc = parseInt(Math.floor(loaded/total*100))+"%"
                $("#progressbar .progress").css("width", perc)
            onSubmit: (id, filename) ->
                $("#progressbar").show()
                $("#uploadsuccess").hide()
                $("#uploaderror").hide()
            onComplete: (id, filename, json) ->
                if json.error
                    file_completed = false
                    myfilename = null
                    $("#uploadbutton").show()
                    $("#progressbar").hide()
                    return false
                if json.success
                    file_completed = true
                    myfilename = json.filename
                    $("#uploadbutton").show()
                    $("#uploadsuccess").show()
                    $("#progressbar").hide()
                    $('#filetable tr:last').after(json.html)
        )
    $(this).each(init)
    this

$(document).ready( () ->
    $("#uploadbutton").uploader()
)


