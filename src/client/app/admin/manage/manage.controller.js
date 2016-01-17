(function() {
    'use strict';

    angular
        .module('App')
        .controller('Manage', _manage);

    _manage.$inject = [];

    function _manage(postService) {
        /*jshint validthis: true */
        var vm = this,
            posts = postService.getData();

        vm.posts = posts;

        vm.manage = manage;

        function manage(id) {
            // redirect to #/post:id
        }



    }

})();
