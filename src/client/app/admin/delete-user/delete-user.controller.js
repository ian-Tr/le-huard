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

        function ban(user) {
            $http.delete('/api/user' + user.id).then(function(deletedUserId) {
                users = users.filter(function(user) {
                    return (user.id !== deletedUserId);
                });
                console.log(users);
                vm.users = users;
            });
        }

    }

})();
