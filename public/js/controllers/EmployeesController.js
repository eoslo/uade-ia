'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];
    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientEmployees();
    }

    function getClientEmployees() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'client/' + $scope.userId + '/employees'
        })
        .then(function(result) {
            $scope.employees = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
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