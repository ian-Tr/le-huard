(function() {
    'use strict';

    angular
        .module('App')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');        
    }

})();
