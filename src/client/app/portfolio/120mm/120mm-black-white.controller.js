(function() {
    'use strict';

    angular
        .module('App')
        .controller('120mmBlackWhite', _120mmBlackWhite);

    _120mmBlackWhite.$inject = ['MediaService'];

    function _120mmBlackWhite(MediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.sliderControl = {};

        vm.pictures = media.filter(function(media) {
            return (media.type === '120mm' && media.color === 'Black & White');
        });
    }
})();
