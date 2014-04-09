angular.module('angularify.angular-lazyload')

.directive('lazy', function () {
        return {
            restrict: 'A',
            scope: {obj : '='},
            controller: function($scope, $location, $element, $attrs, $window, $document) {
                // image path
                var img_path = $attrs.lazy;
                // get current page
                var $page = angular.element(window);

                //
                // Get element position
                //
                function getPos(ele){
                    var x = 0;
                    var y = 0;
                    while(true){
                        x += ele.offsetLeft;
                        y += ele.offsetTop;
                        if(ele.offsetParent === null)
                            break;
                        ele = ele.offsetParent;
                    }
                    return [x, y];
                }

                var leftPosition = getPos($element[0])[0];
                var topPosition = getPos($element[0])[1];

                function load_images() {
                    if ($scope.loaded == true)
                        return;

                    // get top scrolling position
                    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    // get left scrolling position
                    var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                    // get window height
                    var windowHeight = $window.innerHeight;
                    // get widnow width
                    var windowWidth  = $window.innerWidth;

                    // calculate visible Y at the bottom
                    var visibleY = scrollTop + innerHeight;

                    if ($element[0].getBoundingClientRect().top <= visibleY){
                        // load image
                        $element[0].src = img_path;
                        // this image loaded
                        $scope.loaded = true;
                     }
                }

                //
                // Init document
                //
                angular.element(window).bind('load', function(){
                    load_images();
                });

                //
                // Scroll handler
                //
                angular.element(document).bind('scroll', function() {
                    load_images();
                });
            }
        }
});
