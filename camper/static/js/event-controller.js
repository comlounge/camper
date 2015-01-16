// Generated by CoffeeScript 1.8.0
$(document).ready(function() {
  $("#show-add-form").click(function() {
    $("#add-form-view").show();
    return $("#show-add-form").hide();
  });
  $("#cancel-add-form").click(function() {
    $("#add-form-view").hide();
    $("#show-add-form").show();
    return false;
  });
  $("#start_time").timepicker({
    timeFormat: "G:i"
  });
  $("#end_time").timepicker({
    timeFormat: "G:i"
  });
  $('#date').datepicker({
    'format': 'd.m.yyyy',
    'autoclose': true
  });
  $("#own_location").change(function() {
    if (this.checked) {
      return $("#location-view").show();
    } else {
      return $("#location-view").hide();
    }
  });
  return $(".delete-event").click(function() {
    var d, url;
    d = $(this).data("event");
    url = $(this).data("url");
    $.ajax({
      url: url,
      type: "POST",
      data: {
        method: "delete",
        event: d,
        success: function() {
          return window.location.reload();
        }
      }
    });
    return false;
  });
});
