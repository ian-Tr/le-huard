(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('DisposableColor', disposableColor);

    disposableColor.$inject = ['MediaService', 'Preloader', 'CommentService'];

    function disposableColor(MediaService, Preloader, CommentService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData(),
            comments = CommentService.getData();

        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];
        vm.postComment = postComment;
        vm.deleteComment = deleteComment;

        init();

        function init() {
            getPictures();
            associateComments();
            getLocations();
            preload();
        }

        function getPictures() {
            vm.pictures = media.filter(function(media) {
                return (media.medium_type === 'Disposable' && media.medium_spec === 'Color');
            });
        }

        function associateComments() {
            vm.pictures.forEach(function(picture) {
                picture.comments = comments.filter(function(comment) {
                    return (comment.post_id === picture.id);
                });
            });
        }

        function getLocations() {
            vm.pictures.forEach(function(picture) {
                vm.locations.push(picture.url);
            });
        }

        function preload() {
            Preloader.preloadImages(vm.locations).then(
                function handleResolve(imageLocations) {
                    vm.isLoading = false;
                    vm.isSuccessful = true;
                },
                function handleReject(imageLocations) {
                    vm.isLoading = false;
                    vm.isSuccessful = false;
                },
                function handleNotify(event) {
                    vm.precentLoaded = event.percent;
                }
            );
        }

        function postComment(commentArray, userId, postId, content, username, type, spec) {
            if (content) {
                var date = new Date(),
                    formatedDate = formatDate(date);

                CommentService.postComment(userId, postId, content, formatedDate, username, type, spec).then(
                    function(comment) {
                        commentArray.push(comment);
                    },
                    function(response) {
                        if (response.status === 404 || response.status === 409) {
                            $window.alert(response.data.statusText);
                        }
                        if (response.status === 419) {
                            $window.alert('Oops! Your session was inactive for more than 15 minutes...' +
                                ' For your own privacy we automatically logged you out. Please do log' +
                                ' back in and resume your businness!');
                        }
                        if (response.status === 401) {
                            $window.alert('Oops! It would appear that you were not properly authenticated ' +
                                'to perform this action :( Please log back in and try again, we already miss you!');
                        }
                        if (response.status === 403) {
                            $window.alert('Oops! It seems that you do not have the permission to' +
                                ' perform this action... Get out of here you pirate!');
                        }
                    }
                );
            }
        }

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }

        function deleteComment(commentArray, comment, index) {
            CommentService.deleteComment(comment).then(
                function(comment) {
                    commentArray.splice(index, 1);
                },
                function(response) {
                    if (response.status === 404) {
                        $window.alert(response.data.statusText);
                    }
                    if (response.status === 419) {
                        $window.alert('Oops! Your session was inactive for mor than 15 minutes...' +
                            ' For your own privacy we automatically logged you out. Please do log' +
                            ' back in and resume your businness!');
                    }
                    if (response.status === 401) {
                        $window.alert('Oops! It would appear that you were not properly authenticated ' +
                            'to perform this action :( Please log back in and try again, we already miss you!');
                    }
                    if (response.status === 403) {
                        $window.alert('Oops! It seems that you do not have the permission to' +
                            ' perform this action... Get out of here you pirate!');
                    }
                }
            );
        }
    }
})();
