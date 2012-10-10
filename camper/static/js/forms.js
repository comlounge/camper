
$(document).ready(function() {
  $(".form-validate").validate({
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
  return $("#sponsor-form").validate({
    rules: {
      "upload-value-id": {
        required: true
      }
    },
    submitHandler: function(form) {
      if ($(form).find(".upload-value-id").val()) {
        return form.submit();
      } else {
        return alert("Bitte lade ein Logo hoch");
      }
    },
    highlight: function(label) {
      return $(label).closest('.control-group').addClass('error');
    },
    success: function(label) {
      return label.text('OK!').addClass('valid').closest('.control-group').addClass('success');
    }
  });
});
