// Generated by CoffeeScript 1.8.0
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

$(document).ready(function() {
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
