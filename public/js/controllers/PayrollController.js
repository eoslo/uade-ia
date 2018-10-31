'use strict';

angular.module('PaychecksApp')

.controller('PayrollController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.bills = [];

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientPayrolls();
    };

    function getClientPayrolls() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'billing/' + $scope.userId
        })
        .then(function(result) {
            $scope.bills = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])