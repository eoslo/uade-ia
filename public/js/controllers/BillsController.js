'use strict';

angular.module('PaychecksApp')

.controller('BillsController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http, ) {
    $scope.bills = [];
    $scope.bill_id = null;
    $scope.variables ={
        isSubmitting: false,
        showPaymentSuccess: false,
        showPaymentError: false
    };

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientBills();
    };

    $scope.setBillId = function(id) {
        $scope.bill_id = id;
    };

    function getClientBills() {
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