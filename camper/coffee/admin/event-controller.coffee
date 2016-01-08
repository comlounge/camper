


$(document).ready () ->


    $("#show-add-form").click () ->
        $("#add-form-view").show()
        $("#show-add-form").hide()
        $('[data-toggle="tooltip"]').tooltip()


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

    $(".delete-event").click (e) ->
        e.preventDefault()
        msg = $('body').data("i18n-areyousure")
        if confirm(msg)
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
        country = $('#location_country').val()
        $("#location-picker").modal("show")

        $("#bigmap").bigmap("lookup", street, zip, city, country)
        return false

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
