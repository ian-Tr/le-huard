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

        vm.pictures = _getDigitalOtherPictures;
        vm.sliderControl = {};

        function _getDigitalOtherPictures() {
            var _digitalOtherPictures = [];

            _digitalOtherPictures = media.filter(byTypeDigitalOther);

            function byTypeDigitalOther(media) {
                if (media.type === 'Digitale' && media.color === 'Autre') {
                    return media;
                }
            }

            return _digitalOtherPictures;
        }
    }
})();
