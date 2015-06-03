'use strict';

/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:markupSwitcher
 * @description
 * # markupSwitcher
 */
angular.module('bannerCopyToolApp')
    .directive('markupSwitcher', [function () {
        return {
            restrict: 'C',
            scope: {
                tag: '='
            },
            templateUrl: '/views/markup-switcher.html'
        };
    }]);
