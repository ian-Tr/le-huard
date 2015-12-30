(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('DigitalOther', _digitalOther);

    _digitalOther.$inject = ['mediaService'];

    function _digitalOther(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
