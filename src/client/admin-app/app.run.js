(function() {
    'use strict';

    angular
        .module('AdminApp')
        .run(_loadUser);

    _loadUser.$inject = ['userService'];

    function _loadUser(userService) {
        if (userService.getData() === null) {
            userService.loadData();
        }
    }
})();
