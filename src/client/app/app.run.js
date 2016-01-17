(function() {
    'use strict';

    angular
        .module('App')
        .run(_bindStateToRootScope);

    _bindStateToRootScope.$inject = ['$state', '$rootScope'];

    function _bindStateToRootScope($state, $rootScope) {
        // if ($rootScope.$state === null) {            
            $rootScope.$state = $state;
            console.log($rootScope.$state);
        // }
    }

})();
