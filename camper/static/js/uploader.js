
$.fn.uploader = function(opts) {
  var file_completed, init, myfilename;
  if (opts == null) opts = {};
  file_completed = false;
  myfilename = null;
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
  return $(".upload-widget").uploader();
});
