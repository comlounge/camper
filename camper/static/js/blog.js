
$(document).ready(function() {
  return $(".delete-entry").click(function() {
    var d, url;
    d = $(this).data("entry");
    url = $(this).data("url");
    console.log(url);
    console.log(d);
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
