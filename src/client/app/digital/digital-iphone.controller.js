(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('DigitalIphone', _digitalIphone);

    _digitalIphone.$inject = ['mediaService'];

    function _digitalIphone(mediaService) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.pictures = _getDigitalIphonePictures;
        vm.sliderControl = {};

        function _getDigitalIphonePictures() {
            var _digitalIphonePictures = [];

            _digitalIphonePictures = media.filter(byTypeDigitalIphone);

            function byTypeDigitalIphone(media) {
                if (media.type === 'Digitale' && media.color === 'iPhone') {
                    return media;
                }
            }

            return _digitalIphonePictures;
        }
    }
})();
