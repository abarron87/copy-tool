'use strict';

/**
 * @ngdoc filter
 * @name bannerCopyToolApp.filter:copySizeFilter
 * @function
 * @description
 * # copySizeFilter
 * Filter in the bannerCopyToolApp.
 */
angular.module('bannerCopyToolApp')
    .filter('copySizeFilter', function () {
        return function(banners, longCopy, shortCopy) {
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
