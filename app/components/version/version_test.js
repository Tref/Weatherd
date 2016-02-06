'use strict';

describe('weatheredApp.version module', function() {
  beforeEach(module('weatheredApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
