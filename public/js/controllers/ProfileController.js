'use strict';

angular.module('PaychecksApp')

.controller('ProfileController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.form = {
        id: null,
        password: null,
        name: null,
        address: null,
        iva: null,
        gross_income: null,
        pay_date: null
    };

    $scope.variables = {
        isSubmitting: false,
        showError: false,
        showSuccess: false,
        showDeleteError: false,
    };

    $scope.getUser = function(userString) {
        var user = JSON.parse(userString);
        $scope.form = {
            id: user._id,
            password: null,
            name: user.name,
            address: user.address,
            iva: user.iva,
            gross_income: user.gross_income,
            pay_date: '' + user.pay_date,
            cbu: user.cbu
        };
    };

    $scope.updateClient = function() {
        $scope.variables.isSubmitting = true;
        $http({
            method: 'PUT',
            url: $rootScope.serverEndpoint + 'client',
            data: $scope.form
        })
        .then(function(result) {
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn').trigger('click');
            $scope.variables.showSuccess = true;
            $timeout( function(){
                $scope.variables.showSuccess = false;
            }, 3000 );
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showError = true;
            $timeout( function(){
                $scope.variables.showError = false;
            }, 3000 );
            console.log(error);
        });
    }

    $scope.deleteClient = function() {
        $scope.variables.isSubmitting = true;
        $http({
            method: 'DELETE',
            url: $rootScope.serverEndpoint + 'client',
            data: {
                "id": $scope.form.id
            },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn3').trigger('click');
            $window.location.assign('/login');
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showDeleteError = true;
            $timeout( function(){
                $scope.variables.showDeleteError = false;
            }, 3000 );
            console.log(error);
        });
    };
}])