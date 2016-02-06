'use strict';

angular.module('weatheredApp.citiesController', [])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('CityListCtrl', function($scope) {
  $scope.cities = [
    {'name': 'New York', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
    {'name': 'Chicago', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
    {'name': 'Seattle', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
    {'name': 'Houston', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80},
    {'name': 'San Diego', 'high': 73, 'low': 54, 'pressure': 120, 'humidity': 80}
  ];
});
