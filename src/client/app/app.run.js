(function() {
    'use strict';

    angular
        .module('LandingApp')
        .run(loadMedia);

    loadMedia.$inject = ['mediaService'];

    function loadMedia(mediaService) {
        if (mediaService.getData() === null) {
            mediaService.loadData();
        }
    }
})();
