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

        function create(session) {
            /*jshint validthis: true */
            this.id = session.id;
            this.userId = session.user.userId;
            this.userName = session.user.userName;
            this.userRole = session.user.userRole;
        }

        function destroy() {
            /*jshint validthis: true */
            console.log('Session destroyed');
            this.id = '1';
            this.userId = '1';
            this.userName = '';
            this.userRole = 'viewer';
        }
    }

})();
