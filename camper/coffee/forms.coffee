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
        console.log date
        now = new Date()
        console.log now

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
        console.log "init"
        widget = this

        $(widget).find(".input-switch").click () ->
            console.log "ok"
            $(widget).find(".input-controls").show()
            $(widget).find(".input-view").hide()
        $(widget).find(".cancel-switch").click () ->
            $(widget).find(".input-controls").hide()
            $(widget).find(".input-view").show()
        $(widget).find(".submit").click () ->
            console.log "clicked"
            url = $(widget).data("url")
            data = $(widget).find("form").serializeObject()
            $.ajax
                url: url
                type: 'POST'
                data: data
                success: (data) =>
                    console.log "success"
                    console.log data
                    $('.workflow-'+data.new_state).attr('selected', 'selected')
                    $('.workflow-state').text(data.new_text_state)
                    $(widget).find(".input-controls").hide()
                    $(widget).find(".input-view").show()
                    if data.new_state=="published"
                        $("#publish-button").hide()
                    else
                        $("#publish-button").show()
            console.log $(widget).find(".input").val()

    $(this).each(init)
    this



$(document).ready( () ->
    $(".urlscheme").limitchars()
    $(".form-validate").validate(
        noshowErrors: (errorMap, errorList) ->
            console.log "error"
            $.each( this.successList , (index, value) ->
                $(value).removeClass("has-error")
                $(value).popover('hide')
            )
            form = this.currentForm
            position = $(form).data("errorposition") or 'right'
            $.each( errorList , (index, value) ->
                _popover = $(value.element).popover(
                        trigger: 'manual'
                        placement: position
                        content: value.message
                        template: '<div class="popover error"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
                )

                _popover.data('popover').options.content = value.message
                $(value.element).addClass("has-error")
                $(value.element).popover('show')
            )
    )
    $("#sponsor-form").validate(
        rules: {
          "upload-value-id": {
            required: true
          },
        },

        submitHandler: (form) ->
            if $(form).find("#image").val()
                form.submit()
            else
                alert("Bitte lade ein Logo hoch")
    
        highlight: (label) ->
            $(label).closest('.form-group').addClass('has-error')
        success: (label) ->
            label
                .text('')
                .closest('.form-group').removeClass("has-error").addClass('has-success')
    )

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

    tinyMCE.baseURL = "/static/js/components/tinymce/"
    tinymce.init
        selector:'.wysiwyg'
        menubar: false
        toolbar: "undo redo | formatselect | bold italic | bullist | numlist | blockquote | removeformat"
        content_css : "/static/css/tinymce.css"

    # show the map        
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
            $('#error-street').popover("show")
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

    $("#location-error-confirm").click () ->
        $("#location-error-box").hide()
        $("#location-picker").modal("hide")
    

    $("#save-location-button").click () ->
        $("#location_lat").val($("#tmp_lat").val())
        $("#location_lng").val($("#tmp_lng").val())
        $("#own_coords").val("yes")
        $("#location-picker").modal("hide")

)


