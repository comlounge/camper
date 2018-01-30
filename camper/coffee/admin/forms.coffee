$.fn.serializeObject = () ->
    o = {}
    a = this.serializeArray()
    $.each a, () ->
        if o[this.name] != undefined
            if !o[this.name].push
                o[this.name] = [o[this.name]]
            o[this.name].push(this.value || '')
        else
            o[this.name] = this.value || ''
    return o

class Editable

    constructor: (@elem, @options) ->
        @state = "view"
        @url = $(@elem).closest("form").attr("action")
        return this

    clicked: () ->
        @state = if @state == 'view' then 'edit' else 'view'
        if @state == "edit"
            @show_edit_field()

    show_edit_field: () ->
        field = $(@elem).data('field')
        $.ajax(
            url: @url
            type: 'GET'
            data: 
                field: field
            success: (data) =>
                @payload = $(@elem).html()
                $(@elem).html(data.html)
                @escape()
        )

    close_edit_field: () ->
        @state = "view"
        $(@elem).html(@payload)
        @escape()
    
    escape: () ->
        if @state == "view"
            $(document).off('keyup.editable.keys')
        else
            $(document).on('keyup.editable.keys', ( e ) =>
                e.which == 27 && @close_edit_field()
                e.which == 13 && console.log "enter"
                e.preventDefault()
            )
            $(@elem).closest("form").submit( (e) ->
                e.preventDefault()
                return false
            )
            

$.fn.editable = (opts = {}) ->
    init = (opts) ->
        $this = $(this)
        data = $(this).data('editable')
        options = typeof opts == 'object' && opts
        if not data 
            data = new Editable(this, options)
            $this.data('editable', data)
        data.clicked()

    $(this).each(init)
    this

# run this on input fields to limit the input to only chars and numbers without spaces
$.fn.limitchars = (opts = {}) ->
    init = (opts) ->
        $this = $(this)
        allowed = '1234567890abcdefghijklmnopqrstuvwxyz-_'
        $(this).keypress( (e) ->
            k = parseInt(e.which)
            if k!=13 and k!=8 and k!=0
                if (e.ctrlKey == false) and (e.altKey == false) 
                    return allowed.indexOf(String.fromCharCode(k)) != -1
                else
                    return true
            else
                return true
        )
    $(this).each(init)
    this

$.fn.publish_date = (opts = {}) ->
    
    widget = null

    init = (opts) ->
        widget = this
        date = $(widget).find(".date").datepicker("getDate")
        date = $(widget).find(".time").timepicker("getTime", [date])
        now = new Date()

        if now <= date
            show_inputs()
        else
            hide_inputs()

        # set up event listeners
        $(widget).find(".edit-published").click () ->
            show_inputs()
        $(widget).find(".set-now").click () ->
            set_now()
            hide_inputs()

    set_now = () ->
        now = new Date()
        $(widget).find(".date").datepicker("setDate", [now])
        $(widget).find(".time").timepicker("setTime", now)

    show_inputs = () ->
        $(widget).find(".immediate-button").hide()
        $(widget).find(".date-edit").show()
        $(widget).find(".immediate").val("False")

    hide_inputs = () ->
        $(widget).find(".date-edit").hide()
        $(widget).find(".immediate-button").show()
        $(widget).find(".immediate").val("True")

    $(this).each(init)
    this

$.fn.view_edit_group = (opts = {}) ->

    widget = null
    
    init = (opts) ->
        widget = this

        $(widget).find(".input-switch").click () ->
            $(widget).find(".input-controls").show()
            $(widget).find(".input-view").hide()
        $(widget).find(".cancel-switch").click () ->
            $(widget).find(".input-controls").hide()
            $(widget).find(".input-view").show()
        $(widget).find(".submit").click () ->
            url = $(widget).data("url")
            data = $(widget).find("form").serializeObject()
            $.ajax
                url: url
                type: 'POST'
                data: data
                success: (data) =>
                    $('.workflow-'+data.new_state).attr('selected', 'selected')
                    $('.workflow-state').text(data.new_text_state)
                    $(widget).find(".input-controls").hide()
                    $(widget).find(".input-view").show()
                    if data.new_state=="published"
                        $("#publish-button").hide()
                    else
                        $("#publish-button").show()

    $(this).each(init)
    this

bm = ($) ->
    BigMap = (element, options) ->
        this.options = options
        this.$body          = $(document.body)
        this.$element       = $(element)
        this.map            = null
        this.marker         = null

        L.Icon.Default.imagePath = '/static/img'
        L.mapbox.accessToken = this.options.accesstoken

        console.log "init"

        options =
            zoom: 14
        this.map = L.mapbox.map(this.$element.attr('id'), this.options.mapid, options)

        this.lat = null
        this.lng = null

        map = this.map

        $('#location-picker').on 'shown.bs.modal', ->
            $(".action-overlay").show()
            $("#location-error").hide()
            $(".spinner-overlay").hide()
            map.invalidateSize()
            $("#save-location-button").prop("disabled", true)
        return this


    BigMap.DEFAULTS = 
        location_url: ""
        lat: null
        lng: null
        accesstoken: ""
        admin: 0
        mapid: ""
        locationurl: ""
        orig_lat: null # stores the lat from the lookup process
        orig_lng: null # stores the lng from the lookup process
        wobble: false

    BigMap.prototype.set_coords = (lat, lng) -> 
        this.lat = lat
        this.lng = lng
        $("#save-location-button").prop("disabled", false)

    # center the map and place the marker at that spot
    BigMap.prototype.place = () ->
        that = this
        if this.marker
            this.map.removeLayer(this.marker)
        this.map.setView([this.lat, this.lng])
        moptions = {}
        if this.options.admin==1
            moptions = { draggable: true }
        this.marker = L.marker([this.lat, this.lng], moptions).addTo(this.map)

        marker_dragged = (e) ->
            result = that.marker.getLatLng()
            that.lat = result.lat
            that.lng = result.lng
            $("#tmp_lat").val(result.lat)
            $("#tmp_lng").val(result.lng)
        this.marker.on("dragend", marker_dragged)


    # perform a random move of the map
    BigMap.prototype.random = () ->
        x = (Math.random()-0.5)/100
        y = (Math.random()-0.5)/100
        c = this.map.getCenter()
        c.lat = c.lat+x
        c.lng = c.lng+y
        this.map.panTo(c)
        that = this
        if this.wobble
            setTimeout( 
                () -> 
                    that.random()
                , 300)

    BigMap.prototype.lookup = (street, zip, city, country, callback) ->
        $("#location-loader").show()
        $("#action-overlay").hide()
        $(".spinner-overlay").show()
        $("#location-error-box").hide()
        $(".loader").show()
        this.wobble = true
        this.random()

        bm = this
        $.ajax(
            url: this.options.locationurl
            type: "GET"
            data: $.param
                city: city
                zip: zip
                street: street
                country: country
            success: (data) ->
                $(".loader").hide() # hide spinner
                bm.wobble = false # no map movement
                if not data.success
                    $("#location-error-box").show()
                    $("#location-error").text(data.msg).show()
                    return
                $(".action-overlay").show()
                $("#location-error").hide()
                $(".spinner-overlay").hide()
                $("#save-location-button").prop("disabled", false)
                bm.lat = data.lat
                bm.lng = data.lng
                bm.orig_lat = data.lat
                bm.orig_lng = data.lng
                bm.place()
                if callback
                    callback(data)
            error: (data) ->
                $("#location-error-box").show()
                $("#location-error").text("an unknown error occurred, please try again").show();
                $("#location-error").show()
                $(".action-overlay").hide()
                $(".loader").hide() # hide spinner
                bm.wobble = false
        )

    Plugin = (option) ->
        func_arguments = arguments
        return this.each () ->
            $this = $(this)
            data = $this.data('bc.bigmap')
            options = $.extend({}, BigMap.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if !data
                bm = new BigMap(this, options)
                $this.data('bc.bigmap', bm)
            if typeof option == 'string'
                func_arguments = $.map func_arguments, (value, index) ->
                    return [value]
                return data[option].apply(data, func_arguments.slice(1))



    old = $.fn.bigmap

    $.fn.bigmap             = Plugin
    $.fn.bigmap.Constructor = BigMap

    # no conflict
    $.fn.modal.noConflict = () ->
        $.fn.bigmap = old
        this


bm(jQuery)

$ ->

    console.log("ok")

    $(".delete-tc").click (e) ->
        e.preventDefault()
        msg = $('body').data("i18n-areyousure")
        if confirm(msg)
            url = $(this).data("url")

            $.ajax(
                url: url
                type: "POST"
                data:
                    method: "delete"
                success: () ->
                    window.location.reload()
                )
        return false


    $(".colorpicker-container").colorpicker();

    $(".urlscheme").limitchars()
    
    # generic confirm button
    $(".action-confirm").click( () ->
        confirm_msg = $(this).data("confirm")
        if confirm(confirm_msg) 
            return true
        return false
    )

    $('body').on("click.editable", '[data-toggle="editable"]', (e) ->
        $(e.target).editable()
    )

    # datepicker widget
    $(".datetime-widget .time").timepicker
        timeFormat: "G:i"
        show24: true

    $('.datetime-widget .date').datepicker
        format: 'd.m.yyyy'
        autoclose: true
        language: $("body").data("lang")
    
    # blog admin stuff
    $('.datetime-widget').publish_date()

    $(".view-edit-group").view_edit_group()

    $('.change-state').click () ->
        url = $(this).data("url")
        state = $(this).data("state")
        $.ajax(
            url: @url
            type: 'POST'
            data: 
                state: state
                field: field
            success: (data) =>
                @payload = $(@elem).html()
                $(@elem).html(data.html)
                @escape()
        )

    tinyMCE.baseURL = "/static/js/tinymce/"
    tinymce.init
        selector:'.wysiwyg'
        menubar: false
        convert_urls:true
        relative_urls:false
        remove_script_host:false
        plugins: ['image', 'link', 'code']
        toolbar: "undo redo | formatselect | bold italic | bullist numlist | blockquote | removeformat | image link | code"
        content_css : "/static/css/tinymce.css"


    #
    # map editor related
    # 

    $("#bigmap").bigmap()
 
    $("#show-on-map").click () ->
        street = $('#location_street').val()
        zip = $('#location_zip').val()
        city = $('#location_city').val()
        country = $('#location_country').val()

        # pre-check if some address was actually entered
        if street == ""
            $('#error-street').popover("show")
            return
        if city == ""
            $('#error-city').popover("show")
            return

        $("#location-picker").modal("show")

        if $("#location_lat").val()
            # set marker to stored position
            lat = $("#location_lat").val()
            lng = $("#location_lng").val()
            $("#bigmap").bigmap("set_coords", lat, lng)
            $("#bigmap").bigmap("place")
        else
            $("#bigmap").bigmap("lookup", street, zip, city, country)
        return false

    $("#lookup-button").click () ->
        street = $('#location_street').val()
        zip = $('#location_zip').val()
        city = $('#location_city').val()
        country = $('#location_country').val()
        $("#location-picker").modal("show")

        $("#bigmap").bigmap("lookup", street, zip, city, country)
        return false


    $("#location-error-confirm").click () ->
        $("#location-error-box").hide()
        $("#location-picker").modal("hide")
    

    $("#save-location-button").click () ->
        $("#location_lat").val($("#tmp_lat").val())
        $("#location_lng").val($("#tmp_lng").val())
        $("#own_coords").val("yes")
        $("#location-picker").modal("hide")

    $('.datepicker').datepicker
        format: 'd.m.yyyy'
        autoclose: true
        language: $("body").data("lang")


    # special validator for barcamp screen
    if $(".parsley-validate").length
        $(".parsley-validate").parsley(
            excluded: "input[type=file]"
            errorsWrapper: "<span class='errors-block help-block'></span>"
            errorsContainer: (el) ->
                console.log(el);
                el.$element.closest("div")
        )
        .addAsyncValidator('bcslug', (xhr) ->
            if xhr.responseJSON
                return xhr.responseJSON.validated
            return false
        , CONFIG.slug_validation_url
        )
        .addAsyncValidator('pageslug', (xhr) ->
            if xhr.responseJSON
                return xhr.responseJSON.validated
            return false
        , CONFIG.page_slug_validation_url
        )


    # automatic slug creation
    $("#bcform #slug").slugify("#name", {
            separator: ''
            whitespace: ''
    })
    $("#pageform #slug").slugify("#title", {
            separator: ''
            whitespace: '-'
    })

    # generic delbutton handler (see macros.html)
    # you need to have a listing container around so that it works
    # with dynamically added elements
    $(".listing").on "click", ".confirmdelete", () ->
        d = $(this).data("entry")
        url = $(this).data("url")
        $.ajax(
            url: url
            type: "POST"
            data:
                method: "delete"
                entry: d
            success: (data) ->
                if data.reload
                    window.location.reload()
                else if data.url
                    window.location = url
                # if we get an id back we have to delete this block
                else if data.id
                    $("#"+data.id).css({'background-color' : '#eaa'})
                    $("#"+data.id).slideUp()
            )

        return false


