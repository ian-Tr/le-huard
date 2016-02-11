(function() {
    'use strict';

    angular
        .module('Admin')
        .controller('ManagePost', managePost);

    managePost.$inject = ['$stateParams', 'MediaService', '$http', '$state', '$window'];

    function managePost($stateParams, MediaService, $http, $state, $window) {
        /*jshint validthis: true */
        var vm = this,
            posts = MediaService.getData();

        vm.post = {};
        vm.post.title = null;
        vm.post.medium_type = null;
        vm.post.medium_spec = null;
        vm.post.media_date = null;
        vm.update = update;
        vm.delete = _delete;
        vm.mediumSpecs = [];
        vm.setMediumSpecs = setMediumSpecs;
        vm.mediums = [{
            type: '120mm',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: '35mm',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: 'Digital',
            spec: [
                'iPhone',
                'Other'
            ]
        }, {
            type: 'Disposable',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: 'Film',
            spec: [
                'Short'
            ]
        }, ];

        init();

        function init() {
            var post;
            var type;
            var medium;

            post = posts.filter(function(post) {
                return (post.id === $stateParams.id);
            });
            //filter always returns an array even if there's only 1 object inside
            post = post[0];
            post.media_date = new Date(post.media_date);

            // populate the spec dropdown options
            type = post.medium_type;
            medium = vm.mediums.filter(function(medium) {
                return (medium.type === type);
            });
            medium = medium[0];
            vm.mediumSpecs = medium.spec;

            // set the post
            vm.post = post;
        }

        function setMediumSpecs() {
            var key = null;
            for (var i = 0; i < vm.mediums.length; i++) {
                if (vm.mediums[i].type === vm.post.medium_type) {
                    key = i;
                }
            }
            vm.mediumSpecs = vm.mediums[key].spec;
        }

        function update(post) {
            vm.showUpdateError = false;
            vm.showUpdateSuccess = false;

            $http.post('/src/server/managePosts/updatePost.php', post).then(function(response) {
                //http return success block
                var statusCode = response.status;
                if (statusCode === 201) {
                    vm.showUpdateSuccess = true;
                }
            }, function(response) {
                if (response.status === 419) {
                    $window.alert('Oops! Your session was inactive for more than 15 minutes...' +
                        ' For your own privacy we automatically logged you out. Please do log' +
                        ' back in and resume your business!');
                }
                if (response.status === 401) {
                    $window.alert('Oops! It would appear that you were not properly authenticated ' +
                        'to perform this action :( Please log back in and try again, we already miss you!');
                }
                if (response.status === 403) {
                    $window.alert('Oops! It seems that you do not have the permission to' +
                        ' perform this action... Get out of here you pirate!');
                }
                if (response.status === 404) {
                    vm.showUpdateError = true;
                }
            });
        }

        function _delete(post) {
            vm.showDeleteError = false;

            $http.post('/src/server/managePosts/deletePost.php', post).then(function(response) {
                //http return success block
                var statusCode = response.status;
                if (statusCode === 200) {
                    //MediaService.getData();
                    $state.go('admin.manage.post-selection');
                }
            }, function(response) {
                //http return error block
                var statusCode = response.status;
                if (statusCode === 404) {
                    vm.showDeleteError = true;
                }
            });
        }
    }

})();
