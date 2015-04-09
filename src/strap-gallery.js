(function() {
    angular.module('strapGallery', ['mgcrea.ngStrap.modal', 'ngAnimate']).directive('strapGallery', ['$modal', '$document', 'ImageLoader', Gallery]);

    function Gallery($modal, $document, ImageLoader) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                source: '='
            },
            transclude: true,
            templateUrl: '/src/template.html',
            link: function(scope, element, attrs) {
                var isBound = false;
                
                var images = [];
                scope.currentId = 0;
                
                var modal = $modal({scope: scope, template: '/src/modal.html', show: false});
                
                $document.on('keypress', onKeyPress);
                
                function bind() {
                    if(isBound) return;
                    images = element.find('img');
                    scope.imagesCount = images.length;
                    for (var i = 0; i < scope.imagesCount; i++) {
                        images[i].dataset.id = i;
                    }

                    isBound = true;
                }
                
                scope.$on('$destroy', function() {
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
                    
                    var id = parseInt(e.target.dataset.id);
                    
                    modal.$promise.then(function() {
                        console.log('open');
                        modal.show();
                        setImage(id);
                    });
                };
                
                function setImage(id) {
                    var src = images[id].dataset.source;
                    ImageLoader.load(src).then(function () {
                        scope.src = src;
                        scope.title = images[id].dataset.title;
                        scope.currentId = id;
                        preload(id+1);
                    }, function () {
                        console.error('image loading failed');
                    });
                }
                
                function preload(index) {
                    if(index >= scope.imagesCount - 1)
                        index = 0;
                    
                    var src = images[index].dataset.source;
                    ImageLoader.load(src);
                }
                
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
