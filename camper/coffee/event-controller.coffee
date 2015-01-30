
# the map app for the map editor (should work for both event and barcamp)
# doing it similar like bootstrap modal etc. 

bm = ($) ->
    BigMap = (element, options) ->
        this.options = options
        this.$body          = $(document.body)
        this.$element       = $(element)
        this.map            = null
        this.marker         = null

        L.Icon.Default.imagePath = '/static/img'

        options =
            accessToken: this.options.accesstoken
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
                $("#location-error").hide()
                $(".action-overlay").show()
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




$(document).ready () ->


    $("#show-add-form").click () ->
        $("#add-form-view").show()
        $("#show-add-form").hide()

    $("#cancel-add-form").click () ->
        $("#add-form-view").hide()
        $("#show-add-form").show()
        false

    $("#start_time").timepicker
        timeFormat: "G:i"
    $("#end_time").timepicker
        timeFormat: "G:i"

    $('#date').datepicker
        format: 'd.m.yyyy'
        autoclose: true
        language: $("body").data("lang")

    $("#own_location").change () ->
        if (this.checked)
            $("#location-view").show()
        else
            $("#location-view").hide()

    $(".delete-event").click () ->
        d = $(this).data("event")
        url = $(this).data("url")

        $.ajax(
            url: url
            type: "POST"
            data:
                method: "delete"
                event: d
            success: () ->
                window.location.reload()
            )

        return false

    if $('#own_location').is(":checked")
        $("#location-view").show()

    $("#bigmap").bigmap()

    $("#lookup-button").click () ->
        street = $('#location_street').val()
        zip = $('#location_zip').val()
        city = $('#location_city').val()
        $("#location-picker").modal("show")

        $("#bigmap").bigmap("lookup", street, zip, city, "de")
        return false

    # show the map        
    $("#show-on-map").click () ->
        street = $('#location_street').val()
        zip = $('#location_zip').val()
        city = $('#location_city').val()
        $("#location-picker").modal("show")

        if $("#location_lat").val()
            # set marker to stored position
            lat = $("#location_lat").val()
            lng = $("#location_lng").val()
            $("#bigmap").bigmap("set_coords", lat, lng)
            $("#bigmap").bigmap("place")
        else
            $("#bigmap").bigmap("lookup", street, zip, city, "de")
        return false

    $("#location-error-confirm").click () ->
        $("#location-error-box").hide()
        $("#location-picker").modal("hide")
    

    $("#save-location-button").click () ->
        $("#location_lat").val($("#tmp_lat").val())
        $("#location_lng").val($("#tmp_lng").val())
        $("#own_coords").val("yes")
        $("#location-picker").modal("hide")
