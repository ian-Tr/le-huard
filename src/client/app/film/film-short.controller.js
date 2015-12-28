(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('FilmShort', _filmShort);

    _filmShort.$inject = ['mediaService'];

    function _filmShort(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Film' && media.color === 'Court');
        });
    }
})();
