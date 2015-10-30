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

})();
