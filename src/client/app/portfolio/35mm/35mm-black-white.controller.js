(function() {
    'use strict';

    angular
        .module('App')
        .controller('35mmBlackWhite', _35mmBlackWhite);

    _35mmBlackWhite.$inject = ['MediaService'];

    function _35mmBlackWhite(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '35mm' && media.color === 'Black & White');
        });
    }
})();
