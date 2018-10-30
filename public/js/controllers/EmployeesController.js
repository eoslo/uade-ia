'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.getUserId = function(userId) {
        $scope.userId = userId;
    }
    $scope.form = {
        name: null,
        address: null,
        birth_day: null,
        dni: null,
        payroll_type: 'monthly',
        gross_salary: null,
        salary_per_hour: null,
    }

    $scope.registerEmployee = function() {
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'signup',
            data: $scope.form
        })
            .then(function(response) {
                $window.location.assign('/employee');
            })
            .catch(function(error) {
                console.log(error);
            });
    };
}])