'use strict';

/**
 * @ngdoc filter
 * @name copyTextProjectApp.filter:copySizeFilter
 * @function
 * @description
 * # copySizeFilter
 * Filter in the copyTextProjectApp.
 */
angular.module('copyTextProjectApp')
    .filter('copySizeFilter', function () {
        return function(banners, longCopy, shortCopy) {
//            console.log('copySizeFilter::', arguments);

            var filtered = [];

            if(longCopy && shortCopy){
                filtered = banners;
            }
            else if(longCopy && !shortCopy){
                angular.forEach(banners, function(banner){
                   if(~banner.copyType.indexOf('long')){
                       filtered.push(banner);
                   }
                });
            }
            else if(!longCopy && shortCopy){
                angular.forEach(banners, function(banner){
                    if(~banner.copyType.indexOf('short')){
                        filtered.push(banner);
                    }
                });
            }

            return filtered;
        };
    });
