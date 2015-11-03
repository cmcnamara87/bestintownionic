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
                              $state,
                              $cordovaSocialSharing,
                              $ionicLoading,
                              $timeout,
                              $cordovaGoogleAnalytics,
                              defaultLatLon) {
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
                if(window.analytics) {
                    $cordovaGoogleAnalytics.trackView('Nearby');
                }
            });
        }

        function share() {
            console.log('sharing!')

            $ionicLoading.show({
                template: 'Taking screenshot!'
            });

            $timeout(function() {
                $ionicLoading.hide();
                if(!navigator.screenshot) {
                    return;
                }
                $timeout(function() {
                    navigator.screenshot.save(function(error,res){
                        if(error){
                            window.alert(error);
                        }else{
                            console.log('ok',res.filePath);
                            $cordovaSocialSharing
                                .share('Checkout out these places #bestintown', 'Best in town', res.filePath) // Share via native share sheet
                                .then(function(result) {
                                }, function(err) {
                                    // An error occured. Show a message to the user
                                    window.alert('error');
                                });
                        }
                    });
                }, 200);
            }, 500);





        }
        function openYelp(place) {
            window.open(place.external_url, '_blank');
        }

        function openCategory($event, category) {
            $state.go('tab.nearby-categories-show', {categoryId: category.id});
            $event.stopPropagation();
        }

        function getNearby() {
            console.log('Getting location');
            var posOptions = {timeout: 5000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    console.log('Lot locatin', position);
                    var lat = position.coords.latitude
                    var lon = position.coords.longitude

                    getPlaces(lat, lon).then(function(places) {
                        vm.places = places;
                    }, function() {
                        console.log('Failed getting places');
                        getDefaultPlaces();
                    });
                }, function (err) {
                    // error
                    console.log('Failed, default location');
                    getDefaultPlaces();
                });
        }

        function getDefaultPlaces() {
            vm.isUsingDefault = true;
            console.log('Getting default places');
            getPlaces(defaultLatLon.lat, defaultLatLon.lon).then(function(places) {
                vm.places = places;
            });
        }
        function getPlaces(lat, lon) {
            return $http.get(ENV.apiEndpoint + 'nearby', {
                params: {
                    lat: lat,
                    lon: lon
                }
            }).then(function (response) {
                return response.data;
            });
        }
    }

})();
