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


        # scale multipliers

        @current_length = 7 # length of texts
        @old_length = 7 # old length to check for changes

        @textinput1 = $('#logoinput1')
        @textinput2 = $('#logoinput2')
        @colorinput_logo = $('#colorinput_logo')
        @colorinput1 = $('#colorinput1')
        @colorinput2 = $('#colorinput2')

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

    # update the logo
    update: () =>
        console.log "updated"
        @resize()

    # draw the full logo on the given canvas
    draw_logo: (canvas) ->
        ctx = canvas.getContext("2d")

        # compute the scale
        offsets = @compute_scale(canvas)
        scale = offsets.scale
        text_width1 = offsets.text_width1
        icon_width = offsets.icon_width
        console.log "drawing with scale #{offsets.scale}"

        # clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        # draw the elements and call the callback because of async image loading
        @draw_icon(canvas, scale)
        @draw_text(canvas, scale, icon_width, icon_width+text_width1)


    # compute the necessary scale (width scale = 1)
    # we use a given canvas to get the correct available width
    compute_scale: (canvas) ->

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

        full_width = icon_width + text_width1 + text_width2 

        factor = canvas.width / full_width
        scale = Math.min(1, factor * 0.98) # leave some room
    
        return {   
            scale: scale
            icon_width: icon_width * scale
            text_width1: text_width1 * scale
            text_width2: text_width2 * scale
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
    draw_icon: (canvas, scale) ->
        ctx = canvas.getContext("2d")

        # set the scale and color of the svg 
        svg_scale = @icon_factor * scale
        container = @icon_svg.find('g#container')
        container.attr('transform', "scale(#{svg_scale})")
        $(container.children()[0]).css('fill', @color_logo)

        # now load the image
        img = new Image()
        img.src = "data:image/svg+xml;base64,"+window.btoa($(@icon_svg).prop('outerHTML'))
        img.onload = () =>

            # center the icon in the y center
            y = (canvas.height/2) - (scale * @icon_factor * 45)

            # draw it
            ctx.drawImage(img, 0, y)
            

    # compute the size of the logo by shrinking it until it fits
    resize: () ->
        scale = 3 # initial scale
        @draw_logo(@canvas)




$.fn.logoeditor = (opts = {}) ->

    canvas = null
    ctx = null
    svg = null
    dummy = null
    font_weight = 60
    font_family = "Open Sans"
    text1 = ""
    text2 = ""
    color_logo = "#B5D749"
    color1 = "#5F7E53"
    color2 = "#B5D749"
    
    max_scale = 3
    image_scale = max_scale
    icon_image_scale = 2 # size of the icon above the color
    image_offset = 90 # offset of text from the logo
    has_scaled = false
    
    logo_scale = 0.7 # multiplier to shrink logo by logo_scale from image_scale
    old_length = 0

    init = () ->
        canvas = $('#logocanvas')[0]
        ctx = canvas.getContext("2d")
        dummy = $('#dummy_text')
        textinput1 = $('#logoinput1')
        textinput2 = $('#logoinput2')
        colorinput_logo = $('#colorinput_logo')
        colorinput1 = $('#colorinput1')
        colorinput2 = $('#colorinput2')
        text1 = $(textinput1).val() 
        text2 = $(textinput2).val()

        $(".colorpicker-container-logo").colorpicker()
        .on('changeColor', (ev) ->
                console.log "oh, an update"
                color_logo = $(colorinput_logo).val()
                color1 = $(colorinput1).val() 
                color2 = $(colorinput2).val()
                draw_image()
                draw_text()   
            )
        $('.logoinput').on('keyup', (e)->
            text1 = $(textinput1).val() 
            text2 = $(textinput2).val()
            draw_text()
            rescale()
        )
        #$('#exportpng').on('click', export_png)
        create_image()
        console.log "inited"

        $('#logoeditor-modal').on 'shown.bs.modal', ->
            set_icon()
            draw_image()
            draw_text()

        
    create_image = () ->
        svg = $("body").find('svg')
        set_icon()
        draw_image()

    set_icon = () ->
        container = svg.find('g#container')
        container.attr('transform', 'scale('+icon_image_scale+')')
        $('#logoicon').attr('src', "data:image/svg+xml;base64,"+window.btoa($(svg).prop('outerHTML')))
        
    draw_image = () ->
        container = svg.find('g#container')
        container.attr('transform', 'scale('+ logo_scale * image_scale+')')
        $(container.children()[0]).css('fill', color_logo)
        img = new Image()
        img.src = "data:image/svg+xml;base64,"+window.btoa($(svg).prop('outerHTML'))
        img.onload = () ->
            ctx.clearRect(0, 0, image_offset, canvas.height)
            console.log "centering"
            console.log img.width
            logo_width = img.width 
            image_offset = img.width/2 + (img.width*0.1)

            console.log image_offset
            ctx.drawImage(img, 0, center_y())
            $('#exportpng').attr('href', canvas.toDataURL('image/png'))
        
    draw_text = () ->
        console.log "drawing text"
        console.log image_offset

        ctx.clearRect(image_offset, 0, canvas.width, canvas.height)
        ctx.fillStyle = color1
        ctx.font = "bold "+font_weight*image_scale*0.7+"px "+font_family
        $(dummy).css('font', ctx.font)
        ctx.fillText(text1, image_offset, canvas.height/2 + image_scale*12)
        $(dummy).text(text1)
        ctx.fillStyle = color2
        ctx.font = "normal "+font_weight*image_scale*0.7+"px "+font_family
        ctx.fillText(text2, (image_offset)+$(dummy).width(), canvas.height/2+image_scale*12)
        
    center_y = () ->
        (canvas.height/2)-image_scale * logo_scale * 45 -10
        
    rescale = () ->
        console.log "rescale"
        current_length = text1.length + text2.length
        console.log current_length
        total_width = image_offset*image_scale + $(dummy).width() + ctx.measureText(text2).width

        console.log image_scale
        image_scale = 2

        logo_width = image_scale * logo_scale * 45
        console.log logo_width
        #image_offset = logo_width - 30
        draw_image()
        draw_text()

        old_length = current_length

        return

        console.log total_width
        if total_width >= canvas.width and current_length > old_length
            image_scale -= 0.2
            draw_image()
            draw_text()
            has_scaled = true
        else if total_width <= canvas.width*0.85 and image_scale < max_scale and current_length < old_length
            image_scale += 0.2
            draw_image()
            draw_text()
            has_scaled = false
        old_length = current_length
        
    export_png = (e) ->
        e.preventDefault()
        console.log "EXPORT"
        dt = canvas.toDataURL('image/png')
        console.log dt
        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream')
        #dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=logo.png')
        #dt = dt.replace(/^data:application\/octet-stream/, 'data:image/png;headers=Content-Disposition%3A%20attachment%3B%20filename=logo.png')
        console.log dt
        window.location = dt

    $(this).each(init)
    this

$ ->
    #$("body").logoeditor()
    le = new LogoEditor()
    le.init()
    $("#logoeditor-modal").modal("show")

