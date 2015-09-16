$.fn.gallery = (opts = {}) ->

    # this code is based on this article: http://tympanus.net/codrops/2015/04/08/motion-blur-effect-svg/
    # highly experimental but who cares? ;-) 
    
    $container = null
    $gallery = null
    $galleryPictures = null
    $galleryPicture = null

    lastPos = {x:0}
    galleryPos = {x:0}
    currentImage = -1
    imageWidth = 700
    imageSpacing = 120
    imageTotalWidth = 0
    speedLog = []
    speedLogLimit = 5
    minBlur = 100
    maxBlur = 700
    blurMultiplier = 1.25
    lastBlur = 0
    dragging = false
    lastDragPos = {x:0}
    dragPos = {x:0}
    totalDist = 0
    distThreshold = 10
    distLog = []
    distLogLimit = 10
    momentumTween = null


    init = () ->
        $container = $(this)
        $gallery = $container.find(".gallery")
        $galleryPictures = $container.find(".gallery-pictures")
        $galleryPicture = $container.find(".gallery-picture")
        imageTotalWidth = imageWidth + imageSpacing

        $galleryPictures.css
            webkitFilter : "url('#blur')"
            filter : "url('#blur')"                

        $galleryPicture.each (i) ->
            cur = $(this)
            cur.click () ->
                if Math.abs(totalDist) < distThreshold
                    setGalleryPos(i)
            $container.find(".gallery-pagination-dot").eq(i).click () ->
                setGalleryPos(i)

        $gallery.mousedown (event) ->
            event.preventDefault()
            dragging = true
            dragPos.x = event.pageX
            lastDragPos.x = dragPos.x
            totalDist = 0
            distLog = []

            stopMomentum()
            updateGalleryPosLoop()

        $(document).mousemove (event) ->
            if dragging
                dragPos.x = event.pageX


        $(document).mouseup (event) ->
            if dragging
                dragging = false
                releaseSpeed = 0
                for s in distLog
                    releaseSpeed += s

                #for (var i = 0; i < distLog.length; i++) {
                #    releaseSpeed+=distLog[i];
                #};
                releaseSpeed /= distLog.length

                targetX = galleryPos.x + (releaseSpeed * 20)
                targetX = Math.round(targetX / imageTotalWidth) * imageTotalWidth
                targetImage=-targetX / imageTotalWidth
                excess=0

                if targetImage < 0
                    excess = targetImage
                    targetImage = 0
                else if targetImage >= $galleryPicture.length
                    excess = targetImage - ($galleryPicture.length - 1)
                    targetImage = $galleryPicture.length - 1

                if excess != 0
                    targetX = -targetImage * imageTotalWidth
                
                momentumTween = TweenMax.to galleryPos, 1 - (Math.abs(excess) / 20),
                    x:          targetX
                    ease:       Quint.easeOut
                    onUpdate:   updateGalleryPos,
                    onComplete: updateGalleryPos

                if Math.abs(totalDist) >= distThreshold
                    event.preventDefault()
                    event.stopPropagation()

        setGalleryPos(0,false)

    setBlur = (v) ->
        if v < minBlur
            v = 0
        if v > maxBlur
            v = maxBlur
        if v != lastBlur
            $("#blur").get(0).firstElementChild.setAttribute("stdDeviation",v+",0")
        lastBlur=v


    setGalleryPos = (v,anim) ->
        if typeof anim=="undefined" 
            anim=true

        stopMomentum()
        
        TweenMax.to galleryPos, anim ? 0.8 : 0,
            x:          -v*imageTotalWidth
            ease:       Quint.easeOut
            onUpdate:   updateGalleryPos
            onComplete: updateGalleryPos

    updateGalleryPos = () ->

        TweenMax.set $galleryPictures,
            x:          galleryPos.x+(($container.width()-imageWidth)/2)
            force3D:    true
            lazy:       true

        speed = lastPos.x - galleryPos.x
        blur = Math.abs(Math.round(speed * blurMultiplier))
        setBlur(blur)
        lastPos.x = galleryPos.x

        _currentImage = Math.round(-galleryPos.x / imageTotalWidth)
        if _currentImage != currentImage
            currentImage = _currentImage
            $container.find(".gallery-pagination-dot-selected").removeClass('gallery-pagination-dot-selected')
            $container.find(".gallery-pagination-dot").eq(currentImage).addClass('gallery-pagination-dot-selected')


    updateGalleryPosLoop = () ->
        if dragging 
            updateGalleryPos()
            dist = dragPos.x - lastDragPos.x
            lastDragPos.x = dragPos.x
            totalDist += dist
            distLog.push(dist)
            while distLog.length > distLogLimit
                distLog.splice(0,1)
            galleryPos.x += dist
            requestAnimationFrame(updateGalleryPosLoop)
        

    
    stopMomentum = () ->
        if momentumTween != null
            momentumTween.kill()
            momentumTween = null
            updateGalleryPos()

    $(this).each(init)
    this


$.fn.uploader2 = (opts = {}) ->
    file_completed = false     
    myfilename = null          

    # show a sponsor
    sponsor = (widget, json) ->
        $(widget).find(".upload-area").hide()
        img = $("<img>").attr(
            "src" :  json.url
            "width" : "100px"
        )
        $(widget).find(".upload-value-id").val(json.asset_id)
        $(widget).find(".preview-area").children().remove()
        $(widget).find(".preview-area").append(img).show()
        
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
                    alert(json.msg)
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
                    if postproc
                        if postproc=="sponsor"
                            sponsor(widget, json)
                    $(widget).find(".upload-area").show()
                    $(widget).find(".progressbar").hide()
        )
    $(this).each(init)
    this

$(document).ready( () ->

    $(".gallerycontainer").gallery()

    $(".upload-widget").uploader()
    $('[data-toggle=confirmation]').confirmation
        popout: true

    # live edit fields
    $('[data-toggle="editfield"]').click( () ->
        $(this).hide();
        p = $(this).closest(".editfield")
        f = $(p).find(".edit").show()
    )
    $('[data-close="editfield"]').on("click", () ->
        $(this).closest(".edit").hide();
        p = $(this).closest(".editfield")
        f = $(p).find(".value").show()
        false
    )
    $('form.edit').on("submit", () ->
        $(this).closest(".edit").hide();
        p = $(this).closest(".editfield")
        f = $(p).find(".value").show()
        alert("Gespeichert")
        false
    )

    $('[data-action="set-layout"]').click( () ->
        layout = $(this).data("layout")
        url = $(this).attr("href")
        that = this
        $.ajax 
            url: url
            type: "POST"
            data: 
                layout: layout
            success: (data) ->
                $(that).closest(".barcamp-page")
                .removeClass("layout-left")
                .removeClass("layout-default")
                .removeClass("layout-right")
                .addClass("layout-"+data.layout)

        return false
    )

    # asset deletion
    $(".asset-delete").click( () ->
        confirm_message = $(this).data("confirm")
        url = $(this).data("url")
        idx =$(this).data("idx") # for sponsor logos
        if confirm(confirm_message)
            $.ajax(
                url: url
                type: "POST"
                data:
                    method: "delete"
                    idx: idx
                success: () ->
                    window.location.reload()
            )
        else
            return
    )

    $("#blog-add-button").click( () -> 
        $("#blog-add-button-container").slideUp();
        $("#blog-add-form").slideDown();
    )
    $("#blog-add-cancel-button").click( () -> 
        $("#blog-add-form")[0].reset();
        $("#blog-add-button-container").slideDown();
        $("#blog-add-form").slideUp();
        return false;
    )
    $(".blog-delete-button").click( () -> 
        msg = $(this).data("msg")
        idx = $(this).data("idx")
        url = $("#blog-add-form").attr("action")
        if confirm(msg)
            $.ajax(
                url: url
                type: "POST"
                data:
                    method: "delete"
                    idx: idx
                success: () ->
                    window.location.reload()
            )
        false
    )

    $(".colorpicker-container").colorpicker();
    #$("#location-picker").colorbox({inline:true, width:642});

    $("a.form-submit").click ->
        action = $(this).attr("href")
        form = $(this).closest("form")
        form.attr("action", action)
        console.log form.attr("method")
        form.submit()
        false

    # map
    $("#minimap").each( () ->
        lat = $(this).data("lat")
        lng = $(this).data("lng")
        at = $(this).data("accesstoken")
        mapid = $(this).data("mapid")
        id = $(this).attr("id")
        href = $(this).data("href")
        L.mapbox.accessToken = at

        options =
            zoomControl: false
            dragging: false
            touchZoom: false
            scrollWheelZoom: false
            doubleClickZoom: false
            center: [lat, lng]
            zoom: 14
            accessToken: at
        map = L.mapbox.map(id, mapid, options)
        L.Icon.Default.imagePath = '/static/img';
        marker = L.marker([lat, lng]).addTo(map);
        goto = (e) ->
            document.location = href
        marker.on("click", goto)
        map.on("click", goto)
    )
    $("#edit-minimap").each( () ->
        lat = $(this).data("lat")
        lng = $(this).data("lng")
        at = $(this).data("accesstoken")
        mapid = $(this).data("mapid")
        id = $(this).attr("id")
        L.mapbox.accessToken = at

        options =
            zoomControl: false
            dragging: true
            touchZoom: false
            scrollWheelZoom: false
            doubleClickZoom: false
            center: [lat, lng]
            zoom: 15
            accessToken: at
        map = L.mapbox.map(id, mapid, options)
        L.Icon.Default.imagePath = '/static/img';
        marker = L.marker([lat, lng]).addTo(map);
        console.log marker
    )

    # event selector on events pages
    $("#select-event").change ->
        window.location = $("#select-event option:selected").attr("value")
        
)


