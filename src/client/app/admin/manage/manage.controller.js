(function() {
    'use strict';

    angular
        .module('Admin')
        .controller('Manage', manage);

    manage.$inject = ['MediaService', 'Preloader', '$q'];

    function manage(MediaService, Preloader, $q) {
        /*jshint validthis: true */
        var vm = this,
            posts = MediaService.getData();

        vm.posts = posts;
        vm.isLoading = true;
        vm.isSuccessful = false;
        vm.percentLoaded = 0;
        vm.locations = [];

        getLocations().then(function() {
            preload();
        });

        function getLocations() {
            var deferred = $q.defer();
            vm.posts.forEach(function(post) {
                if (post.medium_type !== 'Film') {
                    vm.locations.push(post.url);                    
                }
            });
            deferred.resolve();
            return deferred.promise;
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
