(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Digital', _digital);

    _digital.$inject = ['mediaService', '$scope'];

    function _digital(mediaService, $scope) {
        /*jshint validthis: true */
        var vm = this,
            media = mediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
