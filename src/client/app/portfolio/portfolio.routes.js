(function() {
    'use strict';

    angular
        .module('PortfolioModule')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('portfolio', {
                abstract: true,
                url: '/',
                templateUrl: '/src/client/app/portfolio/index.html',
                resolve: {
                    load: function(MediaService) {
                        if (MediaService.getData() === null) {
                            return MediaService.loadData();
                        }
                    }
                }
            })
            .state('portfolio.menu', {
                url: '',
                templateUrl: '/src/client/app/portfolio/landing/landing.html'
            })
            .state('portfolio.120mm', {
                url: '120mm',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '120mm',
                controllerAs: 'vm'
            })
            .state('portfolio.120mm-black-white', {
                url: '120mm/bw',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '120mmBlackWhite',
                controllerAs: 'vm'
            })
            .state('portfolio.120mm-color', {
                url: '120mm/color',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '120mmColor',
                controllerAs: 'vm'
            })
            .state('portfolio.35mm', {
                url: '35mm',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '35mm',
                controllerAs: 'vm'
            })
            .state('portfolio.35mm-black-white', {
                url: '35mm/bw',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '35mmBlackWhite',
                controllerAs: 'vm'
            })
            .state('portfolio.35mm-color', {
                url: '35mm/color',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: '35mmColor',
                controllerAs: 'vm'
            })
            .state('portfolio.film', {
                url: 'film',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: 'Film',
                controllerAs: 'vm'
            })
            .state('portfolio.film-short', {
                url: 'film/short',
                templateUrl: '/src/client/app/portfolio/portfolio/portfolio.html',
                controller: 'FilmShort',
                controllerAs: 'vm'
            })
            .state('portfolio.digital', {
                url: 'digital',
                templateUrl: '/src/client/app/portfolio/digital/digital.html',
                controller: 'Digital',
                controllerAs: 'vm'
            })
            .state('portfolio.digital-iphone', {
                url: 'digital/iphone',
                templateUrl: '/src/client/app/portfolio/digital/digital.html',
                controller: 'DigitalIphone',
                controllerAs: 'vm'
            })
            .state('portfolio.digital-other', {
                url: 'digital/other',
                templateUrl: '/src/client/app/portfolio/digital/digital.html',
                controller: 'DigitalOther',
                controllerAs: 'vm'
            })
            .state('portfolio.contact', {
                url: 'contact',
                templateUrl: '/src/client/app/portfolio/contact/contact.html',
                controller: 'Contact',
                controllerAs: 'vm'
            })
            .state('portfolio.connection', {
                url: 'connection',
                templateUrl: '/src/client/app/portfolio/connection/connection.html',
                controller: 'Connection',
                controllerAs: 'vm'
            })
            .state('portfolio.registration', {
                url: 'registration',
                templateUrl: '/src/client/app/portfolio/registration/registration.html',
                controller: 'Registration',
                controllerAs: 'vm'
            });
    }

})();
