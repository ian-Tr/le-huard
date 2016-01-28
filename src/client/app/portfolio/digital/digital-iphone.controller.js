(function() {
    'use strict';

    angular
        .module('App')
        .controller('DigitalIphone', _digitalIphone);

    _digitalIphone.$inject = ['MediaService', 'Preloader'];

    function _digitalIphone(MediaService, Preloader) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Digitale' && media.medium_spec === 'iPhone');
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
