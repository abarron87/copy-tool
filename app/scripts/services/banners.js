'use strict';

/**
 * @ngdoc service
 * @name bannerCopyToolApp.banners
 * @description
 * # banners
 * Factory in the bannerCopyToolApp.
 */
angular.module('bannerCopyToolApp')
    .factory('banners', function () {
        // Service logic
        // ...

        var banners = [
            {
                name: '300x250',
                width: '300',
                height: '250',
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
            },
            {
                name: '300x50',
                width: '300',
                height: '50',
                orientation: 'landscape',
                copyType: 'short',
                selected: 'short'
            },
            {
                name: '300x600',
                width: '300',
                height: '600',
                orientation: 'portrait',
                copyType: 'long',
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
