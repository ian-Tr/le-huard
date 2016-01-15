(function() {
    'use strict';

    angular
        .module('AdminApp')
        .controller('Profile', _profile);

    _profile.$inject = ['userService'];

    function _profile(userService) {
        /*jshint validthis: true */
        var vm = this,
            user = userService.getData();

        vm.username = user.username;
        vm.email = user.email;
        vm.description = user.description;
        vm.password = user.password;

    }

})();
