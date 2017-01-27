(function() {
  $(document).ready(function() {
    return $(".delete-entry").click(function() {
      var d, url;
      d = $(this).data("entry");
      url = $(this).data("url");
      $.ajax({
        url: url,
        type: "POST",
        data: {
          method: "delete",
          entry: d
        },
        success: function() {
          return window.location.reload();
        }
      });
      return false;
    });
  });

}).call(this);

(function() {
  $(document).ready(function() {
    $("#show-add-form").click(function() {
      $("#add-form-view").show();
      $("#show-add-form").hide();
      return $('[data-toggle="tooltip"]').tooltip();
    });
    $("#cancel-add-form").click(function() {
      $("#add-form-view").hide();
      $("#show-add-form").show();
      return false;
    });
    $("#start_time").timepicker({
      timeFormat: "G:i"
    });
    $("#end_time").timepicker({
      timeFormat: "G:i"
    });
    $('#date').datepicker({
      format: 'd.m.yyyy',
      autoclose: true,
      language: $("body").data("lang")
    });
    $("#own_location").change(function() {
      if (this.checked) {
        return $("#location-view").show();
      } else {
        return $("#location-view").hide();
      }
    });
    $(".delete-event").click(function(e) {
      var d, msg, url;
      e.preventDefault();
      msg = $('body').data("i18n-areyousure");
      if (confirm(msg)) {
        d = $(this).data("event");
        url = $(this).data("url");
        $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete",
            event: d
          },
          success: function() {
            return window.location.reload();
          }
        });
      }
      return false;
    });
    if ($('#own_location').is(":checked")) {
      $("#location-view").show();
    }
    $("#bigmap").bigmap();
    $("#lookup-button").click(function() {
      var city, country, street, zip;
      street = $('#location_street').val();
      zip = $('#location_zip').val();
      city = $('#location_city').val();
      country = $('#location_country').val();
      $("#location-picker").modal("show");
      $("#bigmap").bigmap("lookup", street, zip, city, country);
      return false;
    });
    $("#show-on-map").click(function() {
      var city, country, lat, lng, street, zip;
      street = $('#location_street').val();
      zip = $('#location_zip').val();
      city = $('#location_city').val();
      country = $('#location_country').val();
      if (street === "") {
        $('#error-street').popover("show");
        return;
      }
      if (city === "") {
        $('#error-street').popover("show");
        return;
      }
      $("#location-picker").modal("show");
      if ($("#location_lat").val()) {
        lat = $("#location_lat").val();
        lng = $("#location_lng").val();
        $("#bigmap").bigmap("set_coords", lat, lng);
        $("#bigmap").bigmap("place");
      } else {
        $("#bigmap").bigmap("lookup", street, zip, city, country);
      }
      return false;
    });
    $("#location-error-confirm").click(function() {
      $("#location-error-box").hide();
      return $("#location-picker").modal("hide");
    });
    return $("#save-location-button").click(function() {
      $("#location_lat").val($("#tmp_lat").val());
      $("#location_lng").val($("#tmp_lng").val());
      $("#own_coords").val("yes");
      return $("#location-picker").modal("hide");
    });
  });

}).call(this);

(function() {
  var Editable, bm;

  $.fn.serializeObject = function() {
    var a, o;
    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== void 0) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
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
      if (this.state === "edit") {
        return this.show_edit_field();
      }
    };

    Editable.prototype.show_edit_field = function() {
      var field;
      field = $(this.elem).data('field');
      return $.ajax({
        url: this.url,
        type: 'GET',
        data: {
          field: field
        },
        success: (function(_this) {
          return function(data) {
            _this.payload = $(_this.elem).html();
            $(_this.elem).html(data.html);
            return _this.escape();
          };
        })(this)
      });
    };

    Editable.prototype.close_edit_field = function() {
      this.state = "view";
      $(this.elem).html(this.payload);
      return this.escape();
    };

    Editable.prototype.escape = function() {
      if (this.state === "view") {
        return $(document).off('keyup.editable.keys');
      } else {
        $(document).on('keyup.editable.keys', (function(_this) {
          return function(e) {
            e.which === 27 && _this.close_edit_field();
            e.which === 13 && console.log("enter");
            return e.preventDefault();
          };
        })(this));
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
    if (opts == null) {
      opts = {};
    }
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
    if (opts == null) {
      opts = {};
    }
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
    if (opts == null) {
      opts = {};
    }
    widget = null;
    init = function(opts) {
      var date, now;
      widget = this;
      date = $(widget).find(".date").datepicker("getDate");
      date = $(widget).find(".time").timepicker("getTime", [date]);
      now = new Date();
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
    if (opts == null) {
      opts = {};
    }
    widget = null;
    init = function(opts) {
      widget = this;
      $(widget).find(".input-switch").click(function() {
        $(widget).find(".input-controls").show();
        return $(widget).find(".input-view").hide();
      });
      $(widget).find(".cancel-switch").click(function() {
        $(widget).find(".input-controls").hide();
        return $(widget).find(".input-view").show();
      });
      return $(widget).find(".submit").click(function() {
        var data, url;
        url = $(widget).data("url");
        data = $(widget).find("form").serializeObject();
        return $.ajax({
          url: url,
          type: 'POST',
          data: data,
          success: (function(_this) {
            return function(data) {
              $('.workflow-' + data.new_state).attr('selected', 'selected');
              $('.workflow-state').text(data.new_text_state);
              $(widget).find(".input-controls").hide();
              $(widget).find(".input-view").show();
              if (data.new_state === "published") {
                return $("#publish-button").hide();
              } else {
                return $("#publish-button").show();
              }
            };
          })(this)
        });
      });
    };
    $(this).each(init);
    return this;
  };

  bm = function($) {
    var BigMap, Plugin, old;
    BigMap = function(element, options) {
      var map;
      this.options = options;
      this.$body = $(document.body);
      this.$element = $(element);
      this.map = null;
      this.marker = null;
      L.Icon.Default.imagePath = '/static/img';
      L.mapbox.accessToken = this.options.accesstoken;
      console.log("init");
      options = {
        zoom: 14
      };
      this.map = L.mapbox.map(this.$element.attr('id'), this.options.mapid, options);
      this.lat = null;
      this.lng = null;
      map = this.map;
      $('#location-picker').on('shown.bs.modal', function() {
        $(".action-overlay").show();
        $("#location-error").hide();
        $(".spinner-overlay").hide();
        map.invalidateSize();
        return $("#save-location-button").prop("disabled", true);
      });
      return this;
    };
    BigMap.DEFAULTS = {
      location_url: "",
      lat: null,
      lng: null,
      accesstoken: "",
      admin: 0,
      mapid: "",
      locationurl: "",
      orig_lat: null,
      orig_lng: null,
      wobble: false
    };
    BigMap.prototype.set_coords = function(lat, lng) {
      this.lat = lat;
      this.lng = lng;
      return $("#save-location-button").prop("disabled", false);
    };
    BigMap.prototype.place = function() {
      var marker_dragged, moptions, that;
      that = this;
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.map.setView([this.lat, this.lng]);
      moptions = {};
      if (this.options.admin === 1) {
        moptions = {
          draggable: true
        };
      }
      this.marker = L.marker([this.lat, this.lng], moptions).addTo(this.map);
      marker_dragged = function(e) {
        var result;
        result = that.marker.getLatLng();
        that.lat = result.lat;
        that.lng = result.lng;
        $("#tmp_lat").val(result.lat);
        return $("#tmp_lng").val(result.lng);
      };
      return this.marker.on("dragend", marker_dragged);
    };
    BigMap.prototype.random = function() {
      var c, that, x, y;
      x = (Math.random() - 0.5) / 100;
      y = (Math.random() - 0.5) / 100;
      c = this.map.getCenter();
      c.lat = c.lat + x;
      c.lng = c.lng + y;
      this.map.panTo(c);
      that = this;
      if (this.wobble) {
        return setTimeout(function() {
          return that.random();
        }, 300);
      }
    };
    BigMap.prototype.lookup = function(street, zip, city, country, callback) {
      $("#location-loader").show();
      $("#action-overlay").hide();
      $(".spinner-overlay").show();
      $("#location-error-box").hide();
      $(".loader").show();
      this.wobble = true;
      this.random();
      bm = this;
      return $.ajax({
        url: this.options.locationurl,
        type: "GET",
        data: $.param({
          city: city,
          zip: zip,
          street: street,
          country: country
        }),
        success: function(data) {
          $(".loader").hide();
          bm.wobble = false;
          if (!data.success) {
            $("#location-error-box").show();
            $("#location-error").text(data.msg).show();
            return;
          }
          $(".action-overlay").show();
          $("#location-error").hide();
          $(".spinner-overlay").hide();
          $("#save-location-button").prop("disabled", false);
          bm.lat = data.lat;
          bm.lng = data.lng;
          bm.orig_lat = data.lat;
          bm.orig_lng = data.lng;
          bm.place();
          if (callback) {
            return callback(data);
          }
        },
        error: function(data) {
          $("#location-error-box").show();
          $("#location-error").text("an unknown error occurred, please try again").show();
          $("#location-error").show();
          $(".action-overlay").hide();
          $(".loader").hide();
          return bm.wobble = false;
        }
      });
    };
    Plugin = function(option) {
      var func_arguments;
      func_arguments = arguments;
      return this.each(function() {
        var $this, data, options;
        $this = $(this);
        data = $this.data('bc.bigmap');
        options = $.extend({}, BigMap.DEFAULTS, $this.data(), typeof option === 'object' && option);
        if (!data) {
          bm = new BigMap(this, options);
          $this.data('bc.bigmap', bm);
        }
        if (typeof option === 'string') {
          func_arguments = $.map(func_arguments, function(value, index) {
            return [value];
          });
          return data[option].apply(data, func_arguments.slice(1));
        }
      });
    };
    old = $.fn.bigmap;
    $.fn.bigmap = Plugin;
    $.fn.bigmap.Constructor = BigMap;
    return $.fn.modal.noConflict = function() {
      $.fn.bigmap = old;
      return this;
    };
  };

  bm(jQuery);

  $(function() {
    $(".delete-tc").click(function(e) {
      var msg, url;
      e.preventDefault();
      msg = $('body').data("i18n-areyousure");
      if (confirm(msg)) {
        url = $(this).data("url");
        $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete"
          },
          success: function() {
            return window.location.reload();
          }
        });
      }
      return false;
    });
    $(".colorpicker-container").colorpicker();
    $(".urlscheme").limitchars();
    $(".action-confirm").click(function() {
      var confirm_msg;
      confirm_msg = $(this).data("confirm");
      if (confirm(confirm_msg)) {
        return true;
      }
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
      var state, url;
      url = $(this).data("url");
      state = $(this).data("state");
      return $.ajax({
        url: this.url,
        type: 'POST',
        data: {
          state: state,
          field: field
        },
        success: (function(_this) {
          return function(data) {
            _this.payload = $(_this.elem).html();
            $(_this.elem).html(data.html);
            return _this.escape();
          };
        })(this)
      });
    });
    tinyMCE.baseURL = "/static/js/tinymce/";
    tinymce.init({
      selector: '.wysiwyg',
      menubar: false,
      plugins: ['image', 'link', 'code'],
      toolbar: "undo redo | formatselect | bold italic | bullist numlist | blockquote | removeformat | image link | code",
      content_css: "/static/css/tinymce.css"
    });
    $("#bigmap").bigmap();
    $("#show-on-map").click(function() {
      var city, country, lat, lng, street, zip;
      street = $('#location_street').val();
      zip = $('#location_zip').val();
      city = $('#location_city').val();
      country = $('#location_country').val();
      if (street === "") {
        $('#error-street').popover("show");
        return;
      }
      if (city === "") {
        $('#error-city').popover("show");
        return;
      }
      $("#location-picker").modal("show");
      if ($("#location_lat").val()) {
        lat = $("#location_lat").val();
        lng = $("#location_lng").val();
        $("#bigmap").bigmap("set_coords", lat, lng);
        $("#bigmap").bigmap("place");
      } else {
        $("#bigmap").bigmap("lookup", street, zip, city, country);
      }
      return false;
    });
    $("#lookup-button").click(function() {
      var city, country, street, zip;
      street = $('#location_street').val();
      zip = $('#location_zip').val();
      city = $('#location_city').val();
      country = $('#location_country').val();
      $("#location-picker").modal("show");
      $("#bigmap").bigmap("lookup", street, zip, city, country);
      return false;
    });
    $("#location-error-confirm").click(function() {
      $("#location-error-box").hide();
      return $("#location-picker").modal("hide");
    });
    $("#save-location-button").click(function() {
      $("#location_lat").val($("#tmp_lat").val());
      $("#location_lng").val($("#tmp_lng").val());
      $("#own_coords").val("yes");
      return $("#location-picker").modal("hide");
    });
    $('.datepicker').datepicker({
      format: 'd.m.yyyy',
      autoclose: true,
      language: $("body").data("lang")
    });
    if ($(".parsley-validate").length) {
      $(".parsley-validate").parsley({
        excluded: "input[type=file]",
        errorsWrapper: "<span class='errors-block help-block'></span>",
        errorsContainer: function(el) {
          console.log(el);
          return el.$element.closest("div");
        }
      }).addAsyncValidator('bcslug', function(xhr) {
        if (xhr.responseJSON) {
          return xhr.responseJSON.validated;
        }
        return false;
      }, CONFIG.slug_validation_url).addAsyncValidator('pageslug', function(xhr) {
        if (xhr.responseJSON) {
          return xhr.responseJSON.validated;
        }
        return false;
      }, CONFIG.page_slug_validation_url);
    }
    $("#bcform #slug").slugify("#name", {
      separator: '',
      whitespace: ''
    });
    $("#pageform #slug").slugify("#title", {
      separator: '',
      whitespace: '-'
    });
    return $(".listing").on("click", ".confirmdelete", function() {
      var d, url;
      d = $(this).data("entry");
      url = $(this).data("url");
      $.ajax({
        url: url,
        type: "POST",
        data: {
          method: "delete",
          entry: d
        },
        success: function(data) {
          if (data.reload) {
            return window.location.reload();
          } else if (data.url) {
            return window.location = url;
          } else if (data.id) {
            $("#" + data.id).css({
              'background-color': '#eaa'
            });
            return $("#" + data.id).slideUp();
          }
        }
      });
      return false;
    });
  });

}).call(this);

(function() {
  $(function() {
    $("#imagelisting").on("click", ".imagedetailblock .edittoggle", function() {
      var id;
      $(this).closest(".imagedetails").hide();
      id = $(this).data("image-id");
      return $("#imageform-" + id).show();
    });
    $("#imagelisting").on("click", ".imagedetailblock .canceltoggle", function() {
      var id;
      $(this).closest(".imagedetailform").hide();
      id = $(this).data("image-id");
      return $("#details-" + id).show();
    });
    $("#imagelisting").on("submit", ".imagedetailform", function() {
      var id, url;
      event.preventDefault();
      id = $(this).data("image-id");
      url = $(this).attr("action");
      return $.ajax({
        type: "post",
        url: url,
        data: $(this).serialize(),
        contentType: "application/x-www-form-urlencoded",
        success: function(data) {
          $("#block-" + id).replaceWith($(data.html));
          $("#imageform-" + id).hide();
          return $("#details-" + id).show();
        },
        error: function() {
          return alert("an error occurred, please try again later");
        }
      });
    });
    $(".listing").on("click", ".deletebtn", function() {
      var d, msg, url;
      d = $(this).data("image-id");
      url = $(this).data("url");
      msg = $("body").data("i18n-areyousure");
      if (confirm(msg)) {
        $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete",
            entry: d
          },
          success: function(data) {
            if (data.id) {
              $("#" + data.id).css({
                'background-color': '#eaa'
              });
              return $("#" + data.id).slideUp();
            }
          }
        });
      }
      return false;
    });
    $("#edittitle").click(function() {
      $("#titleform").show();
      $("#titleview").hide();
      return false;
    });
    $("#canceltitle").click(function() {
      $("#titleform").hide();
      $("#titleview").show();
      return false;
    });
    return $("#titleform").submit(function() {
      var url;
      event.preventDefault();
      url = $(this).attr("action");
      return $.ajax({
        type: "post",
        url: url,
        data: $(this).serialize(),
        contentType: "application/x-www-form-urlencoded",
        success: function(data) {
          $("#gallerytitle").val(data.title);
          $("#titleview span").text(data.title);
          $("#titleform").hide();
          return $("#titleview").show();
        },
        error: function() {
          return alert("an error occurred, please try again later");
        }
      });
    });
  });

}).call(this);

(function() {
  var LogoEditor,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  LogoEditor = (function() {
    LogoEditor.prototype.font_weight = 180;

    LogoEditor.prototype.font_family = "Open Sans";

    LogoEditor.prototype.icon_factor = 2.7;

    LogoEditor.prototype.icon_label_scale = 2;

    function LogoEditor() {
      this.update = __bind(this.update, this);
      this.init = __bind(this.init, this);
      this.canvas = $("#logocanvas")[0];
      this.final_canvas = $("#finalcanvas")[0];
      this.export_canvas = $("#exportcanvas")[0];
      this.tmp_text = $("#tmp_text");
      this.icon_svg = $("#icon-svg");
      this.icon_img = null;
      this.textinput1 = $('#logoinput1');
      this.textinput2 = $('#logoinput2');
      this.colorinput_logo = $('#colorinput_logo');
      this.colorinput1 = $('#colorinput1');
      this.colorinput2 = $('#colorinput2');
      if ($("#logo_color_logo").val()) {
        this.colorinput_logo.val($("#logo_color_logo").val());
      }
      if ($("#logo_color1").val()) {
        this.colorinput1.val($("#logo_color1").val());
      }
      if ($("#logo_color2").val()) {
        this.colorinput2.val($("#logo_color2").val());
      }
      if ($("#logo_text1").val()) {
        this.textinput1.val($("#logo_text1").val());
      }
      if ($("#logo_text2").val()) {
        this.textinput2.val($("#logo_text2").val());
      }
      this.text1 = this.textinput1.val();
      this.text2 = this.textinput2.val();
      this.color_logo = this.colorinput_logo.val();
      this.color1 = this.colorinput1.val();
      this.color2 = this.colorinput2.val();
    }

    LogoEditor.prototype.init = function() {
      this.init_ui();
      this.init_icon();
      return this.update();
    };

    LogoEditor.prototype.init_icon = function(callback) {};

    LogoEditor.prototype.init_ui = function() {
      $(".colorpicker-container-logo").colorpicker().on('changeColor', (function(_this) {
        return function(ev) {
          _this.color_logo = _this.colorinput_logo.val();
          _this.color1 = _this.colorinput1.val();
          _this.color2 = _this.colorinput2.val();
          return _this.update();
        };
      })(this));
      $('.logoinput').on('keyup', (function(_this) {
        return function(e) {
          _this.text1 = _this.textinput1.val();
          _this.text2 = _this.textinput2.val();
          return _this.update();
        };
      })(this));
      $('#save-as-logo-button').click((function(_this) {
        return function(e) {
          var save_logo;
          e.preventDefault();
          $("#logo_color_logo").val(_this.colorinput_logo.val());
          $("#logo_color1").val(_this.colorinput1.val());
          $("#logo_color2").val(_this.colorinput2.val());
          $("#logo_text1").val(_this.textinput1.val());
          $("#logo_text2").val(_this.textinput2.val());
          save_logo = function(canvas) {
            var base64, data, parts;
            data = canvas.toDataURL("image/png");
            parts = data.split(",");
            base64 = parts[parts.length - 1];
            $("#save-as-logo-button").hide();
            $("#saving-as-logo-button").show();
            return $.ajax({
              url: $("#logoeditor-modal").data("upload-url"),
              type: "POST",
              data: {
                data: base64,
                filename: "" + _this.text1 + _this.text2 + "logo.png"
              },
              success: function(data) {
                var widget;
                widget = $("#uploadwidget-logo");
                $("#logo").val(data.asset_id);
                widget.find(".uploader-buttons").show();
                widget.find(".preview-area img").attr("src", data.url);
                widget.find(".progress").hide();
                widget.find(".preview-area").show();
                $("#logoeditor-modal").modal("hide");
                $("#save-as-logo-button").show();
                return $("#saving-as-logo-button").hide();
              },
              error: function() {
                $("#save-as-logo-button").show();
                return $("#saving-as-logo-button").hide();
              }
            });
          };
          return _this.draw_logo(_this.final_canvas, 1.5, save_logo);
        };
      })(this));
      return $('#save-as-png-button').click((function(_this) {
        return function(e) {
          var callback;
          e.preventDefault();
          callback = function(canvas) {
            var a;
            a = document.createElement("a");
            a.download = "" + _this.text1 + _this.text2 + "logo.png";
            a.href = canvas.toDataURL("image/png");
            a.click();
          };
          _this.draw_logo(_this.export_canvas, 3.8, callback);
          return $("#logoeditor-modal").modal("hide");
        };
      })(this));
    };

    LogoEditor.prototype.update = function() {
      return this.draw_logo(this.canvas, 1.1);
    };

    LogoEditor.prototype.draw_logo = function(canvas, screen_factor, callback) {
      var ctx, icon_width, offsets, scale, text_width1;
      if (screen_factor == null) {
        screen_factor = 1;
      }
      if (callback == null) {
        callback = null;
      }
      ctx = canvas.getContext("2d");
      offsets = this.compute_scale(canvas, screen_factor);
      scale = offsets.scale;
      text_width1 = offsets.text_width1;
      icon_width = offsets.icon_width;
      console.log("drawing with scale " + offsets.scale);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw_text(canvas, scale, icon_width, icon_width + text_width1);
      return this.draw_icon(canvas, scale, callback);
    };

    LogoEditor.prototype.compute_scale = function(canvas, screen_factor) {
      var factor, font1, font2, full_width, icon_width, scale, text_width1, text_width2;
      font1 = "bold " + (this.font_weight * 0.7) + "px " + this.font_family;
      font2 = "normal " + (this.font_weight * 0.7) + "px " + this.font_family;
      text_width1 = $("#tmp_text").css('font', font1).text(this.text1).width();
      text_width2 = $("#tmp_text").css('font', font2).text(this.text2).width();
      icon_width = 90 * this.icon_factor;
      full_width = (icon_width + text_width1 + text_width2) * 1.1;
      factor = this.canvas.width / full_width;
      scale = Math.min(1, factor * 0.98);
      return {
        scale: scale * screen_factor,
        icon_width: icon_width * scale * screen_factor,
        text_width1: text_width1 * scale * screen_factor,
        text_width2: text_width2 * scale * screen_factor
      };
    };

    LogoEditor.prototype.draw_text = function(canvas, scale, offset1, offset2) {
      var ctx, font1, font2;
      ctx = canvas.getContext("2d");
      ctx.clearRect(offset1, 0, canvas.width - offset1, canvas.height);
      font1 = "bold " + (this.font_weight * scale * 0.7) + "px " + this.font_family;
      font2 = "normal " + (this.font_weight * scale * 0.7) + "px " + this.font_family;
      ctx.font = font1;
      ctx.fillStyle = this.color1;
      ctx.fillText(this.text1, offset1, canvas.height / 2 + scale * 40);
      ctx.fillStyle = this.color2;
      ctx.font = font2;
      return ctx.fillText(this.text2, offset2, canvas.height / 2 + scale * 40);
    };

    LogoEditor.prototype.draw_icon = function(canvas, scale, callback) {
      var container, ctx, img, svg_scale;
      if (callback == null) {
        callback = null;
      }
      ctx = canvas.getContext("2d");
      svg_scale = this.icon_factor * scale;
      container = this.icon_svg.find('g#container');
      container.attr('transform', "scale(" + svg_scale + ")");
      $(container.children()[0]).css('fill', this.color_logo);
      img = new Image(90 * this.icon_factor * scale, 90 * this.icon_factor * scale);
      img.src = "data:image/svg+xml;base64," + window.btoa($(this.icon_svg).prop('outerHTML'));
      return img.onload = (function(_this) {
        return function() {
          var y;
          y = (canvas.height / 2) - (scale * _this.icon_factor * 45);
          ctx.drawImage(img, 0, y);
          if (callback) {
            return callback(canvas);
          }
        };
      })(this);
    };

    LogoEditor.prototype.resize = function() {
      return this.draw_logo(this.canvas);
    };

    return LogoEditor;

  })();

  $(function() {
    var le;
    if ($("#logocanvas").length) {
      le = new LogoEditor();
      return le.init();
    }
  });

}).call(this);

(function() {
  var guid, init_i18n, s4,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Array.prototype.toDict = function(key) {
    return this.reduce((function(dict, obj) {
      if (obj[key] != null) {
        dict[obj[key]] = obj;
      }
      return dict;
    }), {});
  };

  s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  guid = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  $.fn.serializeObject = function() {
    var a, o;
    o = {};
    a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== void 0) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        return o[this.name].push(this.value || '');
      } else {
        return o[this.name] = this.value || '';
      }
    });
    return o;
  };

  init_i18n = function() {
    var locale;
    locale = $("body").data("lang");
    return $.ajax({
      url: "/static/js/camper-" + locale + ".json",
      type: "GET",
      dataType: "json",
      success: function(data) {
        var i18n, ntrans, trans;
        i18n = new Jed(data);
        trans = function(string, params) {
          return i18n.translate(string).fetch(params);
        };
        ntrans = function(string, plural_string, num, params) {
          return i18n.translate(string).ifPlural(num, plural_string).fetch(params);
        };
        Handlebars.registerHelper('trans', function(options) {
          var content;
          content = options.fn(this);
          return trans(content, options.hash);
        });
        Handlebars.registerHelper('_', function(string, options) {
          var content;
          content = string;
          return trans(content, options.hash);
        });
        Handlebars.registerHelper('ntrans', function(num, options) {
          var content, plural_content;
          content = options.fn(this);
          plural_content = options.inverse(this);
          return ntrans(content, plural_content, num, options.hash);
        });
        Handlebars.registerHelper('n_', function(num, string, plural_string, options) {
          return ntrans(string, plural_string, num, options.hash);
        });
        return $("#newsessions").sessionboard();
      },
      error: function() {
        return alert("Could not load translations, please try again later");
      }
    });
  };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "sessionboard";
    defaults = {
      foo: "bar"
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.del_session = __bind(this.del_session, this);
        this.update_session = __bind(this.update_session, this);
        this.add_session_modal = __bind(this.add_session_modal, this);
        this.del_timeslot = __bind(this.del_timeslot, this);
        this.add_timeslot = __bind(this.add_timeslot, this);
        this.add_timeslot_modal = __bind(this.add_timeslot_modal, this);
        this.edit_room = __bind(this.edit_room, this);
        this.edit_room_modal = __bind(this.edit_room_modal, this);
        this.del_room = __bind(this.del_room, this);
        this.add_room = __bind(this.add_room, this);
        this.add_room_modal = __bind(this.add_room_modal, this);
        this.delete_all_sessions = __bind(this.delete_all_sessions, this);
        this.data = {};
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      Plugin.prototype.init = function() {
        this.loadState();
        return $('#delete-all-sessions').click((function(_this) {
          return function() {
            return _this.delete_all_sessions();
          };
        })(this));
      };

      Plugin.prototype.update = function() {
        this.saveState();
        return this.render();
      };

      Plugin.prototype.loadState = function() {
        return $.ajax({
          url: "sessionboard/data",
          dataType: 'json',
          cache: false,
          success: (function(_this) {
            return function(data) {
              _this.data = data;
              return _this.render();
            };
          })(this),
          error: (function(_this) {
            return function(xhr, status, err) {
              return console.error("url", status, err.toString());
            };
          })(this)
        });
      };

      Plugin.prototype.saveState = function() {
        var data;
        data = {
          rooms: this.data.rooms,
          timeslots: this.data.timeslots,
          sessions: this.data.sessions
        };
        return $.ajax({
          url: "sessionboard/data",
          data: JSON.stringify(this.data),
          contentType: 'application/json',
          type: 'POST',
          success: (function(_this) {
            return function(data) {};
          })(this),
          error: (function(_this) {
            return function(data) {
              alert("an error occurred saving the data");
              return _this.loadState();
            };
          })(this)
        });
      };

      Plugin.prototype.get_session_id = function(slot, room) {

        /*
        generate a session if from slot and room
         */
        return room.id + "@" + slot.time;
      };

      Plugin.prototype.generate_sessiontable = function() {

        /*
        generates the session table for rendering.
        
        It basically is a list of lists for each column and row
         */
        var room, row, sid, slot, table, _i, _j, _len, _len1, _ref, _ref1;
        table = [];
        _ref = this.data.timeslots;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slot = _ref[_i];
          row = {
            time: slot.time,
            blocked: slot.blocked,
            block_reason: slot.reason,
            slots: []
          };
          _ref1 = this.data.rooms;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            room = _ref1[_j];
            sid = this.get_session_id(slot, room);
            if (this.data.sessions[sid]) {
              row.slots.push(this.data.sessions[sid]);
            } else {
              row.slots.push({
                _id: sid
              });
            }
          }
          table.push(row);
        }
        return table;
      };

      Plugin.prototype.render = function() {
        var html;
        html = JST["sessiontest"]({
          data: this.data,
          sessions: this.generate_sessiontable(),
          colwidth: 90 / (this.data.rooms.length + 1)
        });
        $("#newsessions").html(html);
        return this.init_handlers();
      };

      Plugin.prototype.delete_all_sessions = function() {
        this.data.sessions = {};
        return this.update();
      };

      Plugin.prototype.add_room_modal = function() {
        var html;
        html = JST["room-modal"]({
          add_room: true
        });
        $("#modals").html(html);
        $('#add-room-modal').modal('show');
        $('#room-form-name').focus();
        $("#add-room-form").submit(this.add_room);
        return false;
      };

      Plugin.prototype.add_room = function(event) {
        var room;
        event.preventDefault();
        room = $("#add-room-form").serializeObject();
        room.id = guid();
        this.data.rooms.push(room);
        this.update();
        $('#add-room-modal').modal('hide');
        return false;
      };

      Plugin.prototype.del_room = function(event) {

        /*
        delete a room after asking for confirmation
         */
        var idx;
        if (confirm($('body').data("i18n-areyousure"))) {
          idx = $(event.currentTarget).data("index");
          this.data.rooms.splice(idx, 1);
          return this.update();
        }
      };

      Plugin.prototype.edit_room_modal = function(event) {
        var html, idx, room;
        idx = $(event.currentTarget).data("index");
        room = this.data.rooms[idx];
        html = JST["room-modal"]({
          room: room,
          room_idx: idx,
          add_room: false
        });
        $("#modals").html(html);
        $('#add-room-modal').modal('show');
        $('#room-form-name').focus();
        $("#add-room-form").submit(this.edit_room);
        return false;
      };

      Plugin.prototype.edit_room = function(event) {
        var room, room_idx;
        event.preventDefault();
        room = $("#add-room-form").serializeObject();
        room_idx = room['room_idx'];
        if (!room_idx) {
          console.error("room index was missing");
          return alert("Error");
        }
        room = JSON.parse(JSON.stringify(room));
        if (room.room_idx) {
          delete room.room_idx;
        }
        this.data.rooms[room_idx] = room;
        this.update();
        $('#add-room-modal').modal('hide');
        return false;
      };

      Plugin.prototype.set_next_time = function() {

        /*
        computes the next possible time for the timeslot modal
         */
        var hour, l, last_time, parts;
        l = this.data.timeslots.length;
        if (l) {
          last_time = this.data.timeslots[l - 1].time;
          try {
            parts = last_time.split(":");
            hour = parseInt(parts[0]) + 1;
            return $("#timepicker").timepicker('setTime', hour + ':' + parts[1]);
          } catch (_error) {

          }
        } else {
          $("#timepicker").timepicker('option', 'minTime', '00:00');
          return $("#timepicker").timepicker('setTime', '09:00');
        }
      };

      Plugin.prototype.add_timeslot_modal = function(event) {

        /*
        show the timeslot modal and set the next available time
         */
        var html;
        html = JST["timeslot-modal"]();
        $("#modals").html(html);
        $("#timepicker").timepicker({
          timeFormat: "G:i",
          show24: true
        });
        this.set_next_time();
        $('#add-timeslot-modal').modal('show');
        $('#timepicker').focus();
        $('#add-timeslot-form').parsley();
        $("#add-timeslot-form").submit(this.add_timeslot);
        return false;
      };

      Plugin.prototype.add_timeslot = function(event) {

        /*
        add a new timeslot to the list of timeslots
         */
        var parts, timeslot;
        event.preventDefault();
        timeslot = $("#add-timeslot-form").serializeObject();
        parts = timeslot.time.split(":");
        if (parts[0].length === 1) {
          timeslot.time = "0" + timeslot.time;
        }
        this.data.timeslots.push(timeslot);
        this.data.timeslots = _.sortBy(this.data.timeslots, 'time');
        this.update();
        $('#add-timeslot-modal').modal('hide');
      };

      Plugin.prototype.del_timeslot = function(event) {

        /*
        delete a timeslot after asking for confirmation
         */
        var idx;
        if (confirm($('body').data("i18n-areyousure"))) {
          idx = $(event.currentTarget).data("index");
          this.data.timeslots.splice(idx, 1);
          return this.update();
        }
      };

      Plugin.prototype.add_session_modal = function(event) {
        var html, moderators, payload, proposals, sid;
        sid = $(event.currentTarget).closest(".sessionslot").data("id");
        payload = this.data.sessions[sid];
        if (!payload) {
          payload = {};
        }
        payload.session_idx = sid;
        html = JST["session-modal"](payload);
        $("#modals").html(html);
        moderators = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: this.data.participants.map(function(p) {
            return p.name;
          })
        });
        $("#moderator").tagsinput({
          tagClass: 'btn btn-info btn-xs',
          typeaheadjs: {
            source: moderators.ttAdapter()
          }
        });
        proposals = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: this.data.proposals
        });
        $('#ac-title').typeahead(null, {
          name: 'proposals',
          display: 'value',
          templates: {
            suggestion: Handlebars.compile('<div>{{label}}</div>')
          },
          source: proposals.ttAdapter()
        }).bind("typeahead:select", (function(_this) {
          return function(obj, datum, name) {
            var user, user_id, _i, _len, _ref, _results;
            $("#session-description").text(datum.description);
            $("#ac-title").text(datum.value);
            user_id = datum.user_id;
            _ref = _this.data.participants;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              user = _ref[_i];
              if (user._id === user_id) {
                $('#moderator').tagsinput('removeAll');
                _results.push($('#moderator').tagsinput('add', user.name));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
        })(this));
        $('#edit-session-modal').modal('show');
        $('#ac-title').focus();
        return $("#edit-session-form").submit(this.update_session);
      };

      Plugin.prototype.update_session = function(event) {

        /*
        actually add the session to the data structure
         */
        var fd, session;
        event.preventDefault();
        fd = $("#edit-session-form").serializeObject();
        console.log(fd);
        if (!fd.session_idx) {
          alert("An error occurred, please reload the page");
        }
        session = {
          sid: guid(),
          slug: null,
          _id: fd.session_idx,
          title: fd.title,
          description: fd.description,
          interested: fd.interested,
          moderator: fd.moderator
        };
        this.data.sessions[fd.session_idx] = session;
        this.update();
        $('#edit-session-modal').modal('hide');
        return false;
      };

      Plugin.prototype.del_session = function(event) {

        /*
        delete a session after asking for confirmation
         */
        var elem_id, idx;
        if (confirm($('body').data("i18n-areyousure"))) {
          idx = $(event.currentTarget).closest(".sessionslot").data("id");
          elem_id = $(event.currentTarget).closest(".sessionslot").attr("id");
          delete this.data.sessions[idx];
          this.saveState();
          $("#" + elem_id).css({
            background: "#f00"
          }).fadeOut(400, this.render);
        }
        return false;
      };

      Plugin.prototype.init_handlers = function() {
        var room_dict, that;
        that = this;
        try {
          room_dict = this.data.rooms.toDict("id");
        } catch (_error) {
          room_dict = {};
        }
        $("#roomcontainment").sortable({
          axis: 'x',
          helper: "clone",
          items: "th",
          placeholder: "sortable-placeholder",
          containment: 'parent',
          cancel: ".not-sortable",
          opacity: 0.5,
          update: (function(_this) {
            return function(event, ui) {
              var new_rooms;
              new_rooms = [];
              $("#newsessions #roomcontainment .sorted").each(function() {
                var id;
                id = $(this).data("id");
                return new_rooms.push(room_dict[id]);
              });
              _this.data.rooms = new_rooms;
              return _this.update();
            };
          })(this)
        });
        $(".sessionslot.enabled").draggable({
          revert: true,
          snap: ".sessionslot.enabled",
          zIndex: 10000
        }).droppable({
          hoverClass: "btn btn-info",
          drop: (function(_this) {
            return function(event, ui) {
              var dest_idx, old_element, src_idx;
              src_idx = ui.draggable.data("id");
              dest_idx = $(event.target).data("id");
              old_element = _this.data.sessions[dest_idx];
              _this.data.sessions[dest_idx] = _this.data.sessions[src_idx];
              _this.data.sessions[dest_idx]._id = dest_idx;
              if (old_element) {
                _this.data.sessions[src_idx] = old_element;
                old_element._id = src_idx;
              } else {
                delete _this.data.sessions[src_idx];
              }
              return _this.update();
            };
          })(this)
        });
        $("#add-room-modal-button").click(this.add_room_modal);
        $(".del-room-button").click(this.del_room);
        $(".edit-room-modal-button").click(this.edit_room_modal);
        $("#add-timeslot-modal-button").click(this.add_timeslot_modal);
        $(".del-timeslot-button").click(this.del_timeslot);
        $(".edit-session-button").click(this.add_session_modal);
        return $(".del-session-button").click(this.del_session);
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

  $(function() {
    init_i18n();
    return $('.dropdown-toggle').dropdown();
  });

}).call(this);
