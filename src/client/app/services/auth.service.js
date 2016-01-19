(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthService', _authService);

    _authService.$inject = ['$http', 'Session'];

    function _authService($http, Session) {

        var authService = {};

        authService.login = login;
        authService.isAuthenticated = isAuthenticated;
        authService.isAuthorized = isAuthorized;

        return authService;

        function login(credentials) {
            return $http.post('/api/login', credentials).then(function(response) {
                Session.create(response.data.id, response.data.user.userId,
                    response.data.user.userName, response.data.user.userRole);
                console.log(Session);
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
