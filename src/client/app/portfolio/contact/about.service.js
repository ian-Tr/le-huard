(function() {
    'use strict';

    angular
        .module('Portfolio')
        .factory('AboutService', aboutService);

    aboutService.$inject = ['$http', '$q'];

    function aboutService($http, $q) {
        var about = null;

        return {
            getData: getData,
            loadData: loadData
        };

        function loadData() {
            var defer = $q.defer();

            $http.get('/api/about').then(function(response) {
                about = response.data[0].about;
                defer.resolve();
            });

            return defer.promise;
        }

        function getData() {
            return about;
        }
    }
})();
