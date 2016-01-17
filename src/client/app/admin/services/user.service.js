(function() {
    'use strict';

    angular
        .module('App')
        .factory('UserService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
        var user = null;

        return {
            getData: getData,
            loadData: loadData
        };

        function loadData() {
            var defer = $q.defer();

            $http.get('/api/user').then(function(response) {
                user = response.data;
                defer.resolve();
            });

            return defer.promise;
        }

        function getData() {
            return user;
        }
    }
})();
