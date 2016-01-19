(function() {
    'use strict';

    angular
        .module('StateManagement')
        .factory('AuthResolver', _authResolver);

    _authResolver.$inject = ['$http', '$q', 'AUTH_EVENTS'];

    function _authResolver($http, $q, AUTH_EVENTS) {

        var sessionState = null;

        return {
            resolve: _resolve,
            getSessionState: _getSessionState
        };

        function _resolve() {
            var deffered = $q.defer();

            $http.get('/api/login').then(function(response) {
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