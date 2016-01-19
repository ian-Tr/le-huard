(function() {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', _application);

    _application.$inject = ['USER_ROLES', 'AuthService', '$scope'];

    function _application(USER_ROLES, AuthService, $scope) {
        /*jshint validthis: true */
        var vm = this;

        vm.currentUser = {};
        vm.currentUser.userName = '';
        vm.currentUser.userRole = 'viewer';
        vm.currentUser.userId = '1';
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.setCurrentUser = setCurrentUser;

        function setCurrentUser(user) {
            vm.currentUser = user;
        }

    }

})();
