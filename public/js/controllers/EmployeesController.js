'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];
    $scope.updateForm = {
        update: null,
        mount: null,
        employee_id: null
    };

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
                    birth_date: $scope.employees[i].birth_date,
                    dni: $scope.employees[i].dni,
                    payroll_type: $scope.employees[i].payroll_type,
                    gross_salary: $scope.employees[i].gross_salary,
                    salary_per_hour: $scope.employees[i].salary_per_hour,
                    estimated_hours: $scope.employees[i].estimated_hours,
                    deductions: $scope.employees[i].deductions,
                    client_id: $scope.userId
                }
            }
        }
    };

    $scope.registerEmployee = function() {
        $scope.form.client_id = $scope.userId;
        if($scope.form.employee_id) {
            var method = 'PUT';
        } else {
            var method = 'POST'
        }

        $http({
            method: method,
            url: $rootScope.serverEndpoint + 'employee',
            data: $scope.form
        })
        .then(function(response) {
            getClientEmployees();
            angular.element('#close-modal-btn').trigger('click');
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    $scope.newUpdate = function() {
        $scope.updateForm.employee_id = $scope.form.employee_id;
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'update',
            data: $scope.updateForm
        })
        .then(function(response) {
            getClientEmployees();
            angular.element('#close-modal-btn2').trigger('click');
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    $scope.deleteEmployee = function() {
        $http({
            method: 'DELETE',
            url: $rootScope.serverEndpoint + 'employee',
            data: {
                employee_id: $scope.form.employee_id
            }
        })
            .then(function(response) {
                getClientEmployees();
                angular.element('#close-modal-btn2').trigger('click');
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
            birth_date: null,
            dni: null,
            payroll_type: 'monthly',
            gross_salary: null,
            salary_per_hour: null,
            client_id: null,
            estimated_hours: null
        }
    }
}])