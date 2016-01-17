(function() {
    'use strict';

    angular
        .module('App')
        .controller('ManagePost', _managePost);

    _managePost.$inject = [];

    function _managePost(postService) {
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
