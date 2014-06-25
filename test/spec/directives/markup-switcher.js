'use strict';

describe('Directive: markupSwitcher', function () {

  // load the directive's module
  beforeEach(module('copyTextProjectApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<markup-switcher></markup-switcher>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the markupSwitcher directive');
  }));
});
