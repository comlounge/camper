var Editable;

Editable = (function() {

  function Editable(elem, options) {
    this.elem = elem;
    this.options = options;
    this.state = "view";
    this.url = $(this.elem).closest("form").attr("action");
    return this;
  }

  Editable.prototype.clicked = function() {
    this.state = this.state === 'view' ? 'edit' : 'view';
    if (this.state === "edit") return this.show_edit_field();
  };

  Editable.prototype.show_edit_field = function() {
    var field,
      _this = this;
    field = $(this.elem).data('field');
    return $.ajax({
      url: this.url,
      type: 'GET',
      data: {
        field: field
      },
      success: function(data) {
        _this.payload = $(_this.elem).html();
        $(_this.elem).html(data.html);
        return _this.escape();
      }
    });
  };

  Editable.prototype.close_edit_field = function() {
    this.state = "view";
    $(this.elem).html(this.payload);
    return this.escape();
  };

  Editable.prototype.escape = function() {
    var _this = this;
    if (this.state === "view") {
      return $(document).off('keyup.editable.keys');
    } else {
      $(document).on('keyup.editable.keys', function(e) {
        e.which === 27 && _this.close_edit_field();
        e.which === 13 && console.log("enter");
        console.log("nö");
        return e.preventDefault();
      });
      return $(this.elem).closest("form").submit(function(e) {
        console.log("okiiuij");
        e.preventDefault();
        return false;
      });
    }
  };

  return Editable;

})();

$.fn.editable = function(opts) {
  var init;
  if (opts == null) opts = {};
  init = function(opts) {
    var $this, data, options;
    $this = $(this);
    data = $(this).data('editable');
    options = typeof opts === 'object' && opts;
    if (!data) {
      data = new Editable(this, options);
      $this.data('editable', data);
    }
    return data.clicked();
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  $(".form-validate").validate({
    showErrors: function(errorMap, errorList) {
      var form, position;
      $.each(this.successList, function(index, value) {
        $(value).removeClass("error");
        return $(value).popover('hide');
      });
      form = this.currentForm;
      position = $(form).data("errorposition") || 'right';
      return $.each(errorList, function(index, value) {
        var _popover;
        _popover = $(value.element).popover({
          trigger: 'manual',
          placement: position,
          content: value.message,
          template: '<div class="popover error"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
        });
        _popover.data('popover').options.content = value.message;
        $(value.element).addClass("error");
        return $(value.element).popover('show');
      });
    }
  });
  $("#sponsor-form").validate({
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
  return $('body').on("click.editable", '[data-toggle="editable"]', function(e) {
    return $(e.target).editable();
  });
});
