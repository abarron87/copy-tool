'use strict';

describe('Filter: copySizeFilter', function () {

  // load the filter's module
  beforeEach(module('copyTextProjectApp'));

  // initialize a new instance of the filter before each test
  var copySizeFilter;
  beforeEach(inject(function ($filter) {
    copySizeFilter = $filter('copySizeFilter');
  }));

  it('should return the input prefixed with "copySizeFilter filter:"', function () {
    var text = 'angularjs';
    expect(copySizeFilter(text)).toBe('copySizeFilter filter: ' + text);
  });

});
