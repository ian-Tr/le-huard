(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Digital', _digital);

    _digital.$inject = ['mediaService'];

    function _digital(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
