(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('35mmBlackWhite', _35mmBlackWhite);

    _35mmBlackWhite.$inject = ['mediaService'];

    function _35mmBlackWhite(mediaService) {
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
