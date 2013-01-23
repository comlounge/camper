$.fn.uploader = (opts = {}) ->
    file_completed = false     
    myfilename = null          

    init = () ->
        url = $(this).data("url")
        postproc = $(this).data("postproc")
        widget = this
        uploader = new qq.FileUploaderBasic(
            button: $(widget).find(".uploadbutton")[0]
            action: url
            multiple: false
            sizeLimit: 10*1024*1024
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
            onProgress: (id, filename, loaded, total) ->
                perc = parseInt(Math.floor(loaded/total*100))+"%"
                $(widget).find(".progressbar .progress").css("width", perc)
            onSubmit: (id, filename) ->
                $(widget).find(".progressbar").show()
                $(widget).find(".preview-area").hide()
            onComplete: (id, filename, json) ->
                if json.status == "error" 
                    file_completed = false
                    myfilename = null
                    $(widget).find(".upload-area").show()
                    $(widget).find(".progressbar").hide()
                    return false
                if json.status == "success"
                    file_completed = true
                    field_id = $(widget).data("id")+"-id"
                    $("#"+field_id).val(json.asset_id)
                    if json.url
                        $(widget).find(".preview-area img").attr("src", json.url)
                        $(widget).find(".progressbar").hide()
                        $(widget).find(".preview-area").show()
                    if json.redirect
                        window.location = json.redirect
                        return
                    if json.parent_redirect
                        window.parent.window.location = json.parent_redirect
                        window.close()
                        return
                    $(widget).find(".upload-area").show()
                    $(widget).find(".progressbar").hide()
        )
    $(this).each(init)
    this

$(document).ready( () ->
    $(".upload-widget").uploader()
)


