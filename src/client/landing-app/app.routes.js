(function() {
    'use strict';

    angular
        .module('LandingApp')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider, mediaService) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Home', {
                url: '/',
                templateUrl: '/src/client/landing-app/landing/landing.html'
            })
            .state('120mm', {
                url: '/120mm',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '120mm',
                controllerAs: 'vm'
            })
            .state('120mmBlackWhite', {
                url: '/120mm/bw',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '120mmBlackWhite',
                controllerAs: 'vm'
            })
            .state('120mmColor', {
                url: '/120mm/color',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '120mmColor',
                controllerAs: 'vm'
            })
            .state('35mm', {
                url: '/35mm',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '35mm',
                controllerAs: 'vm'
            })
            .state('35mmBlackWhite', {
                url: '/35mm/bw',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '35mmBlackWhite',
                controllerAs: 'vm'
            })
            .state('35mmColor', {
                url: '/35mm/color',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: '35mmColor',
                controllerAs: 'vm'
            })
            .state('Film', {
                url: '/film',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: 'Film',
                controllerAs: 'vm'
            })
            .state('FilmShort', {
                url: '/film/short',
                templateUrl: '/src/client/landing-app/portfolio/portfolio.html',
                controller: 'FilmShort',
                controllerAs: 'vm'
            })
            .state('Digital', {
                url: '/digital',
                templateUrl: '/src/client/landing-app/digital/digital.html',
                controller: 'Digital',
                controllerAs: 'vm'
            })
            .state('DigitalIphone', {
                url: '/digital/iphone',
                templateUrl: '/src/client/landing-app/digital/digital.html',
                controller: 'DigitalIphone',
                controllerAs: 'vm'
            })
            .state('DigitalOther', {
                url: '/digital/other',
                templateUrl: '/src/client/landing-app/digital/digital.html',
                controller: 'DigitalOther',
                controllerAs: 'vm'
            })
            .state('Contact', {
                url: '/contact',
                templateUrl: '/src/client/landing-app/contact/contact.html',
                controller: 'Contact',
                controllerAs: 'vm'
            })
            .state('Connection', {
                url: '/connection',
                templateUrl: '/src/client/landing-app/connection/connection.html',
                controller: 'Connection',
                controllerAs: 'vm'
            })
            .state('Registration', {
                url: '/registration',
                templateUrl: '/src/client/landing-app/registration/registration.html',
                controller: 'Registration',
                controllerAs: 'vm'
            });
    }

})();
