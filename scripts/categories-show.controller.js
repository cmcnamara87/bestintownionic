(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('CategoriesShowController', CategoriesShowController);

    /* @ngInject */
    function CategoriesShowController($http,
                                      $stateParams,
                                      ENV,
                                      $cordovaGeolocation,
                                      $ionicPlatform,
                                      $state,
                                      $ionicHistory) {
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
            if(window.location.href.indexOf('nearby') >= 0) {
                $state.go('tab.nearby-categories-show', {categoryId: category.id});
            } else {
                $state.go('tab.categories-show', {categoryId: category.id});
            }
            $event.stopPropagation();
        }

        function getCategories() {
            var posOptions = {timeout: 5000, enableHighAccuracy: false};
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

                    $http.get(ENV.apiEndpoint + 'categories/' + $stateParams.categoryId).then(function(response) {
                        vm.category = response.data;
                    });
                }, function (err) {
                    console.log('Error didnt loaded');
                    $http.get(ENV.apiEndpoint + 'categories/' + $stateParams.categoryId + '/places', {
                        params: {
                            lat: -27.49611,
                            lon:  153.00207
                        }
                    }).then(function(response) {
                        vm.places = response.data;
                    });

                    $http.get(ENV.apiEndpoint + 'categories/' + $stateParams.categoryId).then(function(response) {
                        vm.category = response.data;
                    });
                });
        }
    }

})();
