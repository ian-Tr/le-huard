(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('120mmColor', _120mmColor);

    _120mmColor.$inject = ['MediaService', 'Preloader', 'CommentService'];

    function _120mmColor(MediaService, Preloader, CommentService) {
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
            return (comment.medium_type === '120mm' && comment.medium_spec === 'Color');
        });

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === '120mm' && media.medium_spec === 'Color');
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
