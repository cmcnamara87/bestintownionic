(function () {

    'use strict';
    angular
        .module('bestintown')
        .controller('AccountController', AccountController);

    /* @ngInject */
    function AccountController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Account';

        activate();

        ////////////////

        function activate() {
        }
    }

})();
