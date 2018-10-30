'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];
    initEmployeeForm();

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        $scope.form.client_id = userId;
        getClientEmployees();
    };

    $scope.newEmployee = function() {
        initEmployeeForm();
    };

    $scope.getEmployee = function(id) {
        for (var i = 0; i < $scope.employees.length; i++) {
            if($scope.employees[i]._id == id) {
                $scope.form = {
                    employee_id: id,
                    name: $scope.employees[i].name,
                    address: $scope.employees[i].address,
                    birth_day: $scope.employees[i].birth_day,
                    dni: $scope.employees[i].dni,
                    payroll_type: $scope.employees[i].payroll_type,
                    gross_salary: $scope.employees[i].gross_salary,
                    salary_per_hour: $scope.employees[i].salary_per_hour,
                    client_id: $scope.userId
                }
            }
        }
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

    function initEmployeeForm() {
        $scope.form = {
            name: null,
            address: null,
            birth_day: null,
            dni: null,
            payroll_type: 'monthly',
            gross_salary: null,
            salary_per_hour: null,
            client_id: null
        }
    }
}])