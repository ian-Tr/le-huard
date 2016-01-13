(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('DigitalIphone', _digitalIphone);

    _digitalIphone.$inject = ['mediaService'];

    function _digitalIphone(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
