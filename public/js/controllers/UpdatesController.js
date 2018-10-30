'use strict';

angular.module('PaychecksApp')

.controller('UpdatesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.updates = [];
    $scope.form = {
        update: null,
        mount: null,
        employee_id: null
    };

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientUpdates();
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