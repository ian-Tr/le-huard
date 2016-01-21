(function() {
    'use strict';

    angular
        .module('App')
        .controller('DisposapleBlackWhite', _disposableBlackWhite);

    _disposableBlackWhite.$inject = ['MediaService', '$scope'];

    function _disposableBlackWhite(MediaService, $scope) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Disposable' && media.medium_spec === 'B&W');
        });
    }
})();
