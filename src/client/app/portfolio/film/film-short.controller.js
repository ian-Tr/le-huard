(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('FilmShort', filmShort);

    filmShort.$inject = ['MediaService', 'Preloader', 'CommentService'];

    function filmShort(MediaService, Preloader, CommentService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData(),
            comments = CommentService.getData();

        vm.sliderControl = {};
        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];
        
        vm.comments = comments.filter(function(comment) {
            return (comment.medium_type === 'Film' && comment.medium_type === 'Short');
        });

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Film' && media.medium_type === 'Short');
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
