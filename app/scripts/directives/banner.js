'use strict';

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:banner
 * @description Directive responsible for representing a single banner. Displays copy text.
 * Reacts to changes to the selected heading tags. Shares scope with MainCtrl so controller can
 * be responsible for banners.
 */
angular.module('bannerCopyToolApp')
    .directive('banner', ['$interpolate', '$compile', function($interpolate, $compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/banner.html',
            link: function(scope, element) {
                scope.$watch('banner.containerElement', function(){
                    // Use tag prop for readability in below template.
                    // Cannot just use $compile as {{ tag }} are not HTML elements when they get added to the DOM.
                    // Need to interpolate the expression first which outputs a <h1> etc tag. Then recompile it with
                    // the copy text.
                    var props = {
                            tag: scope.banner.containerElement
                        },
                        copyContainer = element.find('.copy-text'),
                        markup = angular.element($interpolate('<{{ tag }} class="table-cell-middle" ng-bind-html="copy[banner.selected].sanitize()"></{{ tag }}>')(props));

                    // Add data we want to continue to use two-way binding.
                    // 'banner' is part of scope because ng-repeat that outputs the banner directive creates its own scope.
                    markup.html('{{ copy[banner.selected].sanitize() }}');
                    copyContainer.html(markup);

                    // Recompile the container of the copy text and link to the current scope.
                    $compile(copyContainer.contents())(scope);
                });
            }
        };
    }]);
