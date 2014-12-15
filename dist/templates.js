angular.module('strapGallery').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/src/modal.html',
    "<div class=\"modal strap-gallery-modal\" tabindex=\"-1\" role=\"dialog\">\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\" ng-show=\"title\">\n" +
    "                <button type=\"button\" class=\"close\" ng-click=\"$hide()\">&times;</button>\n" +
    "                <h4 class=\"modal-title\" ng-bind=\"title\"></h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body\">\n" +
    "                <div class=\"strap-gallery-img-outer\">\n" +
    "                    <div class=\"arrow next\" ng-click=\"next()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\n" +
    "                    <div class=\"arrow prev\" ng-click=\"prev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\n" +
    "                    <img class=\"strap-gallery-img\" id=\"strap-gallery-img\" ng-src=\"{{ src }}\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                {{ currentId + 1 }} из {{ imagesCount }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/src/template.html',
    "<div class=\"strap-gallery\" ng-click=\"onClick($event)\">\n" +
    "    <div ng-transclude></div>\n" +
    "</div>"
  );

}]);
