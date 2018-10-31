'use strict';

angular.module('PaychecksApp')

.controller('UpdatesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.updates = [];
    $scope.form = {
        update: null,
        mount: null,
        employee_name: null,
    };

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientUpdates();
    };

    $scope.setUpdateId = function(id) {
        $scope.updateId = id;
    };

    $scope.deleteEmployee = function() {
        $http({
            method: 'DELETE',
            url: $rootScope.serverEndpoint + 'update',
            data: { id: $scope.updateId },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            getClientUpdates();
            angular.element('#close-modal-btn').trigger('click');
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    function getClientUpdates() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'client/' + $scope.userId + '/updates'
        })
        .then(function(result) {
            $scope.updates = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])