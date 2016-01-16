(function() {
    'use strict';

    angular
        .module('LandingApp')
        .service('Session', _session);

    function _session() {
        /*jshint validthis: true */
        this.create = create;
        this.destroy = destroy;

        function create(sessionId, userId, userRole) {
            /*jshint validthis: true */
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        }

        function destroy() {
            /*jshint validthis: true */
            this.id = null;
            this.userId = null;
            this.userRole = null;
        }
    }

})();
