(function() {
    'use strict';

    angular
        .module('App')
        .controller('FilmShort', _filmShort);

    _filmShort.$inject = ['MediaService'];

    function _filmShort(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Film' && media.color === 'Court');
        });
    }
})();
