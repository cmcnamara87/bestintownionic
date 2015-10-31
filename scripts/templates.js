angular.module('bestintown').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/categories-show.html',
    "<ion-view>\n" +
    "    <ion-nav-title>\n" +
    "        {{ vm.category.name }}\n" +
    "    </ion-nav-title>\n" +
    "    <ion-content>\n" +
    "        <ion-list>\n" +
    "            <ion-item class=\"text-center\" ng-hide=\"vm.places\">\n" +
    "                <ion-spinner></ion-spinner>\n" +
    "            </ion-item>\n" +
    "            <div ng-repeat=\"place in vm.places\">\n" +
    "                <ng-include src=\"'templates/place.html'\"></ng-include>\n" +
    "            </div>\n" +
    "        </ion-list>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/categories.html',
    "<ion-view view-title=\"Categories\">\n" +
    "    <ion-content>\n" +
    "        <ion-list>\n" +
    "            <ion-item class=\"text-center\" ng-hide=\"vm.categories\">\n" +
    "                <ion-spinner></ion-spinner>\n" +
    "            </ion-item>\n" +
    "            <ion-item ng-repeat=\"category in vm.categories\"\n" +
    "                      ui-sref=\"tab.categories-show({categoryId: category.id})\">\n" +
    "                {{ category.name }}\n" +
    "            </ion-item>\n" +
    "        </ion-list>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/chat-detail.html',
    "<!--\n" +
    "  This template loads for the 'tab.friend-detail' state (app.js)\n" +
    "  'friend' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n" +
    "  The FriendsCtrl pulls data from the Friends service (service.js)\n" +
    "  The Friends service returns an array of friend data\n" +
    "-->\n" +
    "<ion-view view-title=\"{{chat.name}}\">\n" +
    "  <ion-content class=\"padding\">\n" +
    "    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n" +
    "    <p>\n" +
    "      {{chat.lastText}}\n" +
    "    </p>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/hotspots-show.html',
    "<ion-view view-title=\"Location\">\n" +
    "    <!--<ion-nav-title>-->\n" +
    "        <!--{{ vm.hotspot.name }}-->\n" +
    "    <!--</ion-nav-title>-->\n" +
    "    <ion-content>\n" +
    "        <div>\n" +
    "            {{ vm.lat }} {{ vm.lon }}\n" +
    "        </div>\n" +
    "        <ion-list>\n" +
    "            <ion-item class=\"text-center\" ng-hide=\"vm.places\">\n" +
    "                <ion-spinner></ion-spinner>\n" +
    "            </ion-item>\n" +
    "            <div ng-repeat=\"place in vm.places\">\n" +
    "                <ng-include src=\"'templates/place.html'\"></ng-include>\n" +
    "            </div>\n" +
    "        </ion-list>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/nearby.html',
    "<ion-view view-title=\"Nearby 6\">\n" +
    "    <ion-nav-buttons side=\"Primary\">\n" +
    "        <button class=\"button\" ng-click=\"vm.share()\">\n" +
    "            <i class=\"icon ion-share\"></i>\n" +
    "        </button>\n" +
    "    </ion-nav-buttons>\n" +
    "\n" +
    "    <ion-content>\n" +
    "        <ion-list>\n" +
    "            <ion-item class=\"text-center\" ng-hide=\"vm.places\">\n" +
    "                <ion-spinner></ion-spinner>\n" +
    "            </ion-item>\n" +
    "            <div ng-repeat=\"place in vm.places\">\n" +
    "                <ng-include src=\"'templates/place.html'\"></ng-include>\n" +
    "            </div>\n" +
    "\n" +
    "            <a ui-sref=\"tab.hotspots-show({hotspotId: 1, lat: hotspot.latitude, lon: hotspot.longitude})\"\n" +
    "               class=\"item item-avatar\"\n" +
    "               ng-repeat=\"hotspot in vm.hotspots\">\n" +
    "                <img src=\"http://placehold.it/50x50\">\n" +
    "                <h2>{{ hotspot.name }} ({{ hotspot.count }} places)</h2>\n" +
    "                <p>{{ hotspot.known_for }}</p>\n" +
    "                <p>{{ hotspot.distance | number:1}} km</p>\n" +
    "            </a>\n" +
    "        </ion-list>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/place.html',
    "<div>\n" +
    "    <div class=\"item item-avatar\" ng-click=\"vm.openYelp(place)\">\n" +
    "        <img ng-src=\"{{ place.image_url }}\">\n" +
    "        <h2>{{ place.name }}</h2>\n" +
    "        <p>{{ place.address }}</p>\n" +
    "        <p>{{ place.distance | number:1}} km </p>\n" +
    "        <div ng-repeat=\"rank in place.ranks\">\n" +
    "            <a ng-click=\"vm.openCategory($event, rank.category)\" href>\n" +
    "                {{ rank.category.name }} #{{ rank.rank }}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/tab-account.html',
    "<ion-view view-title=\"Account\">\n" +
    "  <ion-content>\n" +
    "    <ion-list>\n" +
    "    <ion-toggle  ng-model=\"settings.enableFriends\">\n" +
    "        Enable Friends\n" +
    "    </ion-toggle>\n" +
    "    </ion-list>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/tab-chats.html',
    "<ion-view view-title=\"Chats\">\n" +
    "  <ion-content>\n" +
    "    <ion-list>\n" +
    "      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n" +
    "        <img ng-src=\"{{chat.face}}\">\n" +
    "        <h2>{{chat.name}}</h2>\n" +
    "        <p>{{chat.lastText}}</p>\n" +
    "        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n" +
    "\n" +
    "        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n" +
    "          Delete\n" +
    "        </ion-option-button>\n" +
    "      </ion-item>\n" +
    "    </ion-list>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/tab-dash.html',
    "<ion-view view-title=\"Dashboard\">\n" +
    "  <ion-content class=\"padding\">\n" +
    "    <div class=\"list card\">\n" +
    "      <div class=\"item item-divider\">Recent Updates</div>\n" +
    "      <div class=\"item item-body\">\n" +
    "        <div>\n" +
    "          There is a fire in <b>sector 3</b>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"list card\">\n" +
    "      <div class=\"item item-divider\">Health</div>\n" +
    "      <div class=\"item item-body\">\n" +
    "        <div>\n" +
    "          You ate an apple today!\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"list card\">\n" +
    "      <div class=\"item item-divider\">Upcoming</div>\n" +
    "      <div class=\"item item-body\">\n" +
    "        <div>\n" +
    "          You have <b>29</b> meetings on your calendar tomorrow.\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('templates/tabs.html',
    "<!--\n" +
    "Create tabs with an icon and label, using the tabs-positive style.\n" +
    "Each tab's child <ion-nav-view> directive will have its own\n" +
    "navigation history that also transitions its views in and out.\n" +
    "-->\n" +
    "<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n" +
    "\n" +
    "    <!-- Nearby Tab -->\n" +
    "    <ion-tab title=\"Nearby\" icon-off=\"ion-radio-waves\" icon-on=\"ion-radio-waves\" href=\"#/tab/nearby\">\n" +
    "        <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n" +
    "    </ion-tab>\n" +
    "\n" +
    "  <!-- Categories Tab -->\n" +
    "  <ion-tab title=\"Categories\" icon-off=\"ion-ios-list-outline\" icon-on=\"ion-ios-list-outline\" href=\"#/tab/categories\">\n" +
    "    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n" +
    "  </ion-tab>\n" +
    "\n" +
    "  <!-- Account Tab -->\n" +
    "  <ion-tab title=\"Settings\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n" +
    "    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n" +
    "  </ion-tab>\n" +
    "\n" +
    "\n" +
    "</ion-tabs>\n"
  );

}]);
