(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Application', _app);

    _app.$inject = ['USER_ROLES', 'AuthService'];

    function _app(USER_ROLES, AuthService) {
        /*jshint validthis: true */
        var vm = this;

        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.setCurrentUser = setCurrentUser;

        function setCurrentUser(user) {
            vm.currentUser = user;
        }

    }

})();
