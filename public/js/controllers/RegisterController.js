'use strict';

angular.module('PaychecksApp')

.controller('RegisterController', ['$scope', '$rootScope', '$http', '$window', '$timeout', function ($scope, $rootScope, $http, $window, $timeout) {
    $scope.variables = {
        isSubmitting: false,
        showError: false
    }
    
    $scope.form = {
        username: null,
        password: null,
        name: null,
        person_type: null,
        address: null,
        cuit: null,
        iva: null,
        gross_income: null,
        pay_date: null,
        cbu: null
    };

    $scope.registerClient = function() {
        $scope.variables.isSubmitting = true;
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signup',
            data: $scope.form
        })
        .then(function(response) {
            $scope.variables.isSubmitting = false;
            $window.location.assign('/login');
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showError = true;
            $timeout( function(){
                $scope.variables.showError = false;
            }, 3000 );
            console.log(error);
        });
    };
}])