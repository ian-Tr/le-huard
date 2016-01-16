(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('DigitalIphone', _digitalIphone);

    _digitalIphone.$inject = ['MediaService'];

    function _digitalIphone(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
