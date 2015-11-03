(function () {

    'use strict';
    angular
        .module('bestintown')
        .factory('defaultLatLon', defaultLatLon);

    /* @ngInject */
    function defaultLatLon() {
        var service = {
            lat: -27.49611,
            lon: 153.00207
        };
        return service;

        ////////////////
    }

})();
