(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthService', _authService);

    _authService.$inject = ['$http', 'Session', '$rootScope', 'AUTH_EVENTS', 'AuthResolver'];

    function _authService($http, Session, $rootScope, AUTH_EVENTS, AuthResolver) {

        var authService = {};

        authService.login = login;
        authService.logout = logout;
        authService.isAuthenticated = isAuthenticated;
        authService.isAuthorized = isAuthorized;

        return authService;

        function login(credentials) {
            return $http.put('/api/login', credentials).then(function(response) {
                Session.create(response.data);
                return response.data.user;
            });
        }

        function logout() {
          return $http.delete('/api/login').then(function(response) {
              Session.create(response.data);              
              return response.data.user;
          });
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        }

    }

})();
