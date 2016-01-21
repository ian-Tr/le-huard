(function() {
    'use strict';

    angular
        .module('App')
        .controller('35mm', _35mm);

    _35mm.$inject = ['MediaService'];

    function _35mm(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === '35mm');
        });
    }
})();
