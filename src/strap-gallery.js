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
            templateUrl: '/src/template.html',
            link: function(scope, element, attrs) {
//                console.log(element);
                var isBound = false;
                
                var images = [];
                scope.currentId = 0;
                
                var modal = $modal({scope: scope, template: '/src/modal.html', show: false, animation: 'am-fade-and-scale', placement: 'center'});
                
                $document.on('keypress', onKeyPress);
                
                function bind() {
                    if(isBound) return;
                    images = element.find('img');
                    scope.imagesCount = images.length;
                    for (var i = 0; i < scope.imagesCount; i++) {
//                        images[i].setAttribute('data-id1', i);
                        images[i].dataset.id = i;
                    }

                    isBound = true;
                }
                
                scope.$on('$destroy', function() {
//                    element[0].removeEventListener('click', onClick);
                    
                    $document.off('keypress', onKeyPress);
                });
                
                scope.next = function() {
                    if(scope.currentId === scope.imagesCount-1)
                        setImage(0);
                    else
                        setImage(scope.currentId + 1);
                };
                
                scope.prev = function() {
                    if(scope.currentId === 0)
                        setImage(scope.imagesCount - 1);
                    else
                        setImage(scope.currentId - 1);
                };
                
                scope.onClick = function(e) {
                    if(!isBound) {
                        bind();
                        isBound = true;
                    }
                    if(e.target.tagName !== 'IMG')
                        return;
                    
//                    var id = parseInt(e.target.getAttribute('data-id1'));
                    var id = parseInt(e.target.dataset.id);
                    
                    modal.$promise.then(function() {
                        modal.show();
                        setImage(id);
                    });
                };
                
                function setImage(id) {
//                    element[0].setAttribute('style', 'background: #fff');
                    var src = images[id].dataset.source;
                    var img = document.getElementById('strap-gallery-img');
//                    img.cloneNode(true);
                    console.log(img);
//                    var img = new Image();
//                    img.onload = function() {
//                    };
//                    img.src = src;
                    scope.title = 'Фотографии: ';
                    scope.src = src;                        
//                    if(img)
//                        img.src = src;
//                        img.setAttribute('src', src);
                    
                        
                    scope.currentId = id;
//                    if (!scope.$$phase) {
//                        scope.$digest();
//                    }
//                    modal.show()
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
