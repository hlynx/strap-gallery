(function() {
    angular.module('strapGallery', ['mgcrea.ngStrap.modal', 'ngAnimate', 'bootstrapLightbox']).directive('strapGallery', ['$log', '$modal', '$document', 'Lightbox', Gallery]);

    function Gallery($log, $modal, $document, Lightbox) {
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
                
//                var modal = $modal({scope: scope, template: '/src/modal.html', show: false, animation: 'am-fade-and-scale', placement: 'center'});
                
//                $document.on('keypress', onKeyPress);
                
                function bind() {
                    if(isBound) return;
                    var a = element.find('a');
                    
                    scope.imagesCount = a.length;
                    for (var i = 0; i < scope.imagesCount; i++) {
                        images[i] = { url: a[i].href };
                    }

                    isBound = true;
                }
                
                scope.open = function(e, index) {
                    e.preventDefault();
                    if (!isBound) {
                        bind();
                        isBound = true;
                    }
                    console.log(images);
                    Lightbox.openModal(images, index);
                    
                    return false;
                };
                
                
            }
        };
    }
        
})();
