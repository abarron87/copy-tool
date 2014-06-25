'use strict';

/**
 * @ngdoc directive
 * @name copyTextProjectApp.directive:markupSwitcher
 * @description
 * # markupSwitcher
 */
angular.module('copyTextProjectApp')
    .directive('markupSwitcher', [function () {
        return {
            restrict: 'C',
            scope: {
                tag: '='
            },
            templateUrl: '/views/markup-switcher.html',
            link: function(scope, element, attrs) {
//                scope.$watch('selectedContentContainer', function(newVal, oldVal){
//                    if(oldVal !== newVal) {
//                        var copyContainer = element.find('.copy-text').parent();
//
//                        copyContainer.html(templateStr.supplant({ tag: newVal }));
//                        $compile(copyContainer.contents())(scope);
//                    }
//                });
            }
        };
    }]);
