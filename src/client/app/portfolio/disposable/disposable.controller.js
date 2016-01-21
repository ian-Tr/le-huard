(function() {
    'use strict';

    angular
        .module('App')
        .controller('Disposable', _disposable);

    _disposable.$inject = ['MediaService', '$scope'];

    function _disposable(MediaService, $scope) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Disposable');
        });
    }
})();
