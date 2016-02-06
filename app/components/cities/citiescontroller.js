'use strict';

angular.module('weatheredApp.citiesController', [])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('CityListCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.cities = [
    {'name': 'New York',  "id":5128581},
    {'name': 'Chicago',   "id":4887398},
    {'name': 'Seattle',   "id":5809844},
    {'name': 'Houston',   "id":4699066},
    {'name': 'San Diego', "id":5391811}
  ];

  $scope.orderProp = 'name';

  $scope.change = function() {
    console.log("changed to " + $scope.selectedCity.id);
    $http.get('http://api.openweathermap.org/data/2.5/weather?id=' + $scope.selectedCity.id + '&units=imperial&appid=0e2637c065115c67e1528e72cbbfd9cb').success(function(data) {
      console.log(data);
      $scope.selectedCity = data;
    });
  };

}]);

// .controller('View1Ctrl', [function() {
//
// }]);

// http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=0e2637c065115c67e1528e72cbbfd9cb
// {"id":5128581,"name":"New York","country":"US","coord":{"lon":-74.005966,"lat":40.714272}}
// {"id":4887398,"name":"Chicago","country":"US","coord":{"lon":-87.650047,"lat":41.850029}}
// {"id":4699066,"name":"Houston","country":"US","coord":{"lon":-95.363274,"lat":29.763281}}
// {"id":5391811,"name":"San Diego","country":"US","coord":{"lon":-117.157257,"lat":32.715328}}
// {"id":5809844,"name":"Seattle","country":"US","coord":{"lon":-122.332069,"lat":47.606209}}
// {
//   "coord":{"lon":-74.01,"lat":40.71},
//   "weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],
//   "base":"cmc stations",
//   "main":{"temp":14.62,"pressure":1027.17,"humidity":67,"temp_min":14.62,"temp_max":14.62,"sea_level":1042.18,"grnd_level":1027.17},
//   "wind":{"speed":2.29,"deg":283.502},
//   "clouds":{"all":0},
//   "dt":1454753557,
//   "sys":{"message":0.0043,"country":"US","sunrise":1454760054,"sunset":1454797192},
//   "id":5128581,
//   "name":"New York",
//   "cod":200
// }
