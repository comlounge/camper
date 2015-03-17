var bm;

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
    options = {
      accessToken: this.options.accesstoken,
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
    if (this.marker) this.map.removeLayer(this.marker);
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
        if (callback) return callback(data);
      },
      error: function(data) {
        console.log("error");
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
  if ($('#own_location').is(":checked")) $("#location-view").show();
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
