(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Film', _film);

    _film.$inject = ['mediaService'];

    function _film(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            if (media.type === 'Film') {
                return media;
            }
        });
    }
})();
