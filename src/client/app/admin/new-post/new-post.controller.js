(function() {
    'use strict';

    angular
        .module('App')
        .controller('NewPost', _newPost);

    _newPost.$inject = [];

    function _newPost() {
        /*jshint validthis: true */
        var vm = this,
            success = true;

        vm.title = '';
        vm.file = '';
        vm.medium = '';
        vm.type = '';
        vm.date = '';

        vm.post = post;

        function post() {
            // newPostService post function with vm variables
            console.log(vm.title + ' ' + vm.file + ' ' + vm.medium + ' ' + vm.type + ' ' + vm.date);
            // clear values
            vm.title = '';
            vm.file = '';
            vm.medium = '';
            vm.type = '';
            vm.date = '';

            if (success) {
              console.log('post added');
            }
        }

    }

})();
