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
            return (media.medium_type === '35mm' && media.medium_spec === 'B&W');
        });
    }
})();
