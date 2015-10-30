// Ionic Starter App

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

    .run(function ($ionicPlatform, $cordovaInAppBrowser, $ionicPopup, ENV, $http) {
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
    })

    .config(function ($stateProvider, $urlRouterProvider) {

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

    });
