'use strict';

angular.module('PaychecksApp')

.controller('EmployeesController', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $scope.employees = [];
    $scope.variables = {
        isSubmitting: false,
        showEmployeeError: false,
        showEmployeeSuccess: false,
        showUpdateError: false,
        showUpdateSuccess: false,
        showDeleteError: false,
        showDeleteSuccess: false
        
    };
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
        $scope.variables.isSubmitting = true;
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
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn').trigger('click');
            $scope.variables.showEmployeeSuccess = true;
            $timeout( function(){
                $scope.variables.showEmployeeSuccess = false;
            }, 3000 );
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showEmployeeError = true;
            $timeout( function(){
                $scope.variables.showEmployeeError = false;
            }, 3000 );
            console.log(error);
        });
    };

    $scope.newUpdate = function() {
        $scope.variables.isSubmitting = true;
        $scope.updateForm.employee_id = $scope.form.employee_id;
        $http({
            method: 'POST',
            url: $rootScope.serverEndpoint + 'update',
            data: $scope.updateForm
        })
        .then(function(response) {
            getClientEmployees();
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn2').trigger('click');
            $scope.variables.showUpdateSuccess = true;
            $timeout( function(){
                $scope.variables.showUpdateSuccess = false;
            }, 3000 );
        })
        .catch(function(error) {
            $scope.variables.isSubmitting = false;
            $scope.variables.showUpdateError = true;
            $timeout( function(){
                $scope.variables.showUpdateError = false;
            }, 3000 );
            console.log(error);
        });
    };

    $scope.deleteEmployee = function() {
        $scope.variables.isSubmitting = true;
        $http({
            method: 'DELETE',
            url: $rootScope.serverEndpoint + 'employee',
            data: {
                "employee_id": $scope.form.employee_id
            },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
            .then(function(response) {
                getClientEmployees();
                $scope.variables.isSubmitting = false;
                angular.element('#close-modal-btn3').trigger('click');
                $scope.variables.showDeleteSuccess = true;
                $timeout( function(){
                    $scope.variables.showDeleteSuccess = false;
                }, 3000 );
            })
            .catch(function(error) {
                $scope.variables.isSubmitting = false;
                $scope.variables.showDeleteError = true;
                $timeout( function(){
                    $scope.variables.showDeleteError = false;
                }, 3000 );
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