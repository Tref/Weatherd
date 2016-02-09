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

  $scope.date = Date.now();

  $scope.change = function() {
    // console.log("changed to " + $scope.selectedCity.id);

    var cityID = $scope.selectedCity.id;
    var currentURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=0e2637c065115c67e1528e72cbbfd9cb&id=";
    $http.get(currentURL + cityID ).success(function(data) {
      // console.log(data);
      $scope.selectedCity.weatherData = data;
    });

    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&cnt=7&appid=0e2637c065115c67e1528e72cbbfd9cb&id=";
    $http.get(forecastURL + cityID).success(function(data) {
      // console.log(data);
      $scope.selectedCity.forecastData = data;

      $scope.selectedCity.graphData = $scope.selectedCity.forecastData.list.map(function(obj){
         var dataRow = {};

         var utcSeconds = obj.dt;
         var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
         d.setUTCSeconds(utcSeconds);

         dataRow.date = d;
         dataRow.temp = obj.temp.day;
         return dataRow;
      });

      d3.select("svg").remove();

      var graphData = $scope.selectedCity.graphData;

      // Set up D3 graph
      // Set the dimensions of the canvas / graph
      var margin = {top: 10, right: 10, bottom: 20, left: 30},
          width = 513 - margin.left - margin.right,
          height = 270 - margin.top - margin.bottom;

      // Parse the date / time
      var parseDate = d3.time.format("%d-%b-%y").parse;

      // Set the ranges
      var x = d3.time.scale().range([0, width]);
      var y = d3.scale.linear().range([height, 0]);

      // Define the axes
      var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

      // Define the line
      var valueline = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.temp); })
          .interpolate("basis");

      // Adds the svg canvas
      var svg = d3.select("#chart")
          .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
          .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


        x.domain(d3.extent($scope.selectedCity.graphData, function(d) { return d.date; }));
        y.domain([
          d3.min($scope.selectedCity.graphData, function(d) { return d.temp; }) - 20,
          d3.max($scope.selectedCity.graphData, function(d) { return d.temp; }) + 10
          ]);
        // y.domain([0, 100]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline($scope.selectedCity.graphData));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
              .attr("x", 432)
              .attr("dx", ".71em")
              .style("text-anchor", "end")
              .text("Date");
;;

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Temp (°F)");
;

    // });




















    });
    $scope.selectedCity.id = cityID;



























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
