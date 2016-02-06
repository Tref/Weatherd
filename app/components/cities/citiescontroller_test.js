'use strict';

describe('weatheredApp.citiesController module', function(){

  beforeEach(module('weatheredApp.citiesController'));

  describe('view1 controller', function(){

    it('should create "cities" model with 3 cities', inject(function($controller) {
      var scope = {};
      var ctrl = $controller('CityListCtrl', {$scope:scope});

      expect(scope.cities.length).toBe(5);
    }));

  });

});
