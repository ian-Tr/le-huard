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

        vm.comments = comments.filter(function(comment) {
            return (comment.medium_type === 'Disposable' && comment.medium_spec === 'Color');
        });

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Disposable' && media.medium_spec === 'Color');
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
    }
})();
