(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthService', _authService);

    _authService.$inject = ['$http', 'Session', '$rootScope', 'AUTH_EVENTS', '$q'];

    function _authService($http, Session, $rootScope, AUTH_EVENTS, $q) {

        var authService = {};

        authService.login = login;
        authService.logout = logout;
        authService.isAuthenticated = isAuthenticated;
        authService.isAuthorized = isAuthorized;

        return authService;

        function login(credentials) {
            return $http.post('/api/login', credentials).then(
                function(response) {
                    Session.create(response.data);
                    return response.data.user;
                },
                function(response) {
                    console.log('login error');
                    var error = response.data;
                    return $q.reject(error.reason);
                }
            );
        }

        function logout() {
          return $http.delete('/api/login').then(function(response) {
              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, response.data.user);
              return response.data.user;
          });
        }

        function isAuthenticated() {
            return (Session.id !== 0);
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
