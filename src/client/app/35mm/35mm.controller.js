(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('35mm', _35mm);

    _35mm.$inject = ['mediaService'];

    function _35mm(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '35mm');
        });
    }
})();
