var TMPL;

TMPL = "<div class=\"sponsor action-container\">\n<a href=\"{{sponsor.url}}\">{{sponsor.image}}</a>\n<div class=\"sponsor-edit actions\">\n    <a \n        data-confirm=\"Sind Sie sicher?\" \n        data-url=\"{{url_for('barcamp_logo_delete', slug = slug)}}\" \n        role=\"button\" \n        class=\"logo-delete btn btn-mini btn-danger\">\n        <i class=\"icon icon-trash icon-white\"></i></a>\n</div>\n</div>";

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
