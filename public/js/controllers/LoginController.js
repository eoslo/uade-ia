'use strict';

angular.module('PaychecksApp')

.controller('LoginController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.form = {
        username: null,
        password: null
    };

    $scope.login = function() {
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signin',
            data: $scope.form
        })
        .then(function(response) {
            $window.location.assign('/employees');
        })
        .catch(function(error) {
            console.log(error);
        });
    };
}])