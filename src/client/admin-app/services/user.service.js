(function() {
    'use strict';

    angular
        .module('AdminApp')
        .factory('userService', _userService);

    _userService.$inject = ['$http', '$q'];

    function _userService($http, $q) {
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
