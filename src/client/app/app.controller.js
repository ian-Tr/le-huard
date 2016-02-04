(function() {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', _application);

    _application.$inject = ['USER_ROLES', 'AuthService', 'Session', 'AUTH_EVENTS', '$state', '$rootScope'];

    function _application(USER_ROLES, AuthService, Session, AUTH_EVENTS, $state, $rootScope) {
        /*jshint validthis: true */
        var appVm = this;

        appVm.year = new Date().getFullYear();
        appVm.currentUser = {};
        appVm.currentUser.userId = Session.userId;
        appVm.currentUser.userName = Session.userName;
        appVm.currentUser.userRole = Session.userRole;
        appVm.userRoles = USER_ROLES;
        appVm.isAuthorized = AuthService.isAuthorized;
        appVm.setCurrentUser = setCurrentUser;
        appVm.logout = logout;

        $rootScope.$on(AUTH_EVENTS.sessionRestore, function(event, user) {
            appVm.setCurrentUser(user);
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, user) {
            appVm.setCurrentUser(user);
        });


        function setCurrentUser(user) {
            appVm.currentUser = user;
        }

        function logout() {
            AuthService.logout().then(function(user){
                Session.destroy();
                appVm.setCurrentUser(user);
            });
            $state.go('portfolio.menu');
        }

    }

})();
