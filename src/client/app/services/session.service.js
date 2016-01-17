(function() {
    'use strict';

    angular
        .module('App')
        .service('Session', _session);

    function _session() {
        /*jshint validthis: true */
        this.create = create;
        this.destroy = destroy;

        this.id = 1;
        this.userId = 1;
        this.userRole = 'admin';

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
