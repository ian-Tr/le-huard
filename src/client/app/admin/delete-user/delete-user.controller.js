(function() {
    'use strict';

    angular
        .module('App')
        .controller('DeleteUser', deleteUser);

    deleteUser.$inject = ['UserService', '$http'];

    function deleteUser(UserService, $http) {
        /*jshint validthis: true */
        var vm = this,
            users = UserService.getData();

        vm.users = users;
        vm.ban = ban;

        function ban(userArray, user, index) {
            $http.delete('/api/user' + user.id).then(function(deletedUserId) {
                userArray.splice(index, 1);
            },
            function(status) {
                alert('User does not exist');
            });
        }

    }

})();
