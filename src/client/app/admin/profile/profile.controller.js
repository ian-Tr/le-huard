(function() {
    'use strict';

    angular
        .module('App')
        .controller('Profile', _profile);

    _profile.$inject = ['UserService'];

    function _profile(UserService) {
        /*jshint validthis: true */
        var vm = this,
            user = UserService.getData();

        vm.username = user.username;
        vm.email = user.email;
        vm.description = user.description;

    }

})();
