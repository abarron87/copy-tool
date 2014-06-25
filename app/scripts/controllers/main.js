'use strict';

/**
 * @ngdoc function
 * @name bannerCopyToolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bannerCopyToolApp
 */
angular.module('bannerCopyToolApp')
    .controller('MainCtrl', ['$scope', '$sce', 'banners', function ($scope, $sce, banners) {
        // Set up some on load properties for copy text.
        // Sanitize returns user-entered HTML instead of text stripped from HTML.
        var copyProps = {
            bannersVisible: true,
            text: '',
            sanitize: function(){
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
//            long: angular.copy(copyProps),
//            short: angular.copy(copyProps)

            long: angular.extend({}, copyProps, { text: 'The <em>quick</em> <span style="color:brown;">brown</span> <b>fox</b> jumps <span style="position:relative;top:-10px;">over</span> the <span style="letter-spacing:2px;">lazy</span> dog' }),
            short: angular.extend({}, copyProps, { text: 'The <em>qck</em> <span style="color:brown;">brwn</span> <b>fx</b> jmps <span style="position:relative;top:-10px;">vr</span> th <span style="letter-spacing:2px;">lzy</span> dg' })
        };

//        $scope.filteredBanners = [];

        // Get banners from banners factory.
        $scope.banners = banners.get();

        $scope.overlayContents = '';

        // Add a default wrapper element for copy text to each banner.
        // Add other defaults here.
        angular.forEach($scope.banners, function(banner){
            banner.containerElement = 'h3';
        });

        // Determine whether give banner can show both long and short copy.
        $scope.isFlexiBanner = function(banner){
            if(~banner.copyType.indexOf('long') && ~banner.copyType.indexOf('short')){
                return true;
            }

            return false;
        };

        // Determine if banner can only show long opy.
        $scope.isLongBanner = function(banner){
            return banner.copyType === 'long';
        };

        // Determine if banner can only short short copy.
        $scope.isShortBanner = function(banner){
            return banner.copyType === 'short';
        };

        // Determine if banner is currently showing long copy.
        $scope.isLongSelected = function(banner){
            return banner.selected === 'long';
        };

        // Determine if banner is currently showing short copy.
        $scope.isShortSelected = function(banner){
            return banner.selected === 'short';
        };

        // Set visible copy for the given banner.
        // Only show short if user has not selected to show banners than support long copy.
        // Long copy then acts as default (reflected in the radio button toggle)
        $scope.setVisibleCopy = function(type){
            var lVisible = $scope.copy.long.bannersVisible,
                sVisible = $scope.copy.short.bannersVisible;

            angular.forEach($scope.banners, function (banner) {
                if(sVisible && !lVisible){
                    if($scope.isFlexiBanner(banner) || $scope.isShortBanner(banner)){
                        banner.selected = 'short';
                    }
                }
                else{
                    if($scope.isFlexiBanner(banner) || $scope.isLongBanner(banner)){
                        banner.selected = 'long';
                    }
                }
            });
        };

//        $scope.hideOverlay = function(e){
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
    }]);
