
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
    var uploader, url;
    url = $("#uploadform").attr("action");
    return uploader = new qq.FileUploaderBasic({
      button: $("#uploadbutton")[0],
      action: url,
      multiple: false,
      sizeLimit: 200 * 1024 * 1024,
      onProgress: function(id, filename, loaded, total) {
        var perc;
        perc = parseInt(Math.floor(loaded / total * 100)) + "%";
        return $("#progressbar .progress").css("width", perc);
      },
      onSubmit: function(id, filename) {
        $("#progressbar").show();
        $("#uploadsuccess").hide();
        return $("#uploaderror").hide();
      },
      onComplete: function(id, filename, json) {
        if (json.error) {
          file_completed = false;
          myfilename = null;
          $("#uploadbutton").show();
          $("#progressbar").hide();
          return false;
        }
        if (json.success) {
          file_completed = true;
          myfilename = json.filename;
          $("#uploadbutton").show();
          $("#uploadsuccess").show();
          $("#progressbar").hide();
          return $('#filetable tr:last').after(json.html);
        }
      }
    });
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  return $("#uploadbutton").uploader();
});
