(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('CategoriesController', CategoriesController);

    /* @ngInject */
    function CategoriesController($http,
                                  ENV,
                                  $cordovaGeolocation, $ionicPlatform,
                                  $cordovaGoogleAnalytics) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Categories';

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getCategories();
                $cordovaGoogleAnalytics.trackView('Categories');
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
})();
