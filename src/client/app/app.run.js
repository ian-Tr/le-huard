(function() {
    'use strict';

    angular
        .module('App')
        .run(_bindStateToRootScope)
        .run(_stateChangeListener)
        .run(_notAuthenticatedListener);
    // .run(_notAuthorizedListener);

    _bindStateToRootScope.$inject = ['$state', '$rootScope'];
    _stateChangeListener.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthService', 'Session', 'AuthResolver'];
    _notAuthenticatedListener.$inject = ['$rootScope', 'AUTH_EVENTS', '$state', 'Session'];
    // _notAuthorizedListener.$inject = ['$rootScope', 'AUTH_EVENTS', '$state', 'Session'];

    function _bindStateToRootScope($state, $rootScope) {
        $rootScope.$state = $state;
    }

    function _stateChangeListener($rootScope, AUTH_EVENTS, AuthService, Session, AuthResolver) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            var resolved = AuthResolver.isResolved();
            if (!resolved) {
                AuthResolver.resolve().then(function(session) {
                    resolved = true;
                    Session.create(session);
                    $rootScope.$broadcast(AUTH_EVENTS.sessionRestore, session.user);
                    handleStateChange();
                });
            } else {
                handleStateChange();
            }

            function handleStateChange() {
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
