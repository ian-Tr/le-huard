(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthResolver', authResolver);

    authResolver.$inject = ['$http', '$q', 'Session'];

    function authResolver($http, $q, Session) {
        var authResolver = {};

        return {
            resolve: resolve
        };

        function resolve() {
            var deferred = $q.defer();

            $http.get('/api/login').then(function(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
        }
    }

})();
