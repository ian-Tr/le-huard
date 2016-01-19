(function() {
    'use strict';

    angular
        .module('StateManagement')
        .factory('AuthResolver', _authResolver);

    _authResolver.$inject = ['$http', '$q', 'AUTH_EVENTS', 'Session'];

    function _authResolver($http, $q, AUTH_EVENTS, Session) {

        var sessionState = null;

        return {
            resolve: _resolve,
            getSessionState: _getSessionState
        };

        function _resolve() {
            var deffered = $q.defer();

            $http.put('/api/login').then(function(response) {
                sessionState = response.data;
                deffered.resolve();
            });

            return deffered.promise;
        }

        function _getSessionState() {
            return sessionState;
        }
    }

})();
