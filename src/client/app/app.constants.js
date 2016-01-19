(function() {
    'use strict';

    angular
        .module('Constants', [])
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionRestore: 'auth-session-restore',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            viewer: 'viewer',
            admin: 'admin',
            member: 'member'
        });

})();
