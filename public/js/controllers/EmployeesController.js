'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];
    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientEmployees();
    }

    function getClientEmployees() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'client/' + $scope.userId + '/employees'
        })
        .then(function(result) {
            $scope.employees = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])