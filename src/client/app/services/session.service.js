(function() {
    'use strict';

    angular
        .module('App')
        .service('Session', _session);

    function _session() {
        /*jshint validthis: true */
        this.create = create;
        this.destroy = destroy;

        this.id = '1';
        this.userId = '1';
        this.userName = '';
        this.userRole = 'viewer';

        function create(sessionId, userId, userName, userRole) {
            /*jshint validthis: true */
            this.id = sessionId;
            this.userId = userId;
            this.userName = userName;
            this.userRole = userRole;
        }

        function destroy() {
            /*jshint validthis: true */
            console.log('Session destroyed');
            this.id = null;
            this.userId = null;
            this.userName = null;
            this.userRole = null;
        }
    }

})();
