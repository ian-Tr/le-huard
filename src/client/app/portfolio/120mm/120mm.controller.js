(function() {
    'use strict';

    angular
        .module('App')
        .controller('120mm', _120mm);

    _120mm.$inject = ['MediaService'];

    function _120mm(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === '120mm');
        });
    }
})();
