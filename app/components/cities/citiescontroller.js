'use strict';

angular.module('weatheredApp.citiesController', [])

.controller('CityListCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.cities = [
    {'name': 'New York',  "id":5128581},
    {'name': 'Chicago',   "id":4887398},
    {'name': 'Seattle',   "id":5809844},
    {'name': 'Houston',   "id":4699066},
    {'name': 'San Diego', "id":5391811}
  ];

  $scope.orderProp = 'name';

  var d = new Date();
  var n = d.toDateString();
  $scope.date = n;

  $scope.change = function() {

    var apiKey = "0e2637c065115c67e1528e72cbbfd9cb";
    var cityID = $scope.selectedCity.id;
    var currentURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" +apiKey+ "&id=";
    $http.get(currentURL + cityID ).success(function(data) {
      // console.log(data);
      $scope.selectedCity.weatherData = data;
    });

    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&cnt=7&appid=" +apiKey+ "&id=";
    $http.get(forecastURL + cityID).success(function(data) {
      // console.log(data);
      $scope.selectedCity.forecastData = data;

      $scope.selectedCity.graphData = $scope.selectedCity.forecastData.list.map(function(obj){
         var dataRow = {};

         var utcSeconds = obj.dt;
         var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
         d.setUTCSeconds(utcSeconds);

         dataRow.date = d;
         // calculate average temp
         dataRow.temp = (obj.temp.day + obj.temp.night) / 2;
         dataRow.min = obj.temp.min;
         dataRow.max = obj.temp.max;
         return dataRow;
      });

      // Clear the graph
      d3.select("svg").remove();

      var graphData = $scope.selectedCity.graphData;

      // Set up D3 graph
      // Set the dimensions of the canvas / graph
      var margin = {top: 10, right: 10, bottom: 20, left: 30},
          width = 513 - margin.left - margin.right,
          height = 270 - margin.top - margin.bottom;

      // Set the ranges
      var x = d3.time.scale().range([0, width]);
      var y = d3.scale.linear().range([height, 0]);

      // Define the axes
      var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

      // Define the temp line
      var valueline = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.temp); })
          .interpolate("basis");

      // Define the min line
      var minline = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.min); })
          .interpolate("basis");

      // Define the max line
      var maxline = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.max); })
          .interpolate("basis");

      // Adds the svg canvas
      var svg = d3.select("#chart")
          .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
          .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // Define the min/max values for the axes
        x.domain(d3.extent($scope.selectedCity.graphData, function(d) { return d.date; }));
        y.domain([
          d3.min($scope.selectedCity.graphData, function(d) { return d.min; }) - 5,
          d3.max($scope.selectedCity.graphData, function(d) { return d.max; }) + 5
          ]);


        // Add the temp path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline($scope.selectedCity.graphData));

        // add the min path
        svg.append("path")
            .attr("class", "lineMin")
            .attr("d", minline($scope.selectedCity.graphData));

        // add the max path
        svg.append("path")
            .attr("class", "lineMax")
            .attr("d", maxline($scope.selectedCity.graphData));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
              .attr("x", 432)
              .attr("y", -10)
              .attr("dx", ".71em")
              .style("text-anchor", "end")
              .text("Date");


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

    });

    $scope.selectedCity.id = cityID;

  };

}]);
