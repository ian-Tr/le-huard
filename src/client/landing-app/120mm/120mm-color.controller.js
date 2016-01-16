(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('120mmColor', _120mmColor);

    _120mmColor.$inject = ['MediaService'];

    function _120mmColor(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '120mm' && media.color === 'Couleur');
        });
    }
})();
