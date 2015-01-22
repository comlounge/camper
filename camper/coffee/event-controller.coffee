
$(document).ready () ->

    $("#show-add-form").click () ->
        $("#add-form-view").show()
        $("#show-add-form").hide()

    $("#cancel-add-form").click () ->
        $("#add-form-view").hide()
        $("#show-add-form").show()
        #$("#add-form").reset()
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


            
