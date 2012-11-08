
$.fn.sessionvoter = function(opts) {
  var init;
  if (opts == null) opts = {};
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
  return $("#proposal-cancel").click(function() {
    $("#new-proposal-button").show();
    $("#proposal-form-container").hide();
    return false;
  });
});
