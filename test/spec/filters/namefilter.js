'use strict';

describe('Filter: nameFilter', function () {

  // load the filter's module
  beforeEach(module('copyTextProjectApp'));

  // initialize a new instance of the filter before each test
  var nameFilter;
  beforeEach(inject(function ($filter) {
    nameFilter = $filter('nameFilter');
  }));

  it('should return the input prefixed with "nameFilter filter:"', function () {
    var text = 'angularjs';
    expect(nameFilter(text)).toBe('nameFilter filter: ' + text);
  });

});
