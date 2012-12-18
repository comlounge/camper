
$.fn.uploader = function(opts) {
  var file_completed, init, myfilename, sponsor;
  if (opts == null) opts = {};
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
        if (json.error) {
          file_completed = false;
          myfilename = null;
          alert(json.msg);
          $(widget).find(".upload-area").show();
          $(widget).find(".progressbar").hide();
          return false;
        }
        if (json.success) {
          file_completed = true;
          if (json.redirect) {
            window.location = json.redirect;
            return;
          }
          if (json.parent_redirect) {
            window.parent.window.location = json.parent_redirect;
            window.close();
            return;
          }
          if (postproc) if (postproc === "sponsor") sponsor(widget, json);
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
  $(".upload-widget").uploader();
  $('[data-toggle="editfield"]').click(function() {
    var f, p;
    $(this).hide();
    p = $(this).closest(".editfield");
    return f = $(p).find(".edit").show();
  });
  $('[data-close="editfield"]').live("click", function() {
    var f, p;
    $(this).closest(".edit").hide();
    p = $(this).closest(".editfield");
    f = $(p).find(".value").show();
    return false;
  });
  $('form.edit').live("submit", function() {
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
  return $(".asset-delete").click(function() {
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
});
