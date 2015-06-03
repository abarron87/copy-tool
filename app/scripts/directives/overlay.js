'use strict';

/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:overlay
 * @description
 * # overlay
 */
angular.module('bannerCopyToolApp')
    .directive('overlay', function () {
        return {
            scope: {
                contents: '='
            },
            restrict: 'C',
            templateUrl: '/views/overlay.html',
            link: function(scope, element){
                function toggle(){
                    element.toggleClass('hidden');
                }

                function selectAllText(toInspect){
                    var re = /^<(textarea|input)/,
                        matches = toInspect.toString().match(re);

                    if(!!matches && matches[1]){
                        element.find(matches[1])[0].select();
                    }
                }

                element.click(function(e){
                    var target = $(e.target);

                    if(target.is(element) || target.is('a')){
                        toggle();
                    }

                    e.preventDefault();
                });

                $('body').keyup(function(e){
                    if(e.keyCode === 27 && (!(element.hasClass('hidden')))){
                        toggle();
                    }

                    e.preventDefault();
                });

                scope.$watch('contents', function(newVal, oldVal){
                    if(newVal !== oldVal){
                        toggle();
                        selectAllText(newVal);
                    }
                });
            }
        };
    });
