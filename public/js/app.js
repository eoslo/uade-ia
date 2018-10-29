'use strict';

angular.module('PaychecksApp', [])

// .config(['$locationProvider', function($locationProvider) {
//     $locationProvider.html5Mode(true);
// }])

.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.serverEndpoint = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/';
}])
