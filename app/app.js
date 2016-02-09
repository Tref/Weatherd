'use strict';

// Declare app level module which depends on views, and components
angular.module('weatheredApp', [
  'ui.bootstrap',
  'ngRoute',
  'weatheredApp.view1',
  'weatheredApp.citiesController'
]).
config(['$routeProvider', function($routeProvider) {
  // $routeProvider.otherwise({redirectTo: '/view1'});
}]);
