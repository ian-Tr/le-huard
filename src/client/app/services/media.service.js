(function() {
    'use strict';

    angular
        .module('LandingApp')
        .factory('mediaService', mediaService);

    mediaService.$inject = ['$http', '$q'];

    function mediaService($http, $q) {
        var media = null;

        return {
            getData: getData,
            loadData: loadData
        };

        function loadData() {
            var defer = $q.defer();

            $http.get('/src/server/api/media.json').then(function(response) {
                media = response.data;
                defer.resolve();
            });

            return defer.promise;
        }

        function getData() {
            return media;
        }
    }
})();
