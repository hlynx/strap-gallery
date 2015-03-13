(function() {
    angular.module('strapGallery', ['mgcrea.ngStrap.modal', 'ngAnimate']).directive('strapGallery', ['$log', '$modal', '$document', '$timeout', 'ImageLoader', Gallery]);

    function Gallery($log, $modal, $document, $timeout, ImageLoader) {
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
                
//                scope.$watch('imageSrc', function(val) {
//                    scope.src = val;
////                    console.log(val);
//                })
                
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
//                    Lightbox.setImage((index + 1) % images.length);
                    if(scope.currentId === scope.imagesCount-1)
                        setImage(0);
                    else
                        setImage(scope.currentId + 1);
                };
                
                scope.prev = function() {
//                    Lightbox.setImage((index - 1 + images.length) % images.length);
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
//                    scope.currentId = id;
                    
                    modal.$promise.then(function() {
                        console.log('open');
                        modal.show();
                        setImage(id);
                    });
                };
                
                scope.$on('modal.show', function(e, el) {
                    console.log('opened');
//                    console.log(arguments);
//                    setImage(scope.currentId);
                })
                
                scope.$on('modal.close', function() {
                    console.log(arguments);
                })
                
                function setImage(id) {
//                    element[0].setAttribute('style', 'background: #fff');
                    var src = images[id].dataset.source;
                    
//                    var img = document.getElementById('strap-gallery-img');
//                    img.cloneNode(true);
//                    console.log(img);
//                    var img = new Image();
//                    img.onload = function() {
//                    };
//                    img.src = src;
                    
//                    scope.src = src;
//                    console.log(scope.$$phase);
//                    if(img)
//                        img.src = src;
                    
//                        img.setAttribute('src', src);
                    
//                    $timeout(function() {
//                        scope.src = src;
//                        scope.title = 'Фотографии: ';
//                        scope.currentId = id;
//                    });
                    /*
                    scope.src = src;
                    scope.title = 'Фотографии: ';
                    scope.currentId = id;
                    */
                    //*
                    ImageLoader.load(src).then(function () {
//                        var img = modal.$element.find('img')[0];
//                        img.src = src;
//                        img.style.height = '300px';
                        scope.src = src;
                        scope.title = 'Фотографии: ';
                        scope.currentId = id;
                    }, function () {
//                        success();
                        console.error('image loading failed');
                    });
                    //*/
//                    if (!scope.$$phase) {
//                        scope.$digest();
//                    }
                }
                
//                console.log(modal);
//                modal.$element.bind('onkeypress', function() {
//                    console.log(123);
//                });
                
                function onKeyPress(e) {
                    if(!modal.$isShown)
                        return;
                    
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
