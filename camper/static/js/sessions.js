
$.fn.sessionvoter = function(opts) {
  var init;
  if (opts == null) opts = {};
  console.log("init");
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
          return $(that).find("a.vote").removeClass("inactive").addClass("active");
        }
      });
      return false;
    });
  };
  $(this).each(init);
  return this;
};

$(document).ready(function() {
  return $(".votecontainer").sessionvoter();
});
