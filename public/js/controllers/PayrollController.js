'use strict';

angular.module('PaychecksApp')

.controller('PayrollController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.payrolls = [];
    $scope.totalToPay = null;
    $scope.pay_date = null;
    $scope.bill_id = null;

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
            $scope.payrolls = result.data;
            for (var i = 0; i < $scope.payrolls.length; i++) {
                $scope.totalToPay = $scope.totalToPay + $scope.payrolls[i].salary.net_income;
            }
            $scope.pay_date = $scope.payrolls[0].salary.pay_date;
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])