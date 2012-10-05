
$(document).ready(function() {
  return $(".form-validate").validate({
    showErrors: function(errorMap, errorList) {
      $.each(this.successList, function(index, value) {
        $(value).removeClass("error");
        return $(value).popover('hide');
      });
      return $.each(errorList, function(index, value) {
        var _popover;
        _popover = $(value.element).popover({
          trigger: 'manual',
          placement: 'right',
          content: value.message,
          template: '<div class="popover error"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
        });
        _popover.data('popover').options.content = value.message;
        $(value.element).addClass("error");
        return $(value.element).popover('show');
      });
    }
  });
});
