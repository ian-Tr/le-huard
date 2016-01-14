(function() {
    'use strict';

    angular
        .module('AdminApp')
        .controller('Profile', _profile);

    _profile.$inject = ['userService'];

    function _profile(userService) {
        /*jshint validthis: true */
        var vm = this,
            user = userService.getData();      

    }

})();
