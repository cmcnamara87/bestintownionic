(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('CategoriesController', CategoriesController);

    /* @ngInject */
    function CategoriesController($http,
                                  ENV,
                                  $cordovaGeolocation, $ionicPlatform,
                                  $cordovaGoogleAnalytics,
                                  defaultLatLon) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Categories';

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getCategories();
                if(window.analytics) {
                    $cordovaGoogleAnalytics.trackView('Categories');
                }
            });
        }

        function getCategoriesWithLatLon(lat, long) {
            return $http.get(ENV.apiEndpoint + 'categories', {
                params: {
                    lat: lat,
                    lon: long
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function getDefaultCategories() {
            vm.isUsingDefault = true;
            console.log('Getting default places');
            return getCategoriesWithLatLon(defaultLatLon.lat, defaultLatLon.lon).then(function(categories) {
                vm.categories = categories;
            });
        }

        function getCategories() {
            var posOptions = {timeout: 5000, enableHighAccuracy: false};
            return $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude

                    return getCategoriesWithLatLon(lat, long).then(function(categories) {
                        vm.categories = categories;
                    }, function() {
                        return getDefaultCategories();
                    });

                }, function (err) {
                    return getDefaultCategories();
                });
        }
    }
})();
