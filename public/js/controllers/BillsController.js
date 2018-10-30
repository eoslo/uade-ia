'use strict';

angular.module('PaychecksApp')

.controller('BillsController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.updates = [];

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientBills();
    };

    function getClientBills() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'billing/' + $scope.userId
        })
        .then(function(result) {
            $scope.updates = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])