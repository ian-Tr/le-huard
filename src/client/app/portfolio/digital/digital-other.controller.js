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
            return (media.medium_type === 'Digitale' && media.medium_spec === 'Other');
        });
    }
})();
