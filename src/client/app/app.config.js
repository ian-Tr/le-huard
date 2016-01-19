(function() {
    'use strict';

    angular
        .module('Config', [])
        .config(_interceptHttpProvider);

        _interceptHttpProvider.$inject = ['$httpProvider'];

        function _interceptHttpProvider($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        }
})();
