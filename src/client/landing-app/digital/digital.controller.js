(function() {
    'use strict';

    angular
        .module('LandingApp')
        .controller('Digital', _digital);

    _digital.$inject = ['MediaService', '$scope'];

    function _digital(MediaService, $scope) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.type === 'Digitale');
        });
    }
})();
