'use strict';

describe('Directive: overlay', function () {

  // load the directive's module
  beforeEach(module('copyTextProjectApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<overlay></overlay>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the overlay directive');
  }));
});
