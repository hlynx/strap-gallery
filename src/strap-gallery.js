(function() {
    angular.module('strapGallery', ['mgcrea.ngStrap.modal', 'ngAnimate']).directive('strapGallery', ['$log', '$modal', '$document', Gallery]);

    function Gallery($log, $modal, $document) {
        return {
            restrict: 'EA',
            replace: true,
//            scope:false,
//            scope: {
//                src: '='
//            },
            transclude: true,
            templateUrl: 'src/template.html',
            link: function(scope, element, attrs) {
//                console.log(element);
                
                var images = element.find('img');
                scope.currentId = 0;
                scope.count = images.length;
//                console.log(images);
                
                var modal = $modal({scope: scope, template: 'src/modal.html', show: false, animation: 'am-fade-and-scale', placement: 'center'});
                
                for(var i=0; i<scope.count; i++) {
                    images[i].addEventListener('click', onClick);
                    images[i].dataset.id = i;
                }
                
                $document.on('keypress', onKeyPress);
                
                scope.$on('$destroy', function() {
                    for(var i=0; i<scope.count; i++)
                        images[i].removeEventListener('click', onClick);
                    
                    $document.off('keypress', onKeyPress);
                });
                
                scope.next = function() {
                    if(scope.currentId === scope.count-1)
                        setImage(0);
                    else
                        setImage(scope.currentId + 1);
                };
                
                scope.prev = function() {
                    if(scope.currentId === 0)
                        setImage(scope.count-1);
                    else
                        setImage(scope.currentId - 1);
                };
                
                function onClick(e) {
                    var id = parseInt(e.target.dataset.id);
                    setImage(id);
                    modal.$promise.then(modal.show);
                }
                
                function setImage(id) {
                    var src = images[id].dataset.src;
                    scope.title = 'Фотографии: ';
                    scope.src = src;
                    scope.currentId = id;
                }
                
//                console.log(modal);
//                modal.$element.bind('onkeypress', function() {
//                    console.log(123);
//                });
                
                function preload() {
                    
                }
                
                function onKeyPress(e) {
                    if(!modal.$isShown)
                        return false;
                    
                    if(e.keyCode === 37) {
                        scope.$apply(function () {
                            scope.prev();
                        });
                    }                        
                    else if(e.keyCode === 39) {
                        scope.$apply(function () {
                            scope.next();
                        });
                    }
                    else if(e.keyCode === 27) {
                        scope.$apply(function () {
                            modal.hide();
                        });
                        
                    }
                };
                
            }
        };
    }
    
})();