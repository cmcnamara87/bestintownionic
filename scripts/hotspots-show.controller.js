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

})();
