'use strict';

angular.module('PaychecksApp')

.controller('PayrollController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.payrolls = [];

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientPayrolls();
    };

    function getClientPayrolls() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'client/' + $scope.userId + '/salaries'
        })
        .then(function(result) {
            $scope.payrolls = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])