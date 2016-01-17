(function() {
    'use strict';

    angular
        .module('App')
        .controller('Film', _film);

    _film.$inject = ['MediaService'];

    function _film(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Film');
        });
    }
})();
