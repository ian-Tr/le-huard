(function() {
    'use strict';

    angular
        .module('App')
        .controller('DisposableColor', _disposableColor);

    _disposableColor.$inject = ['MediaService', '$scope'];

    function _disposableColor(MediaService, $scope) {
        /*jshint validthis: true */
        var vm = this,
            media = MediaService.getData();

        vm.pictures = media.filter(function(media) {
            return (media.medium_type === 'Disposable' && media.medium_spec === 'Couleur');
        });
    }
})();