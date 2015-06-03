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
//            {
//                name: '120x600',
//                width: '120',
//                height: '600',
//                orientation: 'portrait',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '160x600',
//                width: '160',
//                height: '600',
//                orientation: 'portrait',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '240x160',
//                width: '240',
//                height: '160',
//                orientation: 'portrait',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '250x250',
//                width: '250',
//                height: '250',
//                orientation: 'portrait',
//                copyType: 'long short',
//                selected: 'long'
//            },
            {
                name: '300x50',
                width: '300',
                height: '50',
                orientation: 'landscape',
                copyType: 'short',
                selected: 'short'
            },
//            {
//                name: '300x125',
//                width: '300',
//                height: '125',
//                orientation: 'landscape',
//                copyType: 'long short',
//                selected: 'long'
//            },
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
//            {
//                name: '320x50',
//                width: '320',
//                height: '50',
//                orientation: 'landscape',
//                copyType: 'short',
//                selected: 'short'
//            },
//            {
//                name: '468x60',
//                width: '468',
//                height: '60',
//                orientation: 'landscape',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '468x100',
//                width: '468',
//                height: '100',
//                orientation: 'landscape',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '560x80',
//                width: '560',
//                height: '80',
//                orientation: 'landscape',
//                copyType: 'long short',
//                selected: 'long'
//            },
//            {
//                name: '631x78',
//                width: '631',
//                height: '78',
//                orientation: 'landscape',
//                copyType: 'long',
//                selected: 'long'
//            },
//            {
//                name: '640x80',
//                width: '640',
//                height: '80',
//                orientation: 'landscape',
//                copyType: 'long',
//                selected: 'long'
//            },
//            {
//                name: '704x80',
//                width: '704',
//                height: '80',
//                orientation: 'landscape',
//                copyType: 'long',
//                selected: 'long'
//            },
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
