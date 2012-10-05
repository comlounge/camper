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
)
