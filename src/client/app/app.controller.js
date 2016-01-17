(function() {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', _application);

    _application.$inject = ['USER_ROLES', 'AuthService'];

    function _application(USER_ROLES, AuthService) {
        /*jshint validthis: true */
        var vm = this;

        vm.currentUser = {
            name: 'admin',
            role: USER_ROLES.admin
        };
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.setCurrentUser = setCurrentUser;

        function setCurrentUser(user) {
            vm.currentUser = user;
        }

    }

})();
