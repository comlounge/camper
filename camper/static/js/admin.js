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
  var INTEGER_REGEXP, app, guid, s4;

  s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };

  guid = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  app = angular.module('barcamptool', ['ui.timepicker', 'ui.sortable', 'ngTagsInput', 'ui.autocomplete']);

  app.filter('slice', function() {
    return function(arr, start, end) {
      if (arr) {
        return arr.slice(start, end);
      } else {
        return arr;
      }
    };
  });

  app.config(function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
  });

  app.controller('SessionBoardCtrl', function($scope, $http, $q, $filter) {
    $scope.sessionplan = {};
    $scope.sortableOptions = {
      axis: 'x',
      items: "td",
      placeholder: "sortable-placeholder",
      containment: 'parent',
      cancel: ".not-sortable",
      opacity: 0.5
    };
    $scope.room = {
      name: '',
      description: '',
      capacity: ''
    };
    $scope.timeslot = {
      time: null,
      blocked: false,
      reason: ''
    };
    $scope.timePickerOptions = {
      step: 15,
      timeFormat: 'G:i',
      minTime: "00:00",
      maxTime: "24:00",
      appendTo: 'body'
    };
    $http.get("sessionboard/data").success(function(data) {
      $scope.rooms = data.rooms;
      $scope.rooms.unshift({});
      $scope.timeslots = data.timeslots;
      $scope.participants = data.participants;
      $scope.proposals = data.proposals;
      return $scope.sessionplan = data.sessions;
    });
    $scope.roomModalMode = "add";
    $scope.room_idx = null;
    $scope.add_room_form = function() {
      $scope.roomModalMode = "add";
      $scope.room = {};
      document.getElementById("add-room-form").reset();
      $('#add-room-modal').modal('show');
      $('#room-form-name').focus();
      return void 0;
    };
    $scope.add_room = function() {
      if ($scope.room_form.$error.$invalid) {
        return;
      }
      $scope.room.id = guid();
      $scope.rooms.push($scope.room);
      $scope.room = angular.copy($scope.room);
      $('#add-room-modal').modal('hide');
    };
    $scope.edit_room = function(idx) {
      $scope.roomModalMode = "edit";
      $scope.room = angular.copy($scope.rooms[idx]);
      $scope.room_idx = idx;
      $('#add-room-modal').modal('show');
    };
    $scope.update_room = function() {
      if ($scope.room_form.$error.$invalid) {
        return;
      }
      $scope.rooms[$scope.room_idx] = $scope.room;
      $('#add-room-modal').modal('hide');
    };
    $scope.delete_room = function(idx) {
      $scope.rooms.splice(idx, 1);
      return void 0;
    };
    $scope.timeslotModalMode = "add";
    $scope.timeslot_idx = null;
    $scope.add_timeslot_form = function() {
      var d, dd, last_time, new_time;
      $scope.timeslotModalMode = "add";
      document.getElementById("add-timeslot-form").reset();
      if ($scope.timeslots.length) {
        last_time = new Date(angular.copy($scope.timeslots[$scope.timeslots.length - 1]).time);
        last_time = new Date(last_time.getTime() + last_time.getTimezoneOffset() * 60000);
        new_time = new Date(last_time.getTime() + 60 * 60000);
        $("#timepicker").timepicker('setTime', new_time);
        $scope.timeslot.time = new_time;
      } else {
        d = Date.now();
        dd = new Date();
        dd.setTime(d);
        dd.setHours(9);
        dd.setMinutes(0);
        dd.setSeconds(0);
        $("#timepicker").timepicker('option', 'minTime', '00:00');
        $("#timepicker").timepicker('setTime', dd);
        $scope.timeslot.time = dd;
      }
      $('#add-timeslot-modal').modal('show');
      $('#timepicker').focus();
    };
    $scope.add_timeslot = function() {
      var d, localOffset, now, utc;
      if ($scope.timeslot_form.$error.$invalid) {
        return;
      }
      d = $scope.timeslot.time;
      now = new Date();
      localOffset = now.getTimezoneOffset();
      utc = new Date(d.getTime() - localOffset * 60000);
      $scope.timeslot.time = utc;
      $scope.timeslots.push($scope.timeslot);
      $scope.timeslots = _.sortBy($scope.timeslots, function(item) {
        var t;
        t = item.time;
        if (typeof t === 'string') {
          return new Date(t);
        }
        return t;
      });
      $scope.timeslot = angular.copy($scope.timeslot);
      $('#add-timeslot-modal').modal('hide');
      $scope.timeslot.blocked = false;
      $scope.timeslot.reason = "";
    };
    $scope.delete_timeslot = function(idx) {
      $scope.timeslots.splice(idx, 1);
      return void 0;
    };
    $scope.session_id = null;
    $scope.session = {};
    $scope.add_session = function(slot, room) {
      var d, fd, idx, selectedItem;
      d = new Date(slot.time);
      fd = $filter('date')(d, 'hh:mm', 'UTC');
      idx = $scope.session_idx = room.id + "@" + fd;
      if ($scope.sessionplan.hasOwnProperty(idx)) {
        $scope.session = angular.copy($scope.sessionplan[idx]);
      } else {
        $scope.session = {
          sid: guid(),
          slug: '',
          _id: idx,
          title: '',
          description: '',
          moderator: []
        };
      }
      $('#edit-session-modal').modal('show');
      $("#ac-title").focus();
      selectedItem = null;
      $("#ac-title").autocomplete({
        source: $scope.proposals,
        appendTo: '#edit-session-modal',
        open: function(event, ui) {
          return selectedItem = null;
        },
        select: function(event, ui) {
          return selectedItem = ui;
        },
        change: function(event, ui) {
          var selected, user_id, value;
          selected = false;
          if (selectedItem) {
            value = selectedItem.item.value;
          } else {
            return;
          }
          user_id = selectedItem.item.user_id;
          return $scope.$apply(function() {
            var user, _i, _len, _ref;
            _ref = $scope.participants;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              user = _ref[_i];
              if (user._id === user_id) {
                $scope.session.moderator = [user];
                break;
              }
            }
            $scope.session.title = value;
            return $scope.session.description = selectedItem.item.description;
          });
        }
      });
    };
    $scope.update_session = function() {
      var idx, orig_slug, session, sid, slug, suffix, _ref;
      idx = $scope.session._id;
      $scope.session = angular.copy($scope.session);
      orig_slug = $scope.session.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      suffix = 0;
      slug = orig_slug + '';
      while (true) {
        _ref = $scope.sessionplan;
        for (sid in _ref) {
          session = _ref[sid];
          if (session.slug === slug && idx !== sid) {
            suffix++;
            slug = orig_slug + suffix;
            break;
          }
        }
        break;
      }
      $scope.session.slug = slug;
      $scope.sessionplan[idx] = $scope.session;
      $('#edit-session-modal').modal('hide');
    };
    $scope.get_session_id = function(slot, room) {
      var d, fd, idx;
      d = new Date(slot.time);
      fd = $filter('date')(d, 'hh:mm', 'UTC');
      idx = room.id + "@" + fd;
      return idx;
    };
    $scope.loadParticipants = function() {
      var deferred;
      deferred = $q.defer();
      deferred.resolve($scope.participants);
      return deferred.promise;
    };
    $scope.save_to_server = function() {
      var data, rooms;
      rooms = angular.copy($scope.rooms);
      rooms.splice(0, 1);
      data = {
        rooms: rooms,
        timeslots: $scope.timeslots,
        sessions: $scope.sessionplan
      };
      return $http.post("sessionboard/data", data).success(function(data) {}).error(function(data) {});
    };
    $scope.$watch('rooms', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.save_to_server();
      }
      return void 0;
    }, true);
    $scope.$watch('timeslots', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.save_to_server();
      }
      return void 0;
    }, true);
    return $scope.$watch('sessionplan', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.save_to_server();
      }
      return void 0;
    }, true);
  });

  INTEGER_REGEXP = /^[0-9]+$/i;

  app.directive('integer', function() {
    return {
      restrict: "AE",
      require: 'ngModel',
      link: function($scope, elm, attrs, ctrl) {
        return ctrl.$validators.integer = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }
          if (viewValue.match(INTEGER_REGEXP)) {
            return true;
          }
          return false;
        };
      }
    };
  });

}).call(this);
