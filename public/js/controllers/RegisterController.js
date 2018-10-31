'use strict';

angular.module('PaychecksApp')

.controller('RegisterController', ['$scope', '$rootScope', '$http', '$window', '$timeout', function ($scope, $rootScope, $http, $window, $timeout) {
    $scope.isSubmitting = false;
    $scope.showError = false;
    $scope.form = {
        username: null,
        password: null,
        name: null,
        person_type: null,
        address: null,
        cuit: null,
        iva: null,
        gross_income: null,
        pay_date: null
    };

    $scope.registerClient = function() {
        $scope.isSubmitting = true;
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signup',
            data: $scope.form
        })
        .then(function(response) {
            $scope.isSubmitting = true;
            $window.location.assign('/login');
        })
        .catch(function(error) {
            $scope.showError = true;
            $timeout( function(){
                $scope.showError = false;
            }, 3000 );
            console.log(error);
        });
    };
}])