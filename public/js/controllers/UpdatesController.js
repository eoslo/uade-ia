'use strict';

angular.module('PaychecksApp')

.controller('UpdatesController', ['$scope', '$rootScope', '$http', '$window', '$timeout', function ($scope, $rootScope, $http, $window, $timeout) {
    $scope.updates = [];
    $scope.variables ={
        isSubmitting: false,
        showDeleteSuccess: false,
        showDeleteError: false
    };

    $scope.getUserId = function(userId) {
        $scope.userId = userId;
        getClientUpdates();
    };

    $scope.setUpdateId = function(id) {
        $scope.updateId = id;
    };

    $scope.deleteUpdate = function() {
        $scope.variables.isSubmitting = true;
        $http({
            method: 'DELETE',
            url: $rootScope.serverEndpoint + 'update',
            data: {
                "id": $scope.updateId
            },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            getClientEmployees();
            $scope.variables.isSubmitting = false;
            angular.element('#close-modal-btn').trigger('click');
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

    function getClientUpdates() {
        $http({
            method: 'GET',
            url: $rootScope.serverEndpoint + 'client/' + $scope.userId + '/updates'
        })
        .then(function(result) {
            $scope.updates = result.data
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}])