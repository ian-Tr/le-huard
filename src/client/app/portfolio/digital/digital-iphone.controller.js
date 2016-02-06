(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('DigitalIphone', digitalIphone);

    digitalIphone.$inject = ['MediaService', 'Preloader', 'CommentService'];

    function digitalIphone(MediaService, Preloader, CommentService) {
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
                return (media.medium_type === 'Digital' && media.medium_spec === 'iPhone');
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
                    function(status) {
                        console.log(status);
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
                function(status) {
                    alert('Comment no longer exists');
                }
            );
        }
    }
})();
