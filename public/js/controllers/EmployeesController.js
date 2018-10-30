'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];

    $scope.form = {
        name: null,
        address: null,
        birth_day: null,
        dni: null,
        payroll_type: 'monthly',
        gross_salary: null,
        salary_per_hour: null,
        client_id: null,
        estimated_hours: null
    }

    $scope.getUserId = function(userId) {
        $scope.form.client_id = userId;
        getClientEmployees();
    };

    $scope.registerEmployee = function() {
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'employee',
            data: $scope.form
        })
        .then(function(response) {
            getClientEmployees();
        })
        .catch(function(error) {
            console.log(error);
        });
    };

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
}])