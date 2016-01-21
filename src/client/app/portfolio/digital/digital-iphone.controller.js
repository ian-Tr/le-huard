(function() {
    'use strict';

    angular
        .module('App')
        .controller('DigitalIphone', _digitalIphone);

    _digitalIphone.$inject = ['MediaService'];

    function _digitalIphone(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Digitale'  && media.medium_spec === 'iPhone');
        });
    }
})();
