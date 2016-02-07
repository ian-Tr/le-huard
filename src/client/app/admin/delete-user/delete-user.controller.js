(function() {
    'use strict';

    angular
        .module('App')
        .controller('DeleteUser', deleteUser);

    deleteUser.$inject = ['UserService', '$http', '$window'];

    function deleteUser(UserService, $http, $window) {
        /*jshint validthis: true */
        var vm = this,
            users = UserService.getData();

        vm.users = users;
        vm.ban = ban;

        function ban(userArray, user, index) {
            $http.delete('/api/user' + user.id).then(function(deletedUserId) {
                userArray.splice(index, 1);
            },
            function(response) {                
                if (response.status === 404) {
                    $window.alert('Oops! It would appear this user does not exist... ps:' +
                    ' try reloading the page :)');
                }
                if (response.status === 419) {
                    $window.alert('Oops! Your session was inactive for mor than 15 minutes...' +
                    ' For your own privacy we automatically logged you out. Please do log' +
                    ' back in and resume your businness!');
                }
                if (response.status === 401) {
                    $window.alert('Oops! It would appear that you were not properly authenticated ' +
                    'to perform this action :( Please log back in and try again, we already miss you!');
                }
                if (response.status === 403) {
                    $window.alert('Oops! It seems that you do not have the permission to' +
                    ' perform this action... Get out of here you pirate!');
                }
            });
        }

    }

})();
