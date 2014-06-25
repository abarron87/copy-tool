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
 * @name copyTextProjectApp.directive:banner
 * @description Directive responsible for representing a single banner. Displays copy text.
 * Reacts to changes to the selected heading tags. Shares scope with MainCtrl so controller can
 * be responsible for banners.
 */
//angular.module('copyTextProjectApp')
//    .directive('banner', ['$compile', '$interpolate', function ($compile, $interpolate) {
//        var templateStr = '<{tag} ng-if="isFlexiBanner() || isLongBanner()" class="table-cell-middle copy-text" ng-show="isLongSelected()">{{ longCopy }}</{tag}><{tag} ng-if="isFlexiBanner() || isShortBanner()" class="table-cell-middle copy-text" ng-show="isShortSelected()">{{ shortCopy }}</{tag}>';
//
//        return {
//            scope: {
//                data: '=',
//                copy: '@',
//                fx: '&'
//            },
//            templateUrl: '/views/banner.html',
//            transclude: true,
//            restrict: 'A',
//            controller: function($scope, $element, $attrs){
//                $scope.selectedContentContainer = 'h3';
//
//                $scope.switchMarkup = function(){
//                    var copyContainer = $element.find('.copy-text').parent();
//
//                    copyContainer.html(templateStr.supplant({ tag: $scope.selectedContentContainer }));
//
//                    $compile(copyContainer.contents())($scope);
//                };
//            },
//            link: function(scope, element, attrs) {
//                scope.$watch('selectedContentContainer', function(newVal, oldVal){
//                    if(oldVal !== newVal) {
//                        var copyContainer = element.find('.copy-text').parent();
//
//                        copyContainer.html(templateStr.supplant({ tag: newVal }));
//                        $compile(copyContainer.contents())(scope);
//                    }
//                });
//            }
//        };
//    }]);

angular.module('copyTextProjectApp')
    .directive('banner', ['$interpolate', '$compile', function($interpolate, $compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/views/banner.html',
            link: function(scope, element, attrs) {
                scope.$watch('banner.containerElement', function(newVal, oldVal){
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
