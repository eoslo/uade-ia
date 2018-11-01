'use strict';

angular.module('PaychecksApp')

.controller('LoginController', ['$scope', '$rootScope', '$http', '$window', '$timeout', function ($scope, $rootScope, $http, $window, $timeout) {
    $scope.form = {
        username: null,
        password: null
    };

    $scope.showError = false;
    $scope.isSubmitting = false;

    $scope.login = function() {
        $scope.isSubmitting = true;
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signin',
            data: $scope.form
        })
        .then(function(response) {
            $scope.isSubmitting = false;
            $window.location.assign('/employees');
        })
        .catch(function(error) {
            $scope.isSubmitting = false;
            $scope.showError = true;
            $timeout( function(){
                $scope.showError = false;
            }, 3000 );
            console.log(error);
        });
    };
}])