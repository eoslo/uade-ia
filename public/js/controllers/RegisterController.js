'use strict';

angular.module('PaychecksApp')

.controller('RegisterController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
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
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signup',
            data: $scope.form
        })
        .then(function(response) {
            $window.location.assign('/login');
        })
        .catch(function(error) {
            console.log(error);
        });
    };
}])