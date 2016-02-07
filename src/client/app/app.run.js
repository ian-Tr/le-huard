(function() {
    'use strict';

    angular
        .module('App')
        .run(bindStateToRootScope)
        .run(stateChangeListener)
        .run(sessionTimeOutListener)
        .run(unauthenticatedListener);

    bindStateToRootScope.$inject = ['$state', '$rootScope'];
    stateChangeListener.$inject = ['$rootScope', 'AUTH_EVENTS', 'AuthService', 'Session', 'AuthResolver', '$state'];
    sessionTimeOutListener.$inject = ['AUTH_EVENTS', 'Session', '$state', '$rootScope', 'AuthService'];
    unauthenticatedListener.$inject = ['AUTH_EVENTS', 'Session', '$state', '$rootScope', 'AuthService'];

    function bindStateToRootScope($state, $rootScope) {
        $rootScope.$state = $state;
    }

    function stateChangeListener($rootScope, AUTH_EVENTS, AuthService, Session, AuthResolver, $state) {
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
                        handleNotAuthorized();
                    } else {
                        handleNotAuthenticated();
                    }
                }
            }

            function handleNotAuthenticated() {
                if (Session.userRole === 'viewer') {
                    $state.go('portfolio.connection');
                } else {
                    // make sure the state is truely logged out
                    AuthService.logout().then(function(user) {
                        Session.destroy();
                        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, user);
                    });
                    $state.go('portfolio.connection');
                }
            }

            function handleNotAuthorized() {
                if (Session.userRole === 'viewer') {
                    $state.go('portfolio.connection');
                } else {
                    // if a user has somehow hacked his state: reset it with the values at api/login
                    AuthResolver.resolve().then(function(session) {
                        Session.create(session);
                        $rootScope.$broadcast(AUTH_EVENTS.sessionRestore, session.user);
                    });
                }
            }
        });
    }

    function sessionTimeOutListener(AUTH_EVENTS, Session, $state, $rootScope, AuthService) {
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            AuthService.logout().then(function(user) {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, user);
                if (!$state.includes('portfolio')) {
                    $state.go('portfolio.connection');
                }
            });
        });
    }

    function unauthenticatedListener(AUTH_EVENTS, Session, $state, $rootScope, AuthService) {
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            AuthService.logout().then(function(user) {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, user);
                if (!$state.includes('portfolio')) {
                    $state.go('portfolio.connection');
                }
            });
        });
    }

})();
