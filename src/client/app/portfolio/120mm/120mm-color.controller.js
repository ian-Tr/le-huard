(function() {
    'use strict';

    angular
        .module('App')
        .controller('120mmColor', _120mmColor);

    _120mmColor.$inject = ['MediaService'];

    function _120mmColor(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === '120mm' && media.medium_spec === 'Couleur');
        });
    }
})();
