'use strict';
/**
 * @ngdoc overview
 * @name bannerCopyToolApp
 * @description
 * # bannerCopyToolApp
 *
 * Main module of the application.
 */
angular.module('bannerCopyToolApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
]);
'use strict';
/**
 * @ngdoc service
 * @name bannerCopyToolApp.banners
 * @description
 * # banners
 * Factory in the bannerCopyToolApp.
 */
angular.module('bannerCopyToolApp').factory('banners', function () {
  // Service logic
  // ...
  var banners = [
      {
        name: '300x50',
        width: '300',
        height: '50',
        orientation: 'landscape',
        copyType: 'short',
        selected: 'short'
      },
      {
        name: '300x250',
        width: '300',
        height: '250',
        orientation: 'portrait',
        copyType: 'long',
        selected: 'long'
      },
      {
        name: '300x600',
        width: '300',
        height: '600',
        orientation: 'portrait',
        copyType: 'long',
        selected: 'long'
      },
      {
        name: '728x90',
        width: '728',
        height: '90',
        orientation: 'landscape',
        copyType: 'long short',
        selected: 'long'
      }
    ];
  // Public API here
  return {
    get: function () {
      return banners;
    }
  };
});
'use strict';
/**
 * @ngdoc function
 * @name bannerCopyToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bannerCopyToolApp
 */
angular.module('bannerCopyToolApp').controller('MainCtrl', [
  '$scope',
  '$sce',
  'banners',
  function ($scope, $sce, banners) {
    // Set up some on load properties for copy text.
    // Sanitize returns user-entered HTML instead of text stripped from HTML.
    var copyProps = {
        bannersVisible: true,
        text: '',
        sanitize: function () {
          //                console.log($sce.trustAsHtml(this.text).toString());
          return $sce.trustAsHtml(this.text);
        }
      };
    //        var overlaySelector = '#overlay';
    //
    //        var showOverlay = function(overlay){
    //            (overlay || $(overlaySelector)).toggleClass('hidden');
    //        };
    // Give each copy a unique set of these properties.
    $scope.copy = {
      long: angular.extend({}, copyProps, { text: 'The <em>quick</em> <span style="color:brown;">brown</span> <b>fox</b> jumps <span style="position:relative;top:-10px;">over</span> the <span style="letter-spacing:2px;">lazy</span> dog' }),
      short: angular.extend({}, copyProps, { text: 'The <em>qck</em> <span style="color:brown;">brwn</span> <b>fx</b> jmps <span style="position:relative;top:-10px;">vr</span> th <span style="letter-spacing:2px;">lzy</span> dg' })
    };
    $scope.filteredBanners = [];
    // Get banners from banners factory.
    $scope.banners = banners.get();
    $scope.overlayContents = '';
    // Add a default wrapper element for copy text to each banner.
    // Add other defaults here.
    angular.forEach($scope.banners, function (banner) {
      banner.containerElement = 'h3';
    });
    // Determine whether give banner can show both long and short copy.
    $scope.isFlexiBanner = function (banner) {
      if (~banner.copyType.indexOf('long') && ~banner.copyType.indexOf('short')) {
        return true;
      }
      return false;
    };
    // Determine if banner can only show long opy.
    $scope.isLongBanner = function (banner) {
      return banner.copyType === 'long';
    };
    // Determine if banner can only short short copy.
    $scope.isShortBanner = function (banner) {
      return banner.copyType === 'short';
    };
    // Determine if banner is currently showing long copy.
    $scope.isLongSelected = function (banner) {
      return banner.selected === 'long';
    };
    // Determine if banner is currently showing short copy.
    $scope.isShortSelected = function (banner) {
      return banner.selected === 'short';
    };
    // Set visible copy for the given banner.
    // Only show short if user has not selected to show banners than support long copy.
    // Long copy then acts as default (reflected in the radio button toggle)
    $scope.setVisibleCopy = function () {
      var lVisible = $scope.copy.long.bannersVisible, sVisible = $scope.copy.short.bannersVisible;
      angular.forEach($scope.banners, function (banner) {
        if (sVisible && !lVisible) {
          if ($scope.isFlexiBanner(banner) || $scope.isShortBanner(banner)) {
            banner.selected = 'short';
          }
        } else {
          if ($scope.isFlexiBanner(banner) || $scope.isLongBanner(banner)) {
            banner.selected = 'long';
          }
        }
      });
    };  //        $scope.hideOverlay = function(e){
        //            var target = $(e.target);
        //
        //            if(target.is(overlaySelector)){
        //                target.toggleClass('hidden');
        //            };
        //
        //            e.stopPropagation();
        //        };
        //
        //        $scope.$watch('scope.overlayContents', function(newVal, oldVal){
        //            if(newVal !== oldVal){
        //                showOverlay();
        //            }
        //        });
  }
]);
'use strict';
/**
 * @ngdoc filter
 * @name bannerCopyToolApp.filter:copySizeFilter
 * @function
 * @description
 * # copySizeFilter
 * Filter in the bannerCopyToolApp.
 */
angular.module('bannerCopyToolApp').filter('copySizeFilter', function () {
  return function (banners, longCopy, shortCopy) {
    var filtered = [];
    if (longCopy && shortCopy) {
      filtered = banners;
    } else if (longCopy && !shortCopy) {
      angular.forEach(banners, function (banner) {
        if (~banner.copyType.indexOf('long')) {
          filtered.push(banner);
        }
      });
    } else if (!longCopy && shortCopy) {
      angular.forEach(banners, function (banner) {
        if (~banner.copyType.indexOf('short')) {
          filtered.push(banner);
        }
      });
    }
    return filtered;
  };
});
'use strict';
/**
 * @ngdoc filter
 * @name bannerCopyToolApp.filter:nameFilter
 * @function
 * @description
 * # nameFilter
 * Filter in the bannerCopyToolApp.
 */
angular.module('bannerCopyToolApp').filter('nameFilter', function () {
  return function (banners, name) {
    var filtered = [];
    if (!!name) {
      angular.forEach(banners, function (banner) {
        if (~banner.name.indexOf(name)) {
          filtered.push(banner);
        }
      });
    } else {
      filtered = banners;
    }
    return filtered;
  };
});
'use strict';
if (!String.prototype.supplant) {
  String.prototype.supplant = function (o) {
    return this.replace(/\{([^{}]*)\}/g, function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
  };
}
/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:banner
 * @description Directive responsible for representing a single banner. Displays copy text.
 * Reacts to changes to the selected heading tags. Shares scope with MainCtrl so controller can
 * be responsible for banners.
 */
angular.module('bannerCopyToolApp').directive('banner', [
  '$interpolate',
  '$compile',
  function ($interpolate, $compile) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/banner.html',
      link: function (scope, element) {
        scope.$watch('banner.containerElement', function () {
          // Use tag prop for readability in below template.
          // Cannot just use $compile as {{ tag }} are not HTML elements when they get added to the DOM.
          // Need to interpolate the expression first which outputs a <h1> etc tag. Then recompile it with
          // the copy text.
          var props = { tag: scope.banner.containerElement }, copyContainer = element.find('.copy-text'), markup = angular.element($interpolate('<{{ tag }} class="table-cell-middle" ng-bind-html="copy[banner.selected].sanitize()"></{{ tag }}>')(props));
          // Add data we want to continue to use two-way binding.
          // 'banner' is part of scope because ng-repeat that outputs the banner directive creates its own scope.
          markup.html('{{ copy[banner.selected].sanitize() }}');
          copyContainer.html(markup);
          // Recompile the container of the copy text and link to the current scope.
          $compile(copyContainer.contents())(scope);
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:markupSwitcher
 * @description
 * # markupSwitcher
 */
angular.module('bannerCopyToolApp').directive('markupSwitcher', [function () {
    return {
      restrict: 'C',
      scope: { tag: '=' },
      templateUrl: '/views/markup-switcher.html'
    };
  }]);
'use strict';
/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:codeRevealer
 * @description
 * # codeRevealer
 */
angular.module('bannerCopyToolApp').directive('codeRevealer', [
  '$sce',
  function ($sce) {
    return {
      scope: {
        name: '@',
        overlayContents: '=',
        data: '='
      },
      templateUrl: function (element, attrs) {
        if (!!attrs.type) {
          return '/views/code-revealer-' + attrs.type + '.html';
        } else {
          return '/views/code-revealer-individual.html';
        }
      },
      restrict: 'C',
      link: function (scope, element, attrs) {
        var stripAngularProps = function (html) {
          return html.replace(/ng-(scope|binding|bind-html="[\w\(\)\.\[\]]+")/g, '');
        };
        element.click(function (e) {
          if ($(e.target).is(element.find('button'))) {
            var html = '', container;
            if (attrs.type === 'all') {
              angular.forEach(scope.data, function (d, i) {
                container = $(attrs.selectorPrefix + d.name + ' .copy-text');
                html += stripAngularProps(container.html());
                if (i < scope.data.length - 1) {
                  html += '\n\n';
                }
              });
            } else if (attrs.type === 'individual' || !attrs.type) {
              container = $(attrs.selector + ' .copy-text');
              html = stripAngularProps(container.html());
            }
            scope.$apply(function () {
              scope.overlayContents = $sce.trustAsHtml('<textarea>' + html + '</textarea>');
            });
          }
          e.preventDefault();
        });
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:overlay
 * @description
 * # overlay
 */
angular.module('bannerCopyToolApp').directive('overlay', function () {
  return {
    scope: { contents: '=' },
    restrict: 'C',
    templateUrl: '/views/overlay.html',
    link: function (scope, element) {
      function toggle() {
        element.toggleClass('hidden');
      }
      function selectAllText(toInspect) {
        var re = /^<(textarea|input)/, matches = toInspect.toString().match(re);
        if (!!matches && matches[1]) {
          element.find(matches[1])[0].select();
        }
      }
      element.click(function (e) {
        var target = $(e.target);
        if (target.is(element) || target.is('a')) {
          toggle();
        }
        e.preventDefault();
      });
      $('body').keyup(function (e) {
        if (e.keyCode === 27 && !element.hasClass('hidden')) {
          toggle();
        }
        e.preventDefault();
      });
      scope.$watch('contents', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          toggle();
          selectAllText(newVal);
        }
      });
    }
  };
});