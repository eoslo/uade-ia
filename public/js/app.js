'use strict';

angular.module('PaychecksApp', [])
.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.serverEndpoint = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/';
}])
