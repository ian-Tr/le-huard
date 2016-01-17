(function() {
    'use strict';

    angular
        .module('AdminModule')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                templateUrl: '/src/client/app/admin/index.html'
            })
            .state('admin.profile', {
                url: '/profile',
                templateUrl: '/src/client/app/admin/profile/profile.html',
                controller: 'Profile',
                controllerAs: 'vm',
                resolve: {
                    init: function(UserService) {
                        if (UserService.getData() === null) {
                            return UserService.loadData();
                        }
                    }
                }
            })
            .state('admin.new-post', {
                url: '/new-post',
                templateUrl: '/src/client/app/admin/new-post/new-post.html',
                controller: 'NewPost',
                controllerAs: 'vm'
            })
            .state('admin.manage', {
                url: '/manage',
                templateUrl: '/src/client/app/admin/manage-post/manage.html',
                controller: 'Manage',
                controllerAs: 'vm'
            })
            .state('admin.manage-post', {
                url: '/manage/post',
                templateUrl: '/src/client/app/admin/manage-post/manage-post.html',
                controller: 'ManagePost',
                controllerAs: 'vm'
            })
            .state('admin.delete-user', {
                url: '/delete-user',
                templateUrl: '/src/client/app/admin/delete-user/delete-user.html',
                controller: 'DeleteUser',
                controllerAs: 'vm'
            })
            .state('admin.stats', {
                url: '/stats',
                templateUrl: '/src/client/app/admin/stats/stats.html'
            });
    }

})();
