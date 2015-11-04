class LogoEditor

    font_weight: 180
    font_family: "Open Sans"
    icon_factor: 2.7 # the factor we need to multiply the icon with for the logo
    icon_label_scale: 2 # the size of the icon in the colorpicker
    
    constructor: () ->

        @canvas = $("#logocanvas")[0] # the canvas you see
        @final_canvas = $("#finalcanvas")[0] # the canvas for the full size logo for saving
        @export_canvas = $("#exportcanvas")[0] # the real big canvas for exporting

        @tmp_text = $("#tmp_text") # the temporary canvas for computing sizes

        @icon_svg = $("#icon-svg") # the inline SVG with the barcamp icon
        @icon_img = null

        # UI
        @textinput1 = $('#logoinput1')
        @textinput2 = $('#logoinput2')
        @colorinput_logo = $('#colorinput_logo')
        @colorinput1 = $('#colorinput1')
        @colorinput2 = $('#colorinput2')

        # copy from form if available
        if $("#logo_color_logo").val()
            @colorinput_logo.val($("#logo_color_logo").val())
        if $("#logo_color1").val()
            @colorinput1.val($("#logo_color1").val())
        if $("#logo_color2").val()
            @colorinput2.val($("#logo_color2").val())
        if $("#logo_text1").val()
            @textinput1.val($("#logo_text1").val())
        if $("#logo_text2").val()
            @textinput2.val($("#logo_text2").val())

        # input variables
        @text1 = @textinput1.val()
        @text2 = @textinput2.val()
        @color_logo = @colorinput_logo.val()
        @color1 = @colorinput1.val() 
        @color2 = @colorinput2.val()

    # initialize the logo editor
    init: () =>
        @init_ui()
        @init_icon()
        @update()

    # initialize the barcamp icon in the form
    init_icon: (callback) ->
        # initialize the icon in the form
        container = @icon_svg.find('g#container')
        container.attr('transform', 'scale('+@icon_label_scale+')')
        $('#logoicon').attr('src', "data:image/svg+xml;base64,"+window.btoa($(@icon_svg).prop('outerHTML')))


    # initialize all UI elements
    init_ui: () ->
        $(".colorpicker-container-logo").colorpicker()
        .on('changeColor', (ev) =>
                @color_logo = @colorinput_logo.val()
                @color1 = @colorinput1.val() 
                @color2 = @colorinput2.val()
                @update()
            )
        $('.logoinput').on('keyup', (e) =>
            @text1 = @textinput1.val() 
            @text2 = @textinput2.val()
            @update()
        )

        $('#save-as-logo-button').click (e) =>
            e.preventDefault()

            # store in form
            $("#logo_color_logo").val @colorinput_logo.val()
            $("#logo_color1").val @colorinput1.val()
            $("#logo_color2").val @colorinput2.val()
            $("#logo_text1").val @textinput1.val()
            $("#logo_text2").val @textinput2.val()


            # now draw logo, save it and close modal

            save_logo = (canvas) =>
                data = canvas.toDataURL("image/png")
                parts = data.split(",")
                base64 = parts[parts.length - 1]
                $("#save-as-logo-button").hide()
                $("#saving-as-logo-button").show()


                # now post data back to server and close modal on success
                $.ajax
                    url: $("#logoeditor-modal").data("upload-url")
                    type: "POST"
                    data: 
                        data: base64
                        filename: "#{@text1}#{@text2}logo.png"

                    success: (data) ->
                        # now set data on upload widget
                        widget = $("#uploadwidget-logo")

                        $("#logo").val(data.asset_id)
                        widget.find(".uploader-buttons").show()

                        widget.find(".preview-area img").attr("src", data.url)
                        widget.find(".progress").hide()
                        widget.find(".preview-area").show()

                        # reset button and close modal
                        $("#logoeditor-modal").modal("hide")
                        $("#save-as-logo-button").show()
                        $("#saving-as-logo-button").hide()

                    error: () ->
                        $("#save-as-logo-button").show()
                        $("#saving-as-logo-button").hide()


            @draw_logo(@final_canvas, 1.5, save_logo)


        $('#save-as-png-button').click (e) =>
            e.preventDefault()
            callback = (canvas) =>
                a = document.createElement("a")
                a.download = "#{@text1}#{@text2}logo.png"
                a.href = canvas.toDataURL("image/png")
                a.click()
                return

            @draw_logo(@export_canvas, 3.8, callback)
            $("#logoeditor-modal").modal("hide")



    # update the logo
    update: () =>
        @draw_logo(@canvas, 1.1)

    # draw the full logo on the given canvas
    draw_logo: (canvas, screen_factor = 1, callback = null) ->
        ctx = canvas.getContext("2d")

        # compute the scale
        offsets = @compute_scale(canvas, screen_factor)
        scale = offsets.scale
        text_width1 = offsets.text_width1
        icon_width = offsets.icon_width
        console.log "drawing with scale #{offsets.scale}"

        # clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        # draw the elements and call the callback because of async image loading
        @draw_text(canvas, scale, icon_width, icon_width+text_width1)
        @draw_icon(canvas, scale, callback)


    # compute the necessary scale (width scale = 1)
    # we use a given canvas to get the correct available width
    # screen_factor defines with which factor the scale is multiplied
    # so it should be the factor of which the export or final canvas is bigger
    compute_scale: (canvas, screen_factor) ->


        # compute text widths
        font1 = "bold #{@font_weight * 0.7}px #{@font_family}"
        font2 = "normal #{@font_weight * 0.7}px #{@font_family}"
        
        # compute the text sizes
        text_width1 = $("#tmp_text")
            .css 'font', font1
            .text @text1
            .width()

        text_width2 = $("#tmp_text")
            .css 'font', font2
            .text @text2
            .width()

        # compute icon width
        icon_width = 90 * @icon_factor

        full_width = (icon_width + text_width1 + text_width2)*1.1

        # we always take the original canvas as reference before scaling up
        factor = @canvas.width / full_width
        scale = Math.min(1, factor * 0.98) # leave some room
    
        return {   
            scale: scale * screen_factor
            icon_width: icon_width * scale * screen_factor
            text_width1: text_width1 * scale * screen_factor
            text_width2: text_width2 * scale * screen_factor
        }


    # draw the 2 texts
    draw_text: (canvas, scale, offset1, offset2) ->
        ctx = canvas.getContext("2d")

        # clear text part
        ctx.clearRect(offset1, 0, canvas.width-offset1, canvas.height)


        font1 = "bold #{@font_weight * scale * 0.7}px #{@font_family}"
        font2 = "normal #{@font_weight * scale * 0.7}px #{@font_family}"

        ctx.font = font1
        ctx.fillStyle = @color1
        ctx.fillText(@text1, offset1, canvas.height/2 + scale*40)

        ctx.fillStyle = @color2
        ctx.font = font2
        ctx.fillText(@text2, (offset2), canvas.height/2+scale*40)



    # draw the icon part in the given canvas
    draw_icon: (canvas, scale, callback = null) ->
        ctx = canvas.getContext("2d")

        # set the scale and color of the svg 
        console.log scale
        svg_scale = @icon_factor * scale
        container = @icon_svg.find('g#container')
        container.attr('transform', "scale(#{svg_scale})")
        console.log svg_scale
        $(container.children()[0]).css('fill', @color_logo)

        img = new Image(90 * @icon_factor * scale, 90 * @icon_factor * scale)
        
        img.src = "data:image/svg+xml;base64,"+window.btoa($(@icon_svg).prop('outerHTML'))
        img.onload = () =>
        
            # center the icon in the y center
            y = (canvas.height/2) - (scale * @icon_factor * 45)

            # draw it
            ctx.drawImage(img, 0, y)

            if callback
                callback(canvas)
            

    # compute the size of the logo by shrinking it until it fits
    resize: () ->
        @draw_logo(@canvas)






$ ->
    le = new LogoEditor()
    le.init()

