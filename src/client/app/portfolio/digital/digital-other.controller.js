(function() {
    'use strict';

    angular
        .module('App')
        .controller('DigitalOther', _digitalOther);

    _digitalOther.$inject = ['MediaService'];

    function _digitalOther(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
