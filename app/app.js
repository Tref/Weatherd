'use strict';

// Declare app level module which depends on views, and components
angular.module('weatheredApp', [
  'ui.bootstrap',
  'ngRoute',
  'weatheredApp.view1',
  'weatheredApp.view2',
  'weatheredApp.version',
  'weatheredApp.citiesController'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


// controller('CityListCtrl', function ($scope) {
//   $scope.cities = [
//     {'name': 'New York', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
//     {'name': 'Chicago', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
//     {'name': 'Seattle', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
//     {'name': 'Houston', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
//     {'name': 'San Diego', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80}
//   ];
// });
