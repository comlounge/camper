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

  $(function() {
    var layer, map;
    console.log("ok");
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
    $("a.form-submit").click(function() {
      var action, form;
      action = $(this).attr("href");
      form = $(this).closest("form");
      form.attr("action", action);
      console.log(form.attr("method"));
      form.submit();
      return false;
    });
    $("#select-event").change(function() {
      return window.location = $("#select-event option:selected").attr("value");
    });
    map = null;
    layer = null;
    $(".open-location-modal").click(function(e) {
      var accesstoken, lat, lng, title;
      e.preventDefault();
      title = $(this).data("title");
      $("#location-title").text(title);
      accesstoken = $(this).data("accesstoken");
      L.mapbox.accessToken = accesstoken;
      if (!map) {
        map = L.mapbox.map('location-map', 'mapbox.streets');
      }
      lat = $(this).data("lat");
      lng = $(this).data("lng");
      map.setView([lat, lng], 14);
      if (layer) {
        map.removeLayer(layer);
      }
      layer = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {
          title: title,
          description: "",
          "marker-symbol": "star",
          "marker-size": "medium",
          "marker-color": "#f44"
        }
      }).addTo(map);
      return $('#location-modal').modal('show');
    });
    $('#location-modal').on('shown.bs.modal', function() {
      return map.invalidateSize();
    });
    $(".share-on-facebook").click(function(e) {
      var popup, url;
      e.preventDefault();
      url = encodeURIComponent($(this).data("url"));
      console.log(url);
      popup = window.open('//www.facebook.com/sharer.php?u=' + url, 'popupwindow', 'scrollbars=yes,width=800,height=400');
      popup.focus();
      return false;
    });
    return $(".share-on-googleplus").click(function(e) {
      var popup, url;
      e.preventDefault();
      url = encodeURIComponent($(this).data("url"));
      console.log(url);
      popup = window.open('//plus.google.com/share?url=' + url, 'popupwindow', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      popup.focus();
      return false;
    });
  });

  (function() {
    var handleIntent, height, intentRegex, left, m, target, top, width, winHeight, winWidth, windowOptions;
    if (window.__twitterIntentHandler) {
      return;
    }
    intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;
    windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';
    width = 550;
    height = 420;
    winHeight = screen.height;
    winWidth = screen.width;
    handleIntent = function(e) {
      var target;
      e = e || window.event;
      return target = e.target || e.srcElement;
    };
    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }
    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;
        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }
        window.open(target.href, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
    if (document.addEventListener) {
      document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
      document.attachEvent('onclick', handleIntent);
    }
    return window.__twitterIntentHandler = true;
  })();

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

  $(function() {
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

  $(function() {
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

  $(function() {
    return $(".upload-widget").uploader();
  });

}).call(this);
