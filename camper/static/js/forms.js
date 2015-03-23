var Editable;

$.fn.serializeObject = function() {
  var a, o;
  o = {};
  a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== void 0) {
      if (!o[this.name].push) o[this.name] = [o[this.name]];
      return o[this.name].push(this.value || '');
    } else {
      return o[this.name] = this.value || '';
    }
  });
  return o;
};

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
        return e.preventDefault();
      });
      return $(this.elem).closest("form").submit(function(e) {
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

$.fn.limitchars = function(opts) {
  var init;
  if (opts == null) opts = {};
  init = function(opts) {
    var $this, allowed;
    $this = $(this);
    allowed = '1234567890abcdefghijklmnopqrstuvwxyz-_';
    return $(this).keypress(function(e) {
      var k;
      k = parseInt(e.which);
      if (k !== 13 && k !== 8 && k !== 0) {
        if ((e.ctrlKey === false) && (e.altKey === false)) {
          return allowed.indexOf(String.fromCharCode(k)) !== -1;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });
  };
  $(this).each(init);
  return this;
};

$.fn.publish_date = function(opts) {
  var hide_inputs, init, set_now, show_inputs, widget;
  if (opts == null) opts = {};
  widget = null;
  init = function(opts) {
    var date, now;
    widget = this;
    date = $(widget).find(".date").datepicker("getDate");
    date = $(widget).find(".time").timepicker("getTime", [date]);
    console.log(date);
    now = new Date();
    console.log(now);
    if (now <= date) {
      show_inputs();
    } else {
      hide_inputs();
    }
    $(widget).find(".edit-published").click(function() {
      return show_inputs();
    });
    return $(widget).find(".set-now").click(function() {
      set_now();
      return hide_inputs();
    });
  };
  set_now = function() {
    var now;
    now = new Date();
    $(widget).find(".date").datepicker("setDate", [now]);
    return $(widget).find(".time").timepicker("setTime", now);
  };
  show_inputs = function() {
    $(widget).find(".immediate-button").hide();
    $(widget).find(".date-edit").show();
    return $(widget).find(".immediate").val("False");
  };
  hide_inputs = function() {
    $(widget).find(".date-edit").hide();
    $(widget).find(".immediate-button").show();
    return $(widget).find(".immediate").val("True");
  };
  $(this).each(init);
  return this;
};

$.fn.view_edit_group = function(opts) {
  var init, widget;
  if (opts == null) opts = {};
  widget = null;
  init = function(opts) {
    console.log("init");
    widget = this;
    $(widget).find(".input-switch").click(function() {
      console.log("ok");
      $(widget).find(".input-controls").show();
      return $(widget).find(".input-view").hide();
    });
    $(widget).find(".cancel-switch").click(function() {
      $(widget).find(".input-controls").hide();
      return $(widget).find(".input-view").show();
    });
    return $(widget).find(".submit").click(function() {
      var data, url,
        _this = this;
      console.log("clicked");
      url = $(widget).data("url");
      data = $(widget).find("form").serializeObject();
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data) {
          console.log("success");
          console.log(data);
          $('.workflow-' + data.new_state).attr('selected', 'selected');
          $('.workflow-state').text(data.new_text_state);
          $(widget).find(".input-controls").hide();
          $(widget).find(".input-view").show();
          if (data.new_state === "published") {
            return $("#publish-button").hide();
          } else {
            return $("#publish-button").show();
          }
        }
      });
      return console.log($(widget).find(".input").val());
    });
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  $(".urlscheme").limitchars();
  $(".form-validate").validate({
    noshowErrors: function(errorMap, errorList) {
      var form, position;
      console.log("error");
      $.each(this.successList, function(index, value) {
        $(value).removeClass("has-error");
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
        $(value.element).addClass("has-error");
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
      if ($(form).find("#image").val()) {
        return form.submit();
      } else {
        return alert("Bitte lade ein Logo hoch");
      }
    },
    highlight: function(label) {
      return $(label).closest('.form-group').addClass('has-error');
    },
    success: function(label) {
      return label.text('').closest('.form-group').removeClass("has-error").addClass('has-success');
    }
  });
  $(".action-confirm").click(function() {
    var confirm_msg;
    confirm_msg = $(this).data("confirm");
    if (confirm(confirm_msg)) return true;
    return false;
  });
  $('body').on("click.editable", '[data-toggle="editable"]', function(e) {
    return $(e.target).editable();
  });
  $(".datetime-widget .time").timepicker({
    timeFormat: "G:i",
    show24: true
  });
  $('.datetime-widget .date').datepicker({
    format: 'd.m.yyyy',
    autoclose: true,
    language: $("body").data("lang")
  });
  $('.datetime-widget').publish_date();
  $(".view-edit-group").view_edit_group();
  $('.change-state').click(function() {
    var state, url,
      _this = this;
    url = $(this).data("url");
    state = $(this).data("state");
    return $.ajax({
      url: this.url,
      type: 'POST',
      data: {
        state: state,
        field: field
      },
      success: function(data) {
        _this.payload = $(_this.elem).html();
        $(_this.elem).html(data.html);
        return _this.escape();
      }
    });
  });
  tinyMCE.baseURL = "/static/js/components/tinymce/";
  return tinymce.init({
    selector: '.wysiwyg',
    menubar: false,
    toolbar: "undo redo | formatselect | bold italic | bullist | numlist | blockquote | removeformat",
    content_css: "/static/css/tinymce.css"
  });
});
