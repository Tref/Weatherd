'use strict';

describe('weatheredApp.citiesController module', function(){

  beforeEach(module('weatheredApp.citiesController'));

  describe('citiesController controller', function(){


    it('should define CityListCtrl controller', inject(function($controller) {
      var scope = {};
      var ctrl = $controller('CityListCtrl', {$scope:scope});

      expect(ctrl).toBeDefined();
    }));

    it('should create "cities" model with 5 cities', inject(function($controller) {
      var scope = {};
      var ctrl = $controller('CityListCtrl', {$scope:scope});

      expect(scope.cities.length).toBe(5);
    }));

  });

});
