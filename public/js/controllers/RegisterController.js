'use strict';

angular.module('PaychecksApp')

.controller('RegisterController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.form = {
        username: null,
        password: null,
        name: null,
        person_type: null,
        address: null,
        cuit: null,
        iva: null,
        gross_income: null
    };

    $scope.registerClient = function() {
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signup',
            data: $scope.form
        });
    };
}])