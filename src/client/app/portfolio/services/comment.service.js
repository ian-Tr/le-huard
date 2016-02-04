(function() {
    'use strict';

    angular
        .module('Portfolio')
        .factory('CommentService', commentService);

    commentService.$inject = ['$http', '$q'];

    function commentService($http, $q) {
        var comments = null;

        return {
            getData: getData,
            loadData: loadData
        };

        function loadData() {
            var defer = $q.defer();

            $http.get('/api/comments').then(function(response) {
                comments = response.data;
                defer.resolve();
            });

            return defer.promise;
        }

        function getData() {
            return comments;
        }
    }
})();
