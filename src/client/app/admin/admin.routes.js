(function() {
    'use strict';

    angular
        .module('Admin')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES'];

    function configRoutes($stateProvider, $urlRouterProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                templateUrl: '/src/client/app/admin/index.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
                }
            })
            .state('admin.profile', {
                url: '/profile',
                templateUrl: '/src/client/app/admin/profile/profile.html',
                controller: 'Profile',
                controllerAs: 'vm'
            })
            .state('admin.new-post', {
                url: '/new-post',
                templateUrl: '/src/client/app/admin/new-post/new-post.html',
                controller: 'NewPost',
                controllerAs: 'vm',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('admin.manage', {
                abstract: true,
                url: '/manage',
                templateUrl: '/src/client/app/admin/manage/index.html',
                resolve: {
                    loadPosts: function(MediaService) {
                        if (MediaService.getData() === null) {
                            return MediaService.loadData();
                        }
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('admin.manage.post-selection', {
                url: '',
                templateUrl: '/src/client/app/admin/manage/manage.html',
                controller: 'Manage',
                controllerAs: 'vm'
            })
            .state('admin.manage.post', {
                url: '/post{id}',
                templateUrl: '/src/client/app/admin/manage/manage-post.html',
                controller: 'ManagePost',
                controllerAs: 'vm'
            })
            .state('admin.delete-user', {
                url: '/delete-user',
                templateUrl: '/src/client/app/admin/delete-user/delete-user.html',
                controller: 'DeleteUser',
                controllerAs: 'vm',
                resolve: {
                    loadUsers: function(UserService) {
                        if (UserService.getData() === null) {
                            return UserService.loadData();                            
                        }
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .state('admin.stats', {
                url: '/stats',
                templateUrl: '/src/client/app/admin/stats/stats.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });
    }

})();
