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
                              $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Nearby';
        vm.openYelp = openYelp;
        vm.openCategory = openCategory;

        activate();

        ////////////////

        function activate() {
            $ionicPlatform.ready(function () {
                getNearby();
            });
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

})();
