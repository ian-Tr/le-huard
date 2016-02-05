(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('Disposable', disposable);

    disposable.$inject = ['MediaService', 'Preloader', 'CommentService'];

    function disposable(MediaService, Preloader, CommentService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData(),
            comments = CommentService.getData();

        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];
        vm.postComment = postComment;

        vm.comments = comments.filter(function(comment) {
            return (comment.medium_type === 'Disposable');
        });

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Disposable');
        });


        getLocations();
        preload();

        function getLocations() {
            for (var i = 0; i < vm.pictures.length; i++) {
                vm.locations.push(vm.pictures[i].url);
            }
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
            var date = new Date(),
                formatedDate = formatDate(date);

            CommentService.postComment(userId, postId, content, formatedDate, username, type, spec).then(function(comment) {
                console.log(comment);
                commentArray.push(comment);
            },
            function(status) {
                console.log(status);
            });

            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        }

    }
})();
