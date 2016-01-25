(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthResolver', authResolver);

    authResolver.$inject = ['$http', '$q', 'Session'];

    function authResolver($http, $q, Session) {
        var authResolver = {};

        authResolver.resolved = false;

        return {
            resolve: resolve,
            isResolved: isResolved
        };

        function resolve() {
            var deferred = $q.defer();

            $http.get('/api/login').then(function(response) {
                authResolver.resolved = true;
                deferred.resolve(response.data);
            });

            return deferred.promise;
        }

        function isResolved() {
            return authResolver.resolved;
        }
    }

})();
