(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('120mmBlackWhite', _120mmBlackWhite);

    _120mmBlackWhite.$inject = ['mediaService'];

    function _120mmBlackWhite(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            if (media.type === '120mm' && media.color === 'Black & White') {
                return media;
            }
        });
    }
})();
