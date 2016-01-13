(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('120mm', _120mm);

    _120mm.$inject = ['mediaService'];

    function _120mm(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '120mm');
        });
    }
})();
