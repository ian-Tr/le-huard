(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Connection', _connection);

    _connection.$inject = ['$rootScope', 'AuthService', 'AUTH_EVENTS'];

    function _connection($rootScope, AuthService, AUTH_EVENTS) {
        /*jshint validthis: true */
        var vm = this;

        vm.credentials.email = '';
        vm.credentials.password = '';
        vm.login = login;

        function login(credentials) {
            AuthService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                vm.setCurrentUser(user);
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        }

    }

})();
