(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('Connection', connection);

    connection.$inject = ['$rootScope', 'AuthService', 'AUTH_EVENTS', '$scope', '$state'];

    function connection($rootScope, AuthService, AUTH_EVENTS, $scope, $state) {
        /*jshint validthis: true */
        var vm = this;

        vm.credentials = {};
        vm.credentials.username = '';
        vm.credentials.password = '';
        vm.login = login;
        vm.error = {};
        vm.error = null;

        function login(credentials) {
            AuthService.login(credentials).then(function(user) {
                console.log('login success');
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.$parent.appVm.setCurrentUser(user);
                $state.go('admin.profile');
            }, function(error) {
                console.log('login failed');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                vm.error = error;
            });
        }

    }

})();
