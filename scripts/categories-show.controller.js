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

})();
