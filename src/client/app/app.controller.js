(function() {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', _application);

    _application.$inject = ['USER_ROLES', 'AuthService', '$scope', 'Session', 'AUTH_EVENTS', '$state'];

    function _application(USER_ROLES, AuthService, $scope, Session, AUTH_EVENTS, $state) {
        /*jshint validthis: true */
        var vm = this;

        vm.currentUser = {};
        vm.currentUser.userId = Session.userId;
        vm.currentUser.userName = Session.userName;
        vm.currentUser.userRole = Session.userRole;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.setCurrentUser = setCurrentUser;
        vm.logout = logout;

        $scope.$on(AUTH_EVENTS.sessionRestore, function(event, data) {
            vm.setCurrentUser(data.session.user);
            console.log(data.session.user);
        });

        function setCurrentUser(user) {
            vm.currentUser = user;
        }

        function logout() {
            AuthService.logout().then(function(user){
                vm.setCurrentUser(user);
            });
            $state.go('portfolio.menu');
        }

    }

})();
