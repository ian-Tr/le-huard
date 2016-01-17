(function() {
    'use strict';

    angular
        .module('App')
        .run(_bindStateToRootScope)
        .run(_stateChangeListener)
        .run(_notAuthenticatedListener);

    _bindStateToRootScope.$inject = ['$state', '$rootScope'];
    _stateChangeListener.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthService'];
    _notAuthenticatedListener.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthService'];

    function _bindStateToRootScope($state, $rootScope) {
        $rootScope.$state = $state;
    }

    function _stateChangeListener($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    console.log('not athorized');
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    console.log('not authenticated');
                }
            }
        });
    }

    function _notAuthenticatedListener($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {

        });
    }

})();
