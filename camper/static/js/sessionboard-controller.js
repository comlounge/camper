// Generated by CoffeeScript 1.4.0
var INTEGER_REGEXP, app, guid, s4;

s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

guid = function() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app = angular.module('barcamptool', ['ui.timepicker', 'ui.sortable', 'ngTagsInput', 'ui.autocomplete']);

app.filter('slice', function() {
  return function(arr, start, end) {
    if (arr) {
      return arr.slice(start, end);
    } else {
      return arr;
    }
  };
});

app.config(function($interpolateProvider) {
  return $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.controller('SessionBoardCtrl', function($scope, $http, $q, $filter) {
  $scope.sessionplan = {};
  $scope.sortableOptions = {
    axis: 'x',
    items: "td",
    placeholder: "sortable-placeholder",
    containment: 'parent',
    cancel: ".not-sortable",
    opacity: 0.5
  };
  $scope.room = {
    name: '',
    description: '',
    capacity: ''
  };
  $scope.timeslot = {
    time: null,
    blocked: false,
    reason: ''
  };
  $scope.timePickerOptions = {
    step: 15,
    timeFormat: 'G:i',
    minTime: "00:00",
    maxTime: "24:00",
    appendTo: 'body'
  };
  $http.get("sessionboard/data").success(function(data) {
    $scope.rooms = data.rooms;
    $scope.rooms.unshift({});
    $scope.timeslots = data.timeslots;
    $scope.participants = data.participants;
    $scope.proposals = data.proposals;
    return $scope.sessionplan = data.sessions;
  });
  $scope.roomModalMode = "add";
  $scope.room_idx = null;
  $scope.add_room_form = function() {
    $scope.roomModalMode = "add";
    $scope.room = {};
    document.getElementById("add-room-form").reset();
    $('#add-room-modal').modal('show');
    $('#room-form-name').focus();
    return void 0;
  };
  $scope.add_room = function() {
    if ($scope.room_form.$error.$invalid) {
      return;
    }
    $scope.room.id = guid();
    $scope.rooms.push($scope.room);
    $scope.room = angular.copy($scope.room);
    $('#add-room-modal').modal('hide');
  };
  $scope.edit_room = function(idx) {
    $scope.roomModalMode = "edit";
    $scope.room = angular.copy($scope.rooms[idx]);
    $scope.room_idx = idx;
    $('#add-room-modal').modal('show');
  };
  $scope.update_room = function() {
    if ($scope.room_form.$error.$invalid) {
      return;
    }
    $scope.rooms[$scope.room_idx] = $scope.room;
    $('#add-room-modal').modal('hide');
  };
  $scope.delete_room = function(idx) {
    $scope.rooms.splice(idx, 1);
    return void 0;
  };
  $scope.timeslotModalMode = "add";
  $scope.timeslot_idx = null;
  $scope.add_timeslot_form = function() {
    var d, dd, last_time, new_time;
    $scope.timeslotModalMode = "add";
    document.getElementById("add-timeslot-form").reset();
    if ($scope.timeslots.length) {
      last_time = new Date(angular.copy($scope.timeslots[$scope.timeslots.length - 1]).time);
      last_time = new Date(last_time.getTime() + last_time.getTimezoneOffset() * 60000);
      new_time = new Date(last_time.getTime() + 60 * 60000);
      $("#timepicker").timepicker('setTime', new_time);
      $scope.timeslot.time = new_time;
    } else {
      d = Date.now();
      dd = new Date();
      dd.setTime(d);
      dd.setHours(9);
      dd.setMinutes(0);
      dd.setSeconds(0);
      $("#timepicker").timepicker('option', 'minTime', '00:00');
      $("#timepicker").timepicker('setTime', dd);
      $scope.timeslot.time = dd;
    }
    $('#add-timeslot-modal').modal('show');
    $('#timepicker').focus();
  };
  $scope.add_timeslot = function() {
    var d, localOffset, now, utc;
    if ($scope.timeslot_form.$error.$invalid) {
      return;
    }
    d = $scope.timeslot.time;
    now = new Date();
    localOffset = now.getTimezoneOffset();
    utc = new Date(d.getTime() - localOffset * 60000);
    $scope.timeslot.time = utc;
    $scope.timeslots.push($scope.timeslot);
    $scope.timeslots = _.sortBy($scope.timeslots, function(item) {
      var t;
      t = item.time;
      if (typeof t === 'string') {
        return new Date(t);
      }
      return t;
    });
    $scope.timeslot = angular.copy($scope.timeslot);
    $('#add-timeslot-modal').modal('hide');
    $scope.timeslot.blocked = false;
    $scope.timeslot.reason = "";
  };
  $scope.delete_timeslot = function(idx) {
    $scope.timeslots.splice(idx, 1);
    return void 0;
  };
  $scope.session_id = null;
  $scope.session = {};
  $scope.add_session = function(slot, room) {
    var d, fd, idx, selectedItem;
    d = new Date(slot.time);
    fd = $filter('date')(d, 'hh:mm', 'UTC');
    idx = $scope.session_idx = room.id + "@" + fd;
    if ($scope.sessionplan.hasOwnProperty(idx)) {
      $scope.session = angular.copy($scope.sessionplan[idx]);
    } else {
      $scope.session = {
        sid: guid(),
        slug: '',
        _id: idx,
        title: '',
        description: '',
        moderator: []
      };
    }
    $('#edit-session-modal').modal('show');
    $("#ac-title").focus();
    selectedItem = null;
    $("#ac-title").autocomplete({
      source: $scope.proposals,
      appendTo: '#edit-session-modal',
      open: function(event, ui) {
        return selectedItem = null;
      },
      select: function(event, ui) {
        return selectedItem = ui;
      },
      change: function(event, ui) {
        var selected, user_id, value;
        selected = false;
        if (selectedItem) {
          value = selectedItem.item.value;
        } else {
          return;
        }
        user_id = selectedItem.item.user_id;
        return $scope.$apply(function() {
          var user, _i, _len, _ref;
          _ref = $scope.participants;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            user = _ref[_i];
            if (user._id === user_id) {
              $scope.session.moderator = [user];
              break;
            }
          }
          $scope.session.title = value;
          return $scope.session.description = selectedItem.item.description;
        });
      }
    });
  };
  $scope.update_session = function() {
    var idx, orig_slug, session, sid, slug, suffix, _ref;
    idx = $scope.session._id;
    $scope.session = angular.copy($scope.session);
    orig_slug = $scope.session.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    suffix = 0;
    slug = orig_slug + '';
    while (true) {
      _ref = $scope.sessionplan;
      for (sid in _ref) {
        session = _ref[sid];
        if (session.slug === slug && idx !== sid) {
          suffix++;
          slug = orig_slug + suffix;
          break;
        }
      }
      break;
    }
    $scope.session.slug = slug;
    $scope.sessionplan[idx] = $scope.session;
    $('#edit-session-modal').modal('hide');
  };
  $scope.get_session_id = function(slot, room) {
    var d, fd, idx;
    d = new Date(slot.time);
    fd = $filter('date')(d, 'hh:mm', 'UTC');
    idx = room.id + "@" + fd;
    return idx;
  };
  $scope.loadParticipants = function() {
    var deferred;
    deferred = $q.defer();
    deferred.resolve($scope.participants);
    return deferred.promise;
  };
  $scope.save_to_server = function() {
    var data, rooms;
    rooms = angular.copy($scope.rooms);
    rooms.splice(0, 1);
    data = {
      rooms: rooms,
      timeslots: $scope.timeslots,
      sessions: $scope.sessionplan
    };
    return $http.post("sessionboard/data", data).success(function(data) {}).error(function(data) {});
  };
  $scope.$watch('rooms', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.save_to_server();
    }
    return void 0;
  }, true);
  $scope.$watch('timeslots', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.save_to_server();
    }
    return void 0;
  }, true);
  return $scope.$watch('sessionplan', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.save_to_server();
    }
    return void 0;
  }, true);
});

INTEGER_REGEXP = /^[0-9]+$/i;

app.directive('integer', function() {
  return {
    restrict: "AE",
    require: 'ngModel',
    link: function($scope, elm, attrs, ctrl) {
      return ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }
        if (viewValue.match(INTEGER_REGEXP)) {
          return true;
        }
        return false;
      };
    }
  };
});
