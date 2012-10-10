$(document).ready( () ->
    $(".form-validate").validate(
        showErrors: (errorMap, errorList) ->
            $.each( this.successList , (index, value) ->
                $(value).removeClass("error")
                $(value).popover('hide')
            )
            $.each( errorList , (index, value) ->
                _popover = $(value.element).popover(
                        trigger: 'manual'
                        placement: 'right'
                        content: value.message
                        template: '<div class="popover error"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
                )

                _popover.data('popover').options.content = value.message
                $(value.element).addClass("error")
                $(value.element).popover('show')
            );
    )
    $("#sponsor-form").validate(
        rules: {
          "upload-value-id": {
            required: true
          },
        },

        submitHandler: (form) ->
            if $(form).find(".upload-value-id").val()
                form.submit()
            else
                alert("Bitte lade ein Logo hoch")
    
        highlight: (label) ->
            $(label).closest('.control-group').addClass('error')
        success: (label) ->
            label
                .text('OK!').addClass('valid')
                .closest('.control-group').addClass('success')
    )
)
