'use strict';

/**
 * @ngdoc filter
 * @name copyTextProjectApp.filter:nameFilter
 * @function
 * @description
 * # nameFilter
 * Filter in the copyTextProjectApp.
 */
angular.module('copyTextProjectApp')
    .filter('nameFilter', function () {
        return function (banners, name) {
            var filtered = [];

            if(!!name){
                angular.forEach(banners, function (banner) {
                    if (~banner.name.indexOf(name)) {
                        filtered.push(banner);
                    }
                });
            }
            else{
                filtered = banners;
            }

            return filtered;
        };
    });
