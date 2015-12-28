(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('35mmColor', _35mmColor);

    _35mmColor.$inject = ['mediaService'];

    function _35mmColor(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            if (media.type === '35mm' && media.color === 'Black & White') {
                return media;
            }
        });
    }
})();
