(function() {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', _application);

    _application.$inject = ['USER_ROLES', 'AuthService', '$scope', 'Session', 'AUTH_EVENTS'];

    function _application(USER_ROLES, AuthService, $scope, Session, AUTH_EVENTS) {
        /*jshint validthis: true */
        var vm = this;

        vm.currentUser = {};
        vm.currentUser.userId = Session.userId;
        vm.currentUser.userName = Session.userName;
        vm.currentUser.userRole = Session.userRole;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.setCurrentUser = setCurrentUser;

        $scope.$on(AUTH_EVENTS.sessionRestore, function(event, data) {
            vm.setCurrentUser(data.session.user);
            console.log(data.session.user);
        });

        function setCurrentUser(user) {
            vm.currentUser = user;
        }

    }

})();
