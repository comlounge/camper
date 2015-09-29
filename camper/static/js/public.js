(function() {
  $.fn.gallery = function(opts) {
    var $container, $gallery, $galleryPicture, $galleryPictures, blurMultiplier, currentImage, distLog, distLogLimit, distThreshold, dragPos, dragging, galleryPos, imageSpacing, imageTotalWidth, imageWidth, init, lastBlur, lastDragPos, lastPos, maxBlur, minBlur, momentumTween, setBlur, setGalleryPos, speedLog, speedLogLimit, stopMomentum, totalDist, updateGalleryPos, updateGalleryPosLoop;
    if (opts == null) {
      opts = {};
    }
    $container = null;
    $gallery = null;
    $galleryPictures = null;
    $galleryPicture = null;
    lastPos = {
      x: 0
    };
    galleryPos = {
      x: 0
    };
    currentImage = -1;
    imageWidth = 700;
    imageSpacing = 120;
    imageTotalWidth = 0;
    speedLog = [];
    speedLogLimit = 5;
    minBlur = 100;
    maxBlur = 700;
    blurMultiplier = 1.25;
    lastBlur = 0;
    dragging = false;
    lastDragPos = {
      x: 0
    };
    dragPos = {
      x: 0
    };
    totalDist = 0;
    distThreshold = 10;
    distLog = [];
    distLogLimit = 10;
    momentumTween = null;
    init = function() {
      $container = $(this);
      $gallery = $container.find(".gallery");
      $galleryPictures = $container.find(".gallery-pictures");
      $galleryPicture = $container.find(".gallery-picture");
      imageTotalWidth = imageWidth + imageSpacing;
      $galleryPictures.css({
        webkitFilter: "url('#blur')",
        filter: "url('#blur')"
      });
      $galleryPicture.each(function(i) {
        var cur;
        cur = $(this);
        cur.click(function() {
          if (Math.abs(totalDist) < distThreshold) {
            return setGalleryPos(i);
          }
        });
        return $container.find(".gallery-pagination-dot").eq(i).click(function() {
          return setGalleryPos(i);
        });
      });
      $gallery.mousedown(function(event) {
        event.preventDefault();
        dragging = true;
        dragPos.x = event.pageX;
        lastDragPos.x = dragPos.x;
        totalDist = 0;
        distLog = [];
        stopMomentum();
        return updateGalleryPosLoop();
      });
      $(document).mousemove(function(event) {
        if (dragging) {
          return dragPos.x = event.pageX;
        }
      });
      $(document).mouseup(function(event) {
        var excess, releaseSpeed, s, targetImage, targetX, _i, _len;
        if (dragging) {
          dragging = false;
          releaseSpeed = 0;
          for (_i = 0, _len = distLog.length; _i < _len; _i++) {
            s = distLog[_i];
            releaseSpeed += s;
          }
          releaseSpeed /= distLog.length;
          targetX = galleryPos.x + (releaseSpeed * 20);
          targetX = Math.round(targetX / imageTotalWidth) * imageTotalWidth;
          targetImage = -targetX / imageTotalWidth;
          excess = 0;
          if (targetImage < 0) {
            excess = targetImage;
            targetImage = 0;
          } else if (targetImage >= $galleryPicture.length) {
            excess = targetImage - ($galleryPicture.length - 1);
            targetImage = $galleryPicture.length - 1;
          }
          if (excess !== 0) {
            targetX = -targetImage * imageTotalWidth;
          }
          momentumTween = TweenMax.to(galleryPos, 1 - (Math.abs(excess) / 20), {
            x: targetX,
            ease: Quint.easeOut,
            onUpdate: updateGalleryPos,
            onComplete: updateGalleryPos
          });
          if (Math.abs(totalDist) >= distThreshold) {
            event.preventDefault();
            return event.stopPropagation();
          }
        }
      });
      return setGalleryPos(0, false);
    };
    setBlur = function(v) {
      if (v < minBlur) {
        v = 0;
      }
      if (v > maxBlur) {
        v = maxBlur;
      }
      if (v !== lastBlur) {
        $("#blur").get(0).firstElementChild.setAttribute("stdDeviation", v + ",0");
      }
      return lastBlur = v;
    };
    setGalleryPos = function(v, anim) {
      if (typeof anim === "undefined") {
        anim = true;
      }
      stopMomentum();
      return TweenMax.to(galleryPos, anim != null ? anim : {
        0.8: 0
      }, {
        x: -v * imageTotalWidth,
        ease: Quint.easeOut,
        onUpdate: updateGalleryPos,
        onComplete: updateGalleryPos
      });
    };
    updateGalleryPos = function() {
      var blur, speed, _currentImage;
      TweenMax.set($galleryPictures, {
        x: galleryPos.x + (($container.width() - imageWidth) / 2),
        force3D: true,
        lazy: true
      });
      speed = lastPos.x - galleryPos.x;
      blur = Math.abs(Math.round(speed * blurMultiplier));
      setBlur(blur);
      lastPos.x = galleryPos.x;
      _currentImage = Math.round(-galleryPos.x / imageTotalWidth);
      if (_currentImage !== currentImage) {
        currentImage = _currentImage;
        $container.find(".gallery-pagination-dot-selected").removeClass('gallery-pagination-dot-selected');
        return $container.find(".gallery-pagination-dot").eq(currentImage).addClass('gallery-pagination-dot-selected');
      }
    };
    updateGalleryPosLoop = function() {
      var dist;
      if (dragging) {
        updateGalleryPos();
        dist = dragPos.x - lastDragPos.x;
        lastDragPos.x = dragPos.x;
        totalDist += dist;
        distLog.push(dist);
        while (distLog.length > distLogLimit) {
          distLog.splice(0, 1);
        }
        galleryPos.x += dist;
        return requestAnimationFrame(updateGalleryPosLoop);
      }
    };
    stopMomentum = function() {
      if (momentumTween !== null) {
        momentumTween.kill();
        momentumTween = null;
        return updateGalleryPos();
      }
    };
    $(this).each(init);
    return this;
  };

  $.fn.uploader2 = function(opts) {
    var file_completed, init, myfilename, sponsor;
    if (opts == null) {
      opts = {};
    }
    file_completed = false;
    myfilename = null;
    sponsor = function(widget, json) {
      var img;
      $(widget).find(".upload-area").hide();
      img = $("<img>").attr({
        "src": json.url,
        "width": "100px"
      });
      $(widget).find(".upload-value-id").val(json.asset_id);
      $(widget).find(".preview-area").children().remove();
      return $(widget).find(".preview-area").append(img).show();
    };
    init = function() {
      var postproc, uploader, url, widget;
      url = $(this).data("url");
      postproc = $(this).data("postproc");
      widget = this;
      return uploader = new qq.FileUploaderBasic({
        button: $(widget).find(".uploadbutton")[0],
        action: url,
        multiple: false,
        sizeLimit: 10 * 1024 * 1024,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        onProgress: function(id, filename, loaded, total) {
          var perc;
          perc = parseInt(Math.floor(loaded / total * 100)) + "%";
          return $(widget).find(".progressbar .progress").css("width", perc);
        },
        onSubmit: function(id, filename) {
          $(widget).find(".progressbar").show();
          return $(widget).find(".preview-area").hide();
        },
        onComplete: function(id, filename, json) {
          var field_id;
          if (json.status === "error") {
            file_completed = false;
            myfilename = null;
            alert(json.msg);
            $(widget).find(".upload-area").show();
            $(widget).find(".progressbar").hide();
            return false;
          }
          if (json.status === "success") {
            file_completed = true;
            field_id = $(widget).data("id") + "-id";
            $("#" + field_id).val(json.asset_id);
            if (json.url) {
              $(widget).find(".preview-area img").attr("src", json.url);
              $(widget).find(".progressbar").hide();
              $(widget).find(".preview-area").show();
            }
            if (json.redirect) {
              window.location = json.redirect;
              return;
            }
            if (json.parent_redirect) {
              window.parent.window.location = json.parent_redirect;
              window.close();
              return;
            }
            if (postproc) {
              if (postproc === "sponsor") {
                sponsor(widget, json);
              }
            }
            $(widget).find(".upload-area").show();
            return $(widget).find(".progressbar").hide();
          }
        }
      });
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    $(".gallerycontainer").gallery();
    $(".upload-widget").uploader();
    $('[data-toggle=confirmation]').confirmation({
      popout: true
    });
    $('[data-toggle="editfield"]').click(function() {
      var f, p;
      $(this).hide();
      p = $(this).closest(".editfield");
      return f = $(p).find(".edit").show();
    });
    $('[data-close="editfield"]').on("click", function() {
      var f, p;
      $(this).closest(".edit").hide();
      p = $(this).closest(".editfield");
      f = $(p).find(".value").show();
      return false;
    });
    $('form.edit').on("submit", function() {
      var f, p;
      $(this).closest(".edit").hide();
      p = $(this).closest(".editfield");
      f = $(p).find(".value").show();
      alert("Gespeichert");
      return false;
    });
    $('[data-action="set-layout"]').click(function() {
      var layout, that, url;
      layout = $(this).data("layout");
      url = $(this).attr("href");
      that = this;
      $.ajax({
        url: url,
        type: "POST",
        data: {
          layout: layout
        },
        success: function(data) {
          return $(that).closest(".barcamp-page").removeClass("layout-left").removeClass("layout-default").removeClass("layout-right").addClass("layout-" + data.layout);
        }
      });
      return false;
    });
    $(".asset-delete").click(function() {
      var confirm_message, idx, url;
      confirm_message = $(this).data("confirm");
      url = $(this).data("url");
      idx = $(this).data("idx");
      if (confirm(confirm_message)) {
        return $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete",
            idx: idx
          },
          success: function() {
            return window.location.reload();
          }
        });
      } else {

      }
    });
    $("#blog-add-button").click(function() {
      $("#blog-add-button-container").slideUp();
      return $("#blog-add-form").slideDown();
    });
    $("#blog-add-cancel-button").click(function() {
      $("#blog-add-form")[0].reset();
      $("#blog-add-button-container").slideDown();
      $("#blog-add-form").slideUp();
      return false;
    });
    $(".blog-delete-button").click(function() {
      var idx, msg, url;
      msg = $(this).data("msg");
      idx = $(this).data("idx");
      url = $("#blog-add-form").attr("action");
      if (confirm(msg)) {
        $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete",
            idx: idx
          },
          success: function() {
            return window.location.reload();
          }
        });
      }
      return false;
    });
    $(".colorpicker-container").colorpicker();
    $("a.form-submit").click(function() {
      var action, form;
      action = $(this).attr("href");
      form = $(this).closest("form");
      form.attr("action", action);
      console.log(form.attr("method"));
      form.submit();
      return false;
    });
    $("#minimap").each(function() {
      var at, goto, href, id, lat, lng, map, mapid, marker, options;
      lat = $(this).data("lat");
      lng = $(this).data("lng");
      at = $(this).data("accesstoken");
      mapid = $(this).data("mapid");
      id = $(this).attr("id");
      href = $(this).data("href");
      L.mapbox.accessToken = at;
      options = {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        center: [lat, lng],
        zoom: 14,
        accessToken: at
      };
      map = L.mapbox.map(id, mapid, options);
      L.Icon.Default.imagePath = '/static/img';
      marker = L.marker([lat, lng]).addTo(map);
      goto = function(e) {
        return document.location = href;
      };
      marker.on("click", goto);
      return map.on("click", goto);
    });
    $("#edit-minimap").each(function() {
      var at, id, lat, lng, map, mapid, marker, options;
      lat = $(this).data("lat");
      lng = $(this).data("lng");
      at = $(this).data("accesstoken");
      mapid = $(this).data("mapid");
      id = $(this).attr("id");
      L.mapbox.accessToken = at;
      options = {
        zoomControl: false,
        dragging: true,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        center: [lat, lng],
        zoom: 15,
        accessToken: at
      };
      map = L.mapbox.map(id, mapid, options);
      L.Icon.Default.imagePath = '/static/img';
      marker = L.marker([lat, lng]).addTo(map);
      return console.log(marker);
    });
    return $("#select-event").change(function() {
      return window.location = $("#select-event option:selected").attr("value");
    });
  });

}).call(this);

(function() {
  $.fn.datafields = function(opts) {
    var $this, clear_form, init, make_datafield_row, to_json;
    if (opts == null) {
      opts = {};
    }
    $this = $(this);
    init = function() {
      $($this).submit(function() {
        var row;
        row = make_datafield_row();
        console.log($($this).data('update_idx'));
        if ($($this).data('update_idx') > -1) {
          $('table#participant_datafields tbody tr').eq($($this).data('update_idx')).replaceWith(row);
        } else {
          $('table#participant_datafields').append(row);
        }
        $('#datafield-modal').modal('hide');
        return false;
      });
      $('.remove-datafield').live('click', function(e) {
        $(this).parents('tr').remove();
        return $('input#pdatafields').val(to_json());
      });
      $('.edit-datafield').live('click', function(e) {
        var row;
        row = $(this).parents('tr');
        $('#datafield-form').data('update_idx', $('table#participant_datafields tbody tr').index(row));
        $('#datafield-form').find('input#name').val($(row).data('name'));
        $('#datafield-form').find('input#title').val($(row).data('title'));
        $('#datafield-form').find('textarea#description').val($(row).data('description'));
        $('#datafield-form').find('select#fieldtype').val($(row).data('fieldtype'));
        if ($(row).data('required') === true) {
          $('#datafield-form').find('input#required').attr('checked', true);
        }
        return $('#datafield-modal').modal('show');
      });
      $('#datafield-modal').on('hidden', function() {
        clear_form();
        return $('input#pdatafields').val(to_json());
      });
      return $('input#pdatafields').val(to_json());
    };
    to_json = function() {
      var obj;
      obj = [];
      $('table#participant_datafields tbody tr').each(function() {
        return obj.push({
          'name': $(this).data('name'),
          'title': $(this).data('title'),
          'description': $(this).data('description'),
          'fieldtype': $(this).data('fieldtype'),
          'required': $(this).data('required')
        });
      });
      return JSON.stringify(obj);
    };
    clear_form = function() {
      $($this).data('update_idx', -1);
      $($this).find('input#name').val('');
      $($this).find('input#title').val('');
      $($this).find('textarea#description').val('');
      $($this).find('select#fieldtype').find(":selected").removeAttr("selected");
      return $($this).find('input#required').attr('checked', false);
    };
    make_datafield_row = function() {
      var description, fieldtype, form, name, r, required, title;
      form = $('#datafield-form');
      name = $(form).find('input#name').val();
      title = $(form).find('input#title').val();
      description = $(form).find('textarea#description').val();
      fieldtype = $(form).find('select#fieldtype').find(":selected");
      required = $(form).find('input#required').attr('checked');
      r = $('<tr></tr>').attr('data-name', name).attr('data-title', title).attr('data-description', description).attr('data-fieldtype', fieldtype.val()).attr('data-required', required === 'checked');
      $('<td></td>').text(name).appendTo(r);
      $('<td></td>').text(title).appendTo(r);
      $('<td></td>').text(description).appendTo(r);
      $('<td></td>').text(fieldtype.text()).appendTo(r);
      if (required === 'checked') {
        $('<td></td>').html('<i class="icon-ok">').appendTo(r);
      } else {
        $('<td></td>').appendTo(r);
      }
      $('<td><button class="btn btn-mini btn-info edit-datafield" type="button"><i class="icon-white icon-pencil"></button></td><td><button class="btn btn-mini btn-danger remove-datafield" type="button"><i class="icon-white icon-trash"></button></td>').appendTo(r);
      return r;
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    return $("#datafield-form").datafields();
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
  $.fn.eventlist = function(opts, _arg) {
    var change_status, dataurl, init, update_event;
    _arg;
    dataurl = null;
    update_event = function(d) {
      var elem;
      elem = $("#e-" + d.eid);
      elem.find(".plabel").hide();
      elem.find(".dlabel").hide();
      elem.find("button").hide();
      if (!d.participant && !d.waitinglist && !d.maybe) {
        if (d.full) {
          elem.find(".btn-joinwl").show();
        } else {
          elem.find(".btn-join").show();
        }
        elem.find(".btn-maybe").show();
        elem.find(".infolabel.plabel-going").hide();
        elem.find(".infolabel.plabel-notgoing").show();
      } else {
        elem.find(".dropdown-toggle").removeClass("btn-info").removeClass("btn-success").removeClass("btn-warning");
        if (d.participant) {
          elem.find(".label-going").show();
          elem.find(".infolabel.plabel-going").show();
          elem.find(".infolabel.plabel-notgoing").hide();
          elem.find(".dlabel.maybe").show();
          elem.find(".dropdown-toggle").addClass("btn-success");
        } else if (d.waitinglist) {
          elem.find(".label-waitinglist").show();
          elem.find(".infolabel.plabel-going").hide();
          elem.find(".infolabel.plabel-notgoing").show();
          elem.find(".dlabel.maybe").show();
          elem.find(".dropdown-toggle").addClass("btn-warning");
        } else if (d.maybe) {
          elem.find(".label-maybe").show();
          elem.find(".infolabel.plabel-going").hide();
          elem.find(".infolabel.plabel-notgoing").show();
          elem.find(".dlabel.going").show();
          elem.find(".dropdown-toggle").addClass("btn-info");
        }
        elem.find(".pselect").show();
        elem.find(".dropdown-toggle").show();
      }
      elem.find(".filled").text(d.filled);
      elem.find(".size").text(d.size);
      elem = $("#ne-" + d.eid);
      elem.find(".plabel").hide();
      if (d.participant) {
        return elem.find(".plabel-going").show();
      } else if (d.maybe) {
        return elem.find(".plabel-maybe").show();
      } else if (d.waitinglist) {
        return elem.find(".plabel-waiting").show();
      } else {
        return elem.find(".plabel-not").show();
      }
    };
    init = function() {
      dataurl = $(this).data("url");
      $.ajax({
        url: dataurl,
        type: "GET",
        success: function(data) {
          var d, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            d = data[_i];
            _results.push(update_event(d));
          }
          return _results;
        }
      });
      $(this).find(".actions > button").click(function() {
        return change_status(this);
      });
      return $(this).find(".dropdown-menu a").click(function() {
        return change_status(this);
      });
    };
    change_status = function(elem) {
      var eid, status;
      eid = $(elem).closest(".event").data("id");
      status = $(elem).data("status");
      return $.ajax({
        url: dataurl,
        method: "POST",
        data: {
          eid: eid,
          status: status
        },
        success: function(data) {
          return update_event(data);
        },
        error: function() {
          return alert("An unknown error occurred, please try again");
        }
      });
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    var hash, prefix;
    $("#eventlist").eventlist();
    $('.participant-avatar').tooltip({
      container: 'body'
    });
    hash = document.location.hash;
    prefix = "tab_";
    if (hash) {
      $('.nav-tabs a[href=' + hash.replace(prefix, "") + ']').tab('show');
    }
    return $('.nav-tabs a').on('shown', function(e) {
      return window.location.hash = e.target.hash.replace("#", "#" + prefix);
    });
  });

}).call(this);

(function() {
  $.fn.sessionvoter = function(opts) {
    var init;
    if (opts == null) {
      opts = {};
    }
    init = function() {
      var that, url;
      url = $(this).data("url");
      that = this;
      return $(this).find("a.vote").click(function() {
        $.ajax({
          url: url,
          type: "POST",
          success: function(data, status) {
            $(that).find(".votes").text(data.votes);
            if (data.active) {
              return $(that).find("a.vote").removeClass("inactive").addClass("active");
            } else {
              return $(that).find("a.vote").removeClass("active").addClass("inactive");
            }
          }
        });
        return false;
      });
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    $(".votecontainer").sessionvoter();
    $("#new-proposal-button").click(function() {
      $(this).hide();
      $("#proposal-form-container").show();
      return false;
    });
    $("#proposal-cancel").click(function() {
      $("#new-proposal-button").show();
      $("#proposal-form-container").hide();
      return false;
    });
    $(".session-edit-button").click(function() {
      $(this).closest(".show-box").hide();
      return $(this).closest(".show-box").parent().find(".edit-box").show();
    });
    $(".session-cancel-button").click(function() {
      $(this).closest(".edit-box").hide();
      return $(this).closest(".edit-box").parent().find(".show-box").show();
    });
    $(".session-delete-button").click(function() {
      var confirm_msg, that, url;
      confirm_msg = $(this).data("confirm");
      that = this;
      if (confirm(confirm_msg)) {
        $(that).closest("article").css("background-color", "red").slideUp();
        url = $(this).data("url");
        $.ajax({
          url: url,
          data: {
            method: "delete"
          },
          type: "POST",
          success: function(data, status) {
            if (data.status === "success") {
              return $(that).closest("article").css("background-color", "red").slideUp();
            }
          }
        });
      }
      return false;
    });
    return $(".comment .deletebutton").click(function() {
      var cid, confirm_message, elem, url;
      confirm_message = $(this).data("confirm");
      url = $(this).data("url");
      cid = $(this).data("cid");
      elem = $(this).closest(".comment");
      if (confirm(confirm_message)) {
        $.ajax({
          url: url,
          type: "POST",
          data: {
            method: "delete",
            cid: cid
          },
          success: function(data) {
            if (data.status === "success") {
              elem.css("background", "red");
              return elem.slideUp();
            }
          }
        });
      } else {
        return false;
      }
      return false;
    });
  });

}).call(this);

(function() {
  $.fn.uploader = function(opts) {
    var file_completed, init, myfilename;
    if (opts == null) {
      opts = {};
    }
    file_completed = false;
    myfilename = null;
    init = function(opts) {
      var autosubmit, delete_url, field_id, original_id, preview_url, upload_url, uploader, widget;
      widget = this;
      preview_url = $(this).data("preview-url");
      upload_url = $(this).data("upload-url");
      delete_url = $(this).data("delete-url");
      field_id = $(this).data("id");
      original_id = $("#" + field_id).val();
      autosubmit = $(this).data("autosubmit") === "True";
      uploader = new qq.FileUploaderBasic({
        button: $(widget).find(".uploadbutton")[0],
        action: upload_url,
        multiple: false,
        sizeLimit: 10 * 1024 * 1024,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        onProgress: function(id, filename, loaded, total) {
          var perc;
          perc = parseInt(Math.floor(loaded / total * 100)) + "%";
          return $(widget).find(".progress-bar").css("width", perc);
        },
        onSubmit: function(id, filename) {
          $(widget).find(".progress-bar").css("width", "0%");
          $(widget).find(".progress").show();
          $(widget).find(".preview-area").hide();
          $(widget).find(".missing-area").hide();
          return $(widget).find(".uploader-buttons").hide();
        },
        onComplete: function(id, filename, json) {
          if (json.status === "error") {
            file_completed = false;
            myfilename = null;
            $(widget).find(".upload-area").show();
            $(widget).find(".progress").hide();
            $(widget).find(".uploader-buttons").show();
            return false;
          }
          if (json.status === "success") {
            file_completed = true;
            $("#" + field_id).val(json.asset_id);
            if (json.url && !autosubmit) {
              $(widget).find(".preview-area img").attr("src", json.url);
              $(widget).find(".progress").hide();
              $(widget).find(".preview-area").show();
            }
            if (json.redirect) {
              window.location = json.redirect;
              return;
            }
            if (json.parent_redirect) {
              window.parent.window.location = json.parent_redirect;
              window.close();
              return;
            }
            if (autosubmit) {
              $(widget).closest("form").submit();
              return void 0;
            }
            $(widget).find(".revertbutton").show();
            $(widget).find(".deletebutton").hide();
            $(widget).find(".upload-area").show();
            $(widget).find(".progress").hide();
            return $(widget).find(".uploader-buttons").show();
          }
        }
      });
      $(this).find(".deletebutton").click(function() {
        $(widget).find(".preview-area img").attr("src", "");
        $(widget).find(".preview-area").hide();
        if (!original_id) {
          $(widget).find(".missing-area").show();
        }
        $(widget).find(".deletebutton").hide();
        $(widget).find(".revertbutton").show();
        $("#" + field_id).val("");
        return false;
      });
      return $(this).find(".revertbutton").click(function() {
        $(widget).find(".revertbutton").hide();
        $(widget).find(".preview-area img").attr("src", preview_url);
        $("#" + field_id).val(original_id);
        if (!original_id) {
          $(widget).find(".preview-area img").attr("src", "");
          $(widget).find(".preview-area").hide();
          $(widget).find(".deletebutton").hide();
          $(widget).find(".missing-area").show();
        } else {
          $(widget).find(".preview-area").show();
          $(widget).find(".deletebutton").show();
        }
        return false;
      });
    };
    $(this).each(init);
    return this;
  };

  $(document).ready(function() {
    return $(".upload-widget").uploader();
  });

}).call(this);
