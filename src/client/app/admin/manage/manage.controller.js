(function() {
    'use strict';

    angular
        .module('App')
        .controller('Manage', _manage);

    _manage.$inject = ['MediaService', 'Preloader'];

    function _manage(MediaService, Preloader) {
        /*jshint validthis: true */
        var vm = this,
            posts = MediaService.getData();

        vm.posts = posts;
        vm.manage = manage;
        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];

        function manage(id) {
            // redirect to #/post:id
        }

        getLocations();
        preload();

        function getLocations() {
            for (var i = 0; i < vm.posts.length; i++) {
                vm.locations.push(vm.posts[i].url + '.jpg');
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
