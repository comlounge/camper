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
            return function(data) {
              return console.log("ok");
            };
          })(this),
          error: (function(_this) {
            return function(data) {
              return console.error("not so ok");
            };
          })(this)
        });
      };

      Plugin.prototype.get_session_id = function(slot, room) {

        /*
        generate a session if from slot and room
         */
        var d, fd, idx;
        d = new Date(slot.time);
        fd = moment(d).tz('UTC').format("HH:mm");
        idx = room.id + "@" + fd;
        return idx;
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
            time: moment(slot.time).format('HH:mm'),
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
        var d, dd, l, last_time, new_time;
        l = this.data.timeslots.length;
        if (l) {
          last_time = new Date(this.data.timeslots[l - 1].time);
          last_time = new Date(last_time.getTime() + last_time.getTimezoneOffset() * 60000);
          new_time = new Date(last_time.getTime() + 60 * 60000);
          return $("#timepicker").timepicker('setTime', new_time);
        } else {
          d = Date.now();
          dd = new Date();
          dd.setTime(d);
          dd.setHours(9);
          dd.setMinutes(0);
          dd.setSeconds(0);
          $("#timepicker").timepicker('option', 'minTime', '00:00');
          return $("#timepicker").timepicker('setTime', dd);
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
        $("#add-timeslot-button").click(this.add_timeslot);
        return false;
      };

      Plugin.prototype.add_timeslot = function(event) {

        /*
        add a new timeslot to the list of timeslots
         */
        var entered_time, localOffset, now, timeslot, utc;
        timeslot = $("#add-timeslot-form").serializeObject();
        now = new Date();
        entered_time = $("#timepicker").timepicker("getTime", now);
        localOffset = now.getTimezoneOffset();
        utc = new Date(entered_time - localOffset * 60000);
        timeslot.time = utc.toISOString().replace("Z", "");
        this.data.timeslots.push(timeslot);
        console.log(this.data.timeslots);
        this.data.timeslots = _.sortBy(this.data.timeslots, function(item) {
          var t;
          t = item.time;
          if (typeof t === 'string') {
            return moment(new Date(t)).format("HH:mm");
          }
          return moment(t).format("HH:mm");
        });
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
        if (!fd.session_idx) {
          alert("An error occurred, please reload the page");
        }
        session = {
          sid: guid(),
          slug: null,
          _id: fd.session_idx,
          title: fd.title,
          description: fd.description,
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
          items: "td",
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
