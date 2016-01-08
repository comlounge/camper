$.fn.uploader = (opts = {}) ->
    file_completed = false     
    myfilename = null   

    init = (opts) ->
        widget = this
        preview_url = $(this).data("preview-url")
        upload_url = $(this).data("upload-url")
        delete_url = $(this).data("delete-url")
        field_id = $(this).data("id")
        original_id = $("#"+field_id).val()
        autosubmit = $(this).data("autosubmit") == "True"
        uploader = new qq.FileUploaderBasic(
            button: $(widget).find(".uploadbutton")[0]
            action: upload_url
            multiple: false
            sizeLimit: 10*1024*1024
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
            onProgress: (id, filename, loaded, total) ->
                perc = parseInt(Math.floor(loaded/total*100))+"%"
                $(widget).find(".progress-bar").css("width", perc)
            onSubmit: (id, filename) ->
                $(widget).find(".progress-bar").css("width", "0%")
                $(widget).find(".progress").show()
                $(widget).find(".preview-area").hide()
                $(widget).find(".missing-area").hide()
                $(widget).find(".uploader-buttons").hide()
            onComplete: (id, filename, json) ->
                if json.status == "error" 
                    file_completed = false
                    myfilename = null
                    $(widget).find(".upload-area").show()
                    $(widget).find(".progress").hide()
                    $(widget).find(".uploader-buttons").show()
                    return false
                if json.status == "success"
                    file_completed = true
                    $("#"+field_id).val(json.asset_id)
                    if json.url and not autosubmit
                        $(widget).find(".preview-area img").attr("src", json.url)
                        $(widget).find(".progress").hide()
                        $(widget).find(".preview-area").show()
                    if json.redirect
                        window.location = json.redirect
                        return
                    if json.parent_redirect
                        window.parent.window.location = json.parent_redirect
                        window.close()
                        return
                    if autosubmit
                        $(widget).closest("form").submit()
                        return undefined
                    $(widget).find(".revertbutton").show()
                    $(widget).find(".deletebutton").hide()
                    $(widget).find(".upload-area").show()
                    $(widget).find(".progress").hide()
                    $(widget).find(".uploader-buttons").show()
        )
        $(this).find(".deletebutton").click () ->
            $(widget).find(".preview-area img").attr("src", "")
            $(widget).find(".preview-area").hide()
            if not original_id
                $(widget).find(".missing-area").show()
            $(widget).find(".deletebutton").hide()
            $(widget).find(".revertbutton").show()
            $("#"+field_id).val("")
            false
        $(this).find(".revertbutton").click () ->
            $(widget).find(".revertbutton").hide()
            $(widget).find(".preview-area img").attr("src", preview_url)
            $("#"+field_id).val(original_id)
            if not original_id
                $(widget).find(".preview-area img").attr("src", "")
                $(widget).find(".preview-area").hide()
                $(widget).find(".deletebutton").hide()
                $(widget).find(".missing-area").show()
            else
                $(widget).find(".preview-area").show()
                $(widget).find(".deletebutton").show()
            false
    $(this).each(init)
    this

$ ->
    $(".upload-widget").uploader()



