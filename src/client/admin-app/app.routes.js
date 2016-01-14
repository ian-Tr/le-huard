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
                controllerAs: 'vm'
            })
            .state('Stats', {
                url: '/stats',
                templateUrl: '/src/client/admin-app/stats/stats.html'
            })
            .state('NewPost', {
                url: '/new-post',
                templateUrl: '/src/client/admin-app/new-post/new-post.html'
            })
            .state('Manage', {
                url: '/manage',
                templateUrl: '/src/client/admin-app/manage-post/manage.html'
            })
            .state('Manage.ManagePost', {
                url: '/post:id',
                templateUrl: '/src/client/admin-app/manage-post/manage-post.html'
            })
            .state('DeleteUser', {
                url: '/delete-user',
                templateUrl: '/src/client/admin-app/delete-user/delete-user.html'
            });
    }

})();
