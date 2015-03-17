
$.fn.uploader = function(opts) {
  var file_completed, init, myfilename;
  if (opts == null) opts = {};
  file_completed = false;
  myfilename = null;
  init = function() {
    var delete_url, field_id, original_id, postproc, preview_url, upload_url, uploader, widget;
    widget = this;
    postproc = $(this).data("postproc");
    preview_url = $(this).data("preview-url");
    upload_url = $(this).data("upload-url");
    delete_url = $(this).data("delete-url");
    field_id = $(this).data("id");
    original_id = $("#" + field_id).val();
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
          $(widget).find(".revertbutton").show();
          $(widget).find(".deletebutton").hide();
          $("#" + field_id).val(json.asset_id);
          if (json.url) {
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
          $(widget).find(".upload-area").show();
          $(widget).find(".progress").hide();
          return $(widget).find(".uploader-buttons").show();
        }
      }
    });
    $(this).find(".deletebutton").click(function() {
      $(widget).find(".preview-area img").attr("src", "");
      $(widget).find(".preview-area").hide();
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
