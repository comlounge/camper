app = angular.module('barcamptool', []);

app.config ($interpolateProvider) ->
    $interpolateProvider
    .startSymbol('{[{')
    .endSymbol('}]}')


app.controller 'SessionBoardCtrl', ($scope, $http) ->
    $http.get("sessionboard/data").success (data) ->
        $scope.rooms = data.rooms
        $scope.timeslots = data.timeslots

    $scope.modalMode = "add"
    $scope.room_idx = null # for remembering which room to update

    $scope.reset_room = () ->

        $scope.room_form.$setPristine()
        $scope.room_form.$setUntouched()
        $scope.room = angular.copy($scope.room)
        document.getElementById("add-room-form").reset()

    $scope.add_room_form = () ->
        console.log "okok"
        $scope.modalMode = "add"
        document.getElementById("add-room-form").reset()
        $('#add-room-modal').modal('show')
        return

    $scope.add_room = () ->
        if $scope.room_form.$error.$invalid
            return
        $scope.rooms.push($scope.room)

        $scope.room_form.$setPristine()
        $scope.room_form.$setUntouched()
        $scope.room = angular.copy($scope.room)
        document.getElementById("add-room-form").reset()
        $('#add-room-modal').modal('hide')
        return

    $scope.edit_room = (idx) ->
        $scope.modalMode = "edit"
        $scope.room = angular.copy($scope.rooms[idx])
        $scope.room_idx = idx
        $('#add-room-modal').modal('show')
        return
    
    $scope.update_room = () ->
        if $scope.room_form.$error.$invalid
            return
        $scope.rooms[$scope.room_idx] = $scope.room
        $('#add-room-modal').modal('hide')
        $scope.reset_room()

    $scope.delete_room = (idx) ->
        $scope.rooms.splice(idx,1)

    $scope.$watch 'rooms', (newValue, oldValue) ->
        console.log "rooms changes"

    $scope.room = {
        name: '',
        description: '',
        capacity: ''
    }
        
          
INTEGER_REGEXP = ///^
    [0-9]+
    $///i

# we only catch . here, the rest is done by the default validator
app.directive('integer', () ->
    return {
        restrict: "AE",
        require: 'ngModel',
        link: ($scope, elm, attrs, ctrl) ->
            ctrl.$validators.integer = (modelValue, viewValue) ->
                if ctrl.$isEmpty(modelValue)
                    return true
                if viewValue.match INTEGER_REGEXP
                    return true
                
                # it is invalid
                return false
    }
)

