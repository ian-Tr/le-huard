(function() {
    'use strict';

    angular
        .module('App')
        .run(_bindStateToRootScope)
        .run(_stateChangeListener)
        .run(_restoreState)
        .run(_notAuthenticatedListener)
        .run(_notAuthorizedListener);

    _bindStateToRootScope.$inject = ['$state', '$rootScope'];
    _restoreState.$inject = ['AuthResolver', 'Session', '$rootScope', 'AUTH_EVENTS'];
    _stateChangeListener.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthService'];
    _notAuthenticatedListener.$inject = ['$rootScope', 'AUTH_EVENTS', '$state', 'Session'];
    _notAuthorizedListener.$inject = ['$rootScope', 'AUTH_EVENTS', '$state', 'Session'];

    function _bindStateToRootScope($state, $rootScope) {
        $rootScope.$state = $state;
    }

    function _restoreState(AuthResolver, Session, $rootScope, AUTH_EVENTS) {
        AuthResolver.resolve().then(function(){
            Session.create(AuthResolver.getSessionState());
            $rootScope.$broadcast(AUTH_EVENTS.sessionRestore, {
                session: AuthResolver.getSessionState()
            });
        });
    }

    function _stateChangeListener($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    console.log('_stateChangeListener: not athorized');
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    console.log('_stateChangeListener: not authenticated');
                }
            }
        });
    }

    function _notAuthenticatedListener($rootScope, AUTH_EVENTS, $state, Session) {
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            console.log('_notAuthenticatedListener: not authenticated');
            $state.go('portfolio.connection');
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            console.log('_notAuthenticatedListener: session timeout');
            $state.go('portfolio.connection');
        });
    }

    function _notAuthorizedListener($rootScope, AUTH_EVENTS, $state, Session) {
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            console.log('_notAuthorizedListener: not authorized');
            $state.go('portfolio.connection');
        });
    }

})();
