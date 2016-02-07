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
            loadData: loadData,
            postComment: postComment,
            deleteComment: deleteComment
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

        function postComment(userId, postId, content, date, username, type, spec) {
            var comment = {};
            comment.mem_id = userId;
            comment.post_id = postId;
            comment.content = content;
            comment.comment_date = date;
            comment.username = username;
            comment.medium_type = type;
            comment.medium_spec = spec;
            return $http.post('api/comment', comment).then(
                function(response) {
                    return response.data;
                },
                function(response) {                    
                    return $q.reject(response);
                });
        }

        function deleteComment(comment) {
            return $http.delete('api/comment' + comment.id, function(response) {
                    return response.data;
                },
                function(response) {
                    return response;
                });
        }
    }
})();
