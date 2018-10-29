'use strict';

angular.module('PaychecksApp')

.controller('LoginController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.form = {
        username: null,
        password: null
    };

    $scope.login = function() {
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signin',
            data: $scope.form
        });
    };
}])