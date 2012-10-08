
$.fn.uploader = function(opts) {
  var file_completed, init, myfilename, on_upload;
  if (opts == null) opts = {};
  file_completed = false;
  myfilename = null;
  on_upload = function(filename) {
    $("#uploadbutton").hide();
    return $("#progressbar").show();
  };
  init = function() {
    var uploader, url, widget;
    url = $(this).attr("action");
    widget = this;
    return uploader = new qq.FileUploaderBasic({
      button: $(widget).find(".uploadbutton")[0],
      action: url,
      multiple: false,
      sizeLimit: 200 * 1024 * 1024,
      onProgress: function(id, filename, loaded, total) {
        var perc;
        perc = parseInt(Math.floor(loaded / total * 100)) + "%";
        return $(widget).find(".progressbar .progress").css("width", perc);
      },
      onSubmit: function(id, filename) {
        $(widget).find(".progressbar").show();
        $(widget).find(".uploadsuccess").hide();
        return $(widget).find(".uploaderror").hide();
      },
      onComplete: function(id, filename, json) {
        if (json.error) {
          file_completed = false;
          myfilename = null;
          $(widget).find(".uploadbutton").show();
          $(widget).find(".progressbar").hide();
          return false;
        }
        if (json.success) {
          file_completed = true;
          if (json.redirect) {
            window.location = json.redirect;
            return;
          }
          myfilename = json.filename;
          $(widget).find(".uploadbutton").show();
          $(widget).find(".uploadsuccess").show();
          return $(widget).find(".progressbar").hide();
        }
      }
    });
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  $(".uploadform").uploader();
  return $(".logo-delete").click(function() {
    var confirm_message, url;
    confirm_message = $(this).data("confirm");
    url = $(this).data("url");
    if (confirm(confirm_message)) {
      return $.ajax({
        url: url,
        type: "POST",
        data: {
          method: "delete"
        },
        success: function() {
          return window.location.reload();
        }
      });
    } else {

    }
  });
});
