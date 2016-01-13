(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('120mmColor', _120mmColor);

    _120mmColor.$inject = ['mediaService'];

    function _120mmColor(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '120mm' && media.color === 'Couleur');
        });
    }
})();
