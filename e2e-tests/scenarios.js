'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


describe('Weathered', function() {


  describe('home page', function() {

    beforeEach(function() {
      browser.get('index.html');
      element(by.css('#selectCities')).element(by.cssContainingText('option', 'New York')).click();
    });

    it('should render the weather results when selecting the dropdown', function () {


      describe('weather results', function() {

        // GET CURRENT CITY TEXT
        it('should render the current city text', function () {
          expect(element.all(by.css('.currentCity')).first().getText()).toMatch(/CURRENT WEATHER FOR NEW YORK/);
        });

        // MAKE SURE CURRENT DATE IS CORRECT
        it('should render the current date', function () {
          // this should probably be abstracted to its own method so we can test it
          var d = new Date();
          var n = d.toDateString();
          expect(element.all(by.css('.currentDate')).first().getText()).toBe(n.toUpperCase());
        });

        // TEST CURRENT TEMP
        it('should render the current temp', function () {
          expect(element.all(by.css('.currentTemp')).first().getText()).toMatch((/\d*/));
        });

        // TEST CURRENT CONDITIONS
        it('should render the current conditions', function () {
          var currentConditions = "{{selectedCity.weatherData.weather[0].main}}: {{selectedCity.weatherData.weather[0].description}}";
          expect(element.all(by.css('.currentConditions')).first().getText()).not.toBe(currentConditions);
          expect(element.all(by.css('.currentConditions')).first().getText()).toBeTruthy();
        });

        // TEST CURRENT MIN / MAX
        it('should render the current high and low temp', function () {
          expect(element.all(by.css('.currentMin')).first().getText()).toMatch((/\d*/));
          expect(element.all(by.css('.currentMax')).first().getText()).toMatch((/\d*/));
        });

        // TEST CURRENT HUMIDITY
        it('should render the current humidity', function () {
          expect(element.all(by.css('.currentHumidity')).first().getText()).toMatch((/\d*/));
        });

        // TEST CURRENT PRESSURE
        it('should render the current pressure', function () {
          expect(element.all(by.css('.currentPressure')).first().getText()).toMatch((/\d*/));
        });

        // TEST CURRENT WIND
        it('should render the current wind speed', function () {
          expect(element.all(by.css('.currentWind')).first().getText()).toMatch((/\d*/));
        });

      });

    });

    it('should render the weather forecast graph when selecting the dropdown', function () {

      describe('forecast graph', function() {

        // TEST LEGEND TEMP LINE
        it('should render the current temp line', function () {
          expect(element(by.css('.legendTemp')).isPresent()).toBe(true);
        });

        // TEST LEGEND TEMP MIN LINE
        it('should render the current temp min line', function () {
          expect(element(by.css('.legendMin')).isPresent()).toBe(true);
        });

        // TEST LEGEND TEMP MAX LINE
        it('should render the current temp min line', function () {
          expect(element(by.css('.legendMax')).isPresent()).toBe(true);
        });

      });

    });

  });

});
