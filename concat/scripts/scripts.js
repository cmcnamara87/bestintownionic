// Ionic Starter App

window.BOOTSTRAP_OK = true;
console.log('App!!');
console.log('TESTING');

// Manual bootstrap
angular.element(document).ready(function() {
    angular.bootstrap(document, ['bestintown']);
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bestintown', [
    'ionic',
    'config',
    'ngAnimate',
    'ngCordova'
])

    .run(["$ionicPlatform", "$cordovaInAppBrowser", "$ionicPopup", "ENV", "$http", function ($ionicPlatform, $cordovaInAppBrowser, $ionicPopup, ENV, $http) {
        $ionicPlatform.ready(function () {
            if(window.cordova) {
                window.open = cordova.InAppBrowser.open;
            }

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }


            if(window.PushNotification) {
                var push = PushNotification.init({
                    "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

                push.on('registration', function(data) {
                    // data.registrationId
                    console.log(data);
                    $http.post(ENV.apiEndpoint + 'devices', {
                        'device_type': 'ios',
                        'token': data.registrationId
                    });
                });

                push.on('notification', function(data) {
                    // data.message,
                    // data.title,
                    // data.count,
                    // data.sound,
                    // data.image,
                    // data.additionalData
                    //console.log(data);
                    //window.alert(data);
                    var alertPopup = $ionicPopup.alert({
                        title: data.title,
                        template: data.message
                    });
                });

                push.on('error', function(e) {
                    // e.message
                    console.log(e);
                });
            }

        });
    }])

    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        console.log('CONFIG!!');
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.categories', {
                url: '/categories',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/categories.html',
                        controller: 'CategoriesController as vm'
                    }
                }
            })
            .state('tab.categories-show', {
                url: '/categories/:categoryId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/categories-show.html',
                        controller: 'CategoriesShowController as vm'
                    }
                }
            })

            .state('tab.hotspots-show', {
                url: '/hotspots/:hotspotId?lat?lon',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/hotspots-show.html',
                        controller: 'HotspotsShowController as vm'
                    }
                }
            })

            .state('tab.nearby', {
                url: '/nearby',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/nearby.html',
                        controller: 'NearbyController as vm'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/nearby');

    }]);

angular.module('starter.controllers', [])

.controller('DashCtrl', ["$scope", function($scope) {}])

.controller('ChatsCtrl', ["$scope", "Chats", function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}])

.controller('ChatDetailCtrl', ["$scope", "$stateParams", "Chats", function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('AccountCtrl', ["$scope", function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}]);

angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

"use strict";

 angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'http://bestintown.co/api/v1/'})

;
(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('CategoriesController', CategoriesController);

    /* @ngInject */
    function CategoriesController($http,
                                  ENV,
                                  $cordovaGeolocation, $ionicPlatform) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Categories';

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getCategories();
            });
        }

        function getCategories() {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude

                    $http.get(ENV.apiEndpoint + 'categories', {
                        params: {
                            lat: lat,
                            lon: long
                        }
                    }).then(function(response) {
                        vm.categories = response.data;
                    });

                }, function (err) {
                    // error
                });
        }
    }
    CategoriesController.$inject = ["$http", "ENV", "$cordovaGeolocation", "$ionicPlatform"];
})();

(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('NearbyController', NearbyController);

    /* @ngInject */
    function NearbyController($cordovaGeolocation,
                              $ionicPlatform,
                              $http,
                              ENV,
                              $state, $cordovaSocialSharing) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Nearby';
        vm.openYelp = openYelp;
        vm.openCategory = openCategory;
        vm.share = share;

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getNearby();
            });
        }

        function share() {
            console.log('sharing!')

            window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');

            //navigator.screenshot.save(function(error,res){
            //    if(error){
            //        window.alert(error);
            //    }else{
            //        console.log('ok',res.filePath);
            //
            //
            //        //$cordovaSocialSharing
            //        //    .share('Bestintown!', 'Best in town', res.filePath, 'http://bestintown.co') // Share via native share sheet
            //        //    .then(function(result) {
            //        //    }, function(err) {
            //        //        // An error occured. Show a message to the user
            //        //        window.alert('error');
            //        //    });
            //    }
            //});


        }
        function openYelp(place) {
            window.open(place.external_url, '_blank');
        }

        function openCategory($event, category) {
            $state.go('tab.categories-show', {categoryId: category.id});
            $event.stopPropagation();
        }

        function getNearby() {
            console.log('Getting location');
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    console.log('Lot locatin', position);
                    var lat = position.coords.latitude
                    var long = position.coords.longitude

                    $http.get(ENV.apiEndpoint + 'nearby', {
                        params: {
                            lat: lat,
                            lon: long
                        }
                    }).then(function (response) {
                        vm.places = response.data;
                    });

                    //$http.get(ENV.apiEndpoint + 'hotspots', {
                    //    params: {
                    //        lat: lat,
                    //        lon: long
                    //    }
                    //}).then(function (response) {
                    //    vm.hotspots = response.data;
                    //});
                }, function (err) {
                    // error
                    console.log('Failed');
                });
        }
    }
    NearbyController.$inject = ["$cordovaGeolocation", "$ionicPlatform", "$http", "ENV", "$state", "$cordovaSocialSharing"];

})();

(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('HotspotsShowController', HotspotsShowController);

    /* @ngInject */
    function HotspotsShowController($http, $stateParams, ENV, $cordovaGeolocation, $ionicPlatform) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'HotspotsShow';

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getPlaces();
            });
        }

        function getPlaces() {
            //var posOptions = {timeout: 10000, enableHighAccuracy: false};
            //$cordovaGeolocation
            //    .getCurrentPosition(posOptions)
            //    .then(function (position) {
            //        var lat = position.coords.latitude
            //        var long = position.coords.longitude

            $http.get(ENV.apiEndpoint + 'nearby', {
                params: {
                    lat: $stateParams.lat,
                    lon: $stateParams.lon
                }
            }).then(function (response) {
                vm.places = response.data;
            });
                //    }).then(function(response) {
                //        vm.places = response.data;
                //    });
                //}, function (err) {
                //    // error
                //});
        }
    }
    HotspotsShowController.$inject = ["$http", "$stateParams", "ENV", "$cordovaGeolocation", "$ionicPlatform"];

})();

(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('CategoriesShowController', CategoriesShowController);

    /* @ngInject */
    function CategoriesShowController($http, $stateParams, ENV, $cordovaGeolocation, $ionicPlatform) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'CategoriesShow';
        vm.openYelp = openYelp;
        vm.openCategory = openCategory;

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getCategories();
            });
        }

        function openYelp(place) {
            window.open(place.external_url, '_blank');
        }

        function openCategory($event, category) {
            $state.go('tab.categories-show', {categoryId: category.id});
            $event.stopPropagation();
        }

        function getCategories() {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude

                    $http.get(ENV.apiEndpoint + 'categories/' + $stateParams.categoryId + '/places', {
                        params: {
                            lat: lat,
                            lon: long
                        }
                    }).then(function(response) {
                        vm.places = response.data;
                    });

                    $http.get(ENV.apiEndpoint + 'categories/' + $stateParams.categoryId, {
                        params: {
                            lat: lat,
                            lon: long
                        }
                    }).then(function(response) {
                        vm.category = response.data;
                    });
                }, function (err) {
                    // error
                });
        }
    }
    CategoriesShowController.$inject = ["$http", "$stateParams", "ENV", "$cordovaGeolocation", "$ionicPlatform"];

})();
