'use strict';

/**
 * @ngdoc directive
 * @name bannerCopyToolApp.directive:codeRevealer
 * @description
 * # codeRevealer
 */
angular.module('bannerCopyToolApp')
    .directive('codeRevealer', ['$sce', function($sce){
        return {
            scope: {
                name: '@',
                overlayContents: '=',
                data: '='
            },
            templateUrl: function(element, attrs){
                if(!!attrs.type){
                    return '/views/code-revealer-' + attrs.type + '.html';
                }
                else{
                    return '/views/code-revealer-individual.html';
                }
            },
            restrict: 'C',
            link: function(scope, element, attrs){
                var stripAngularProps = function(html){
                    return html.replace(/ng-(scope|binding|bind-html="[\w\(\)\.\[\]]+")/g,'');
                };

                element.click(function(e){

                    if($(e.target).is(element.find('button'))){
                        var html = '',
                            container;

                        if(attrs.type === 'all'){
                            angular.forEach(scope.data, function(d, i){
                                container = $(attrs.selectorPrefix + d.name + ' .copy-text');
                                html += stripAngularProps(container.html());

                                if(i < (scope.data.length - 1)){
                                    html += '\n\n';
                                }
                            });
                        }
                        else if(attrs.type === 'individual' || !attrs.type) {
                            container = $(attrs.selector + ' .copy-text');

                            html = stripAngularProps(container.html());
                        }

                        scope.$apply(function(){
                            scope.overlayContents = $sce.trustAsHtml('<textarea>' + html + '</textarea>');
                        });
                    }

                    e.preventDefault();
                });
            }
        };
    }]);
