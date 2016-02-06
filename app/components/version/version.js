'use strict';

angular.module('weatheredApp.version', [
  'weatheredApp.version.interpolate-filter',
  'weatheredApp.version.version-directive'
])

.value('version', '0.1');
