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
    $(".delete-event").click(function() {
      var d, url;
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
      console.log(this.options);
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

  $(document).ready(function() {
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
    tinyMCE.baseURL = "/static/js/components/tinymce/";
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
    $(".delete-event").click(function() {
      var d, url;
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
      return false;
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
  $(document).ready(function() {
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
  's4 = () ->\n    Math.floor((1 + Math.random()) * 0x10000)\n           .toString(16)\n           .substring(1)\n\nguid = () ->\n    return s4() + s4() + \'-\' + s4() + \'-\' + s4() + \'-\' +\n           s4() + \'-\' + s4() + s4() + s4()\n\napp = angular.module(\'barcamptool\', [\'ui.timepicker\', \'ui.sortable\', \'ngTagsInput\', \'ui.autocomplete\']);\n\napp.filter \'slice\', () ->\n    return (arr, start, end) ->\n        if arr \n            return arr.slice(start, end)\n        else\n            return arr\n\n\napp.config ($interpolateProvider) ->\n    $interpolateProvider\n    .startSymbol(\'{[{\')\n    .endSymbol(\'}]}\')\n\n\napp.controller \'SessionBoardCtrl\', ($scope, $http, $q, $filter) ->\n\n    # set some defaults\n\n    $scope.sessionplan = {}\n\n    $scope.sortableOptions =\n        axis: \'x\'\n        items: "td"\n        placeholder: "sortable-placeholder"\n        containment: \'parent\'\n        cancel: ".not-sortable"\n        opacity: 0.5\n\n    $scope.room = {\n        name: \'\',\n        description: \'\',\n        capacity: \'\'\n    }\n    $scope.timeslot = {\n        time: null,\n        blocked: false,\n        reason: \'\'\n    }\n\n    $scope.timePickerOptions =\n        step: 15\n        timeFormat: \'G:i\'\n        minTime: "00:00"\n        maxTime: "24:00"\n        appendTo: \'body\'\n\n    # load initial data from server\n    $http.get("sessionboard/data").success (data) ->\n        $scope.rooms = data.rooms\n        $scope.rooms.unshift({})\n        $scope.timeslots = data.timeslots\n        $scope.participants = data.participants\n        $scope.proposals = data.proposals\n        $scope.sessionplan = data.sessions\n\n            \n    #\n    # room related\n    #\n\n    $scope.roomModalMode = "add"\n    $scope.room_idx = null # for remembering which room to update\n\n    $scope.add_room_form = () ->\n        $scope.roomModalMode = "add"\n        $scope.room = {}\n        document.getElementById("add-room-form").reset()\n        $(\'#add-room-modal\').modal(\'show\')\n        $(\'#room-form-name\').focus()\n        undefined\n\n    $scope.add_room = () ->\n        if $scope.room_form.$error.$invalid\n            return\n        $scope.room.id = guid()\n        $scope.rooms.push($scope.room)\n        $scope.room = angular.copy($scope.room)\n        $(\'#add-room-modal\').modal(\'hide\')\n        return\n\n    $scope.edit_room = (idx) ->\n        $scope.roomModalMode = "edit"\n        $scope.room = angular.copy($scope.rooms[idx])\n        $scope.room_idx = idx        \n        $(\'#add-room-modal\').modal(\'show\')\n        return\n    \n    $scope.update_room = () ->\n        if $scope.room_form.$error.$invalid\n            return\n        $scope.rooms[$scope.room_idx] = $scope.room\n        $(\'#add-room-modal\').modal(\'hide\')\n        return\n        \n    $scope.delete_room = (idx) ->\n        $scope.rooms.splice(idx,1)\n        undefined\n\n\n    #\n    # timeslot related\n    #\n\n    $scope.timeslotModalMode = "add"\n    $scope.timeslot_idx = null # for remembering which timeslot to update\n\n    $scope.add_timeslot_form = () ->\n        $scope.timeslotModalMode = "add"\n        document.getElementById("add-timeslot-form").reset()\n\n        # pre-set the next possible time\n        if $scope.timeslots.length\n            last_time = new Date(angular.copy($scope.timeslots[$scope.timeslots.length-1]).time)\n            last_time = new Date(last_time.getTime() + last_time.getTimezoneOffset() * 60000) # convert to UTC\n            new_time = new Date(last_time.getTime() + 60*60000)\n            $("#timepicker").timepicker(\'setTime\', new_time)\n            $scope.timeslot.time = new_time\n        else\n            d = Date.now() # TODO: set the date of the day of the event\n            dd = new Date()\n            dd.setTime(d)\n            dd.setHours(9)\n            dd.setMinutes(0)\n            dd.setSeconds(0)\n            $("#timepicker").timepicker(\'option\', \'minTime\', \'00:00\')\n            $("#timepicker").timepicker(\'setTime\', dd)\n            $scope.timeslot.time = dd\n\n        $(\'#add-timeslot-modal\').modal(\'show\')\n        $(\'#timepicker\').focus()\n        return\n\n    $scope.add_timeslot = () ->\n\n        if $scope.timeslot_form.$error.$invalid\n            return\n\n        d = $scope.timeslot.time\n\n        # get the local timezone offset\n        now = new Date()\n        localOffset = now.getTimezoneOffset()\n        \n        # convert to utc by removing the local offset\n        utc = new Date(d.getTime() - localOffset*60000)\n        \n        $scope.timeslot.time = utc\n        $scope.timeslots.push $scope.timeslot\n\n        $scope.timeslots = _.sortBy($scope.timeslots, (item) ->\n            t = item.time\n            # loaded timeslots are string and not objects\n            if typeof(t) == \'string\'\n                return new Date(t)\n            return t\n        )\n        $scope.timeslot = angular.copy($scope.timeslot)\n        $(\'#add-timeslot-modal\').modal(\'hide\')\n        $scope.timeslot.blocked = false\n        $scope.timeslot.reason = ""\n        return\n\n    $scope.delete_timeslot = (idx) ->\n        $scope.timeslots.splice(idx,1)\n        undefined\n\n\n    #\n    # slot related\n    #\n\n    $scope.session_id = null # for remembering which session to update (format: $room.id@$slot.time)\n    $scope.session = {}\n    $scope.add_session = (slot, room) ->\n        d = new Date(slot.time)\n        fd = $filter(\'date\')(d, \'hh:mm\', \'UTC\')\n        idx = $scope.session_idx = room.id+"@"+fd\n        if $scope.sessionplan.hasOwnProperty(idx)\n            $scope.session = angular.copy($scope.sessionplan[idx])\n        else\n            $scope.session = \n                sid: guid() # we need a unique id for easier referencing\n                slug: \'\' # the slug for easier url referencing\n                _id: idx\n                title: \'\'\n                description: \'\'\n                moderator: []\n        \n\n        #$scope.room = angular.copy($scope.rooms[idx])\n        $(\'#edit-session-modal\').modal(\'show\')\n        $("#ac-title").focus()\n        selectedItem = null\n        $("#ac-title").autocomplete\n            source: $scope.proposals\n            appendTo: \'#edit-session-modal\'\n            open: (event, ui) ->\n                selectedItem = null\n            select: (event, ui) ->\n                selectedItem = ui\n            change: (event, ui) ->\n                selected = false\n                if selectedItem\n                    value = selectedItem.item.value\n                else\n                    return\n                user_id = selectedItem.item.user_id\n\n                # update the scope\n                $scope.$apply( () ->\n                    # search for user\n                    for user in $scope.participants\n                        if user._id == user_id\n                            $scope.session.moderator = [user]\n                            break\n                    $scope.session.title = value\n                    $scope.session.description = selectedItem.item.description\n                )\n        return\n\n    $scope.update_session = () ->\n        idx = $scope.session._id\n        $scope.session = angular.copy($scope.session)\n        \n        # create filename for it\n        orig_slug = $scope.session.title.replace(/[^a-z0-9]/gi, \'_\').toLowerCase();\n        suffix = 0\n        slug = orig_slug + \'\'\n\n        # check if slug is already taken\n        while true\n            for sid, session of $scope.sessionplan\n                if session.slug == slug and idx != sid\n                    suffix++  \n                    slug = orig_slug+suffix # append number\n                    break\n            break\n\n        $scope.session.slug = slug\n\n        $scope.sessionplan[idx] = $scope.session\n        $(\'#edit-session-modal\').modal(\'hide\')\n        return\n\n\n    $scope.get_session_id = (slot, room) ->\n        d = new Date(slot.time)\n        fd = $filter(\'date\')(d, \'hh:mm\', \'UTC\')\n        idx = room.id+"@"+fd\n        return idx\n     \n    $scope.loadParticipants = () ->\n        deferred = $q.defer()\n        deferred.resolve($scope.participants)\n        return deferred.promise;\n\n    #\n    # server communications\n    #\n\n    $scope.save_to_server = () ->\n        # clean up rooms\n        rooms = angular.copy($scope.rooms)\n        rooms.splice(0,1) # remove first empty element\n        data = \n            rooms: rooms\n            timeslots: $scope.timeslots\n            sessions: $scope.sessionplan\n        $http.post("sessionboard/data", data).success (data) ->\n            # TODO: catch some error here\n            return\n        .error (data) ->\n            # TODO: explain error\n            return\n\n    $scope.$watch( \'rooms\', (newValue, oldValue) ->\n        if newValue != oldValue\n            $scope.save_to_server()\n        undefined\n    , true)\n\n    $scope.$watch( \'timeslots\', (newValue, oldValue) ->\n        if newValue != oldValue\n            $scope.save_to_server()\n        undefined\n    , true)\n\n\n    $scope.$watch( \'sessionplan\', (newValue, oldValue) ->\n        if newValue != oldValue\n            $scope.save_to_server()\n        undefined\n    , true)\n\n\n\n\nINTEGER_REGEXP = ///^\n    [0-9]+\n    $///i\n\n# we only catch . here, the rest is done by the default validator\napp.directive(\'integer\', () ->\n    return {\n        restrict: "AE",\n        require: \'ngModel\',\n        link: ($scope, elm, attrs, ctrl) ->\n            ctrl.$validators.integer = (modelValue, viewValue) ->\n                if ctrl.$isEmpty(modelValue)\n                    return true\n                if viewValue.match INTEGER_REGEXP\n                    return true\n                \n                # it is invalid\n                return false\n    }\n)\n';


}).call(this);

(function() {
  var guid;

  Array.prototype.toDict = function(key) {
    return this.reduce((function(dict, obj) {
      if (obj[key] != null) {
        dict[obj[key]] = obj;
      }
      return dict;
    }), {});
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

  $.fn.sessionboard = function(opts) {
    var element, init, init_handlers, loadState, render, saveState;
    if (opts == null) {
      opts = {};
    }
    element = null;
    init = function(opts) {
      element = $(this);
      $(this).on("update", function() {
        saveState();
        return render();
      });
      loadState();
      return element.version = 0;
    };
    loadState = function() {
      return $.ajax({
        url: "sessionboard/data",
        dataType: 'json',
        cache: false,
        success: function(data) {
          element.data = data;
          return render();
        },
        error: function(xhr, status, err) {
          return console.error("url", status, err.toString());
        }
      });
    };
    saveState = function() {
      return $.ajax({
        url: "sessionboard/data",
        data: JSON.stringify(element.data),
        contentType: 'application/json',
        type: 'POST',
        success: function(data) {
          return console.log("ok");
        },
        error: function(data) {
          return console.log("not so ok");
        }
      });
    };
    render = function() {
      var colwidth, html;
      colwidth = 90 / (element.data.rooms.length + 1);
      html = JST["sessiontest"]({
        data: element.data,
        colwidth: colwidth,
        version: element.version
      });
      $("#newsessions").html(html);
      init_handlers();
      return element.version = element.version + 1;
    };
    init_handlers = function() {
      var room_dict;
      room_dict = element.data.rooms.toDict("id");
      $("#roomcontainment").sortable({
        axis: 'x',
        helper: "clone",
        items: "td",
        placeholder: "sortable-placeholder",
        containment: 'parent',
        cancel: ".not-sortable",
        opacity: 0.5,
        update: function(event, ui) {
          var new_rooms;
          new_rooms = [];
          $("#newsessions #roomcontainment .sorted").each(function() {
            var id;
            id = $(this).data("id");
            return new_rooms.push(room_dict[id]);
          });
          element.data.rooms = new_rooms;
          return $("#newsessions").trigger("update");
        }
      });
      $("#add-room-modal-button").click(function() {
        var html;
        html = JST["room-modal"]({
          add_room: true
        });
        $("#modals").html(html);
        $('#add-room-modal').modal('show');
        $('#room-form-name').focus();
        $(".add-room-button").click(function() {
          var room;
          room = $("#add-room-form").serializeObject();
          if (!room.name) {
            return alert("Please enter a name");
          }
          if (!room.capacity) {
            return alert("Please enter a capacity");
          }
          element.data.rooms.push(room);
          $("#newsessions").trigger("update");
          $('#add-room-modal').modal('hide');
        });
        return false;
      });
      $(".del-room-button").click(function() {
        var idx;
        if (confirm($('body').data("i18n-areyousure"))) {
          idx = $(this).data("index");
          element.data.rooms.splice(idx, 1);
          return $("#newsessions").trigger("update");
        }
      });
      return $(".edit-room-modal-button").click(function() {
        var html, idx, room;
        idx = $(this).data("index");
        room = element.data.rooms[idx];
        html = JST["room-modal"]({
          room: room,
          room_idx: idx,
          add_room: false
        });
        $("#modals").html(html);
        $('#add-room-modal').modal('show');
        $('#room-form-name').focus();
        $(".update-room-button").click(function() {
          var room_idx;
          room = $("#add-room-form").serializeObject();
          console.log(room);
          room_idx = room['room_idx'];
          if (!room_idx) {
            return alert("Error");
          }
          if (!room.name) {
            return alert("Please enter a name");
          }
          if (!room.capacity) {
            return alert("Please enter a capacity");
          }
          room = JSON.parse(JSON.stringify(room));
          console.log(room_idx);
          element.data.rooms[room_idx] = room;
          $("#newsessions").trigger("update");
          $('#add-room-modal').modal('hide');
        });
        return false;
      });
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    return $("#newsessions").sessionboard();
  });

}).call(this);

(function() {
  var Colgroup, RoomHeader, SessionTable;

  Colgroup = React.createClass({
    render: function() {
      var cols;
      cols = this.props.cols.map(function(colWidth, index) {
        return React.createElement("col", {
          "key": 'col' + index,
          "width": colWidth
        });
      });
      return React.createElement("colgroup", null, cols);
    }
  });

  RoomHeader = React.createClass({
    render: function() {
      var tds;
      tds = this.props.rooms.map(function(room, index) {
        return React.createElement("td", {
          "className": "room-slot"
        }, React.createElement("h5", {
          "className": "room-name"
        }, room.name), React.createElement("div", {
          "class": "room-actions"
        }), React.createElement("small", null, room.description), React.createElement("br", null), React.createElement("small", null, room.capacity, " persons"));
      });
      return React.createElement("thead", null, React.createElement("tr", {
        "id": "roomcontainment"
      }, React.createElement("td", null), tds));
    }
  });

  SessionTable = React.createClass({
    getInitialState: function() {
      return {
        rooms: [],
        timeslots: [],
        participants: {},
        proposals: {},
        sessionplan: {}
      };
    },
    loadSessionPlan: function() {
      return $.ajax({
        url: "sessionboard/data",
        dataType: 'json',
        cache: false,
        success: (function(data) {
          console.log("success");
          this.setState({
            rooms: data.rooms,
            timeslots: data.timeslots,
            participants: data.participants,
            proposals: data.proposals,
            sessionplan: data.sessionplan
          });
        }).bind(this),
        error: (function(xhr, status, err) {
          return console.error(this.props.url, status, err.toString());
        }).bind(this)
      });
    },
    componentDidMount: function() {
      console.log("mounted");
      return this.loadSessionPlan();
    },
    render: function() {
      var l, room, widths;
      l = this.state.rooms.length;
      widths = [
        (function() {
          var _i, _len, _ref, _results;
          _ref = this.state.rooms;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            room = _ref[_i];
            _results.push(90 / l);
          }
          return _results;
        }).call(this)
      ];
      widths = widths[0];
      widths.unshift(10);
      return React.createElement("div", {
        "class": "table-responsive"
      }, React.createElement("table", {
        "className": "table table-bordered sessiontable"
      }, React.createElement(Colgroup, {
        "cols": widths
      }), React.createElement(RoomHeader, {
        "rooms": this.state.rooms
      })));
    }
  });

  $(document).ready(function() {});

}).call(this);
