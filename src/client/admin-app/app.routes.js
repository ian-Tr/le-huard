(function() {
    'use strict';

    angular
        .module('AdminApp')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/profile');

        $stateProvider
            .state('Profile', {
                url: '/profile',
                templateUrl: '/src/client/admin-app/profile/profile.html',
                controller: 'Profile',
                controllerAs: 'vm',
                resolve: {
                    init: function(userService) {
                        if (userService.getData() === null) {
                            return userService.loadData();
                        }
                    }
                }
            })
            .state('NewPost', {
                url: '/new-post',
                templateUrl: '/src/client/admin-app/new-post/new-post.html',
                controller: 'NewPost',
                controllerAs: 'vm'
            })
            .state('Manage', {
                url: '/manage',
                templateUrl: '/src/client/admin-app/manage-post/manage.html',
                controller: 'Manage',
                controllerAs: 'vm'
            })
            .state('ManagePost', {
                url: '/manage/post',
                templateUrl: '/src/client/admin-app/manage-post/manage-post.html',
                controller: 'ManagePost',
                controllerAs: 'vm'
            })
            .state('DeleteUser', {
                url: '/delete-user',
                templateUrl: '/src/client/admin-app/delete-user/delete-user.html',
                controller: 'DeleteUser',
                controllerAs: 'vm'
            })
            .state('Stats', {
                url: '/stats',
                templateUrl: '/src/client/admin-app/stats/stats.html'
            });
    }

})();
