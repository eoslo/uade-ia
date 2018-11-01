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

    $scope.payBill = function() {
        $scope.variables.isSubmitting = true;
        var data = {
            clientId: $scope.userId,
            billId: $scope.bill_id
        };

        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + '/billing/pay-bill',
            data: data
        })
        .then(function(response) {
            getClientBills();
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn').trigger('click');
            $scope.variables.showPaymentSuccess = true;
            $timeout( function(){
                $scope.variables.showPaymentSuccess = false;
            }, 3000 );
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showPaymentError = true;
            $timeout( function(){
                $scope.variables.showPaymentError = false;
            }, 3000 );
            console.log(error);
        });
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