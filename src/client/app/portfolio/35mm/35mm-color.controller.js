(function() {
    'use strict';

    angular
        .module('App')
        .controller('35mmColor', _35mmColor);

    _35mmColor.$inject = ['MediaService'];

    function _35mmColor(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '35mm' && media.color === 'Couleur');
        });
    }
})();
