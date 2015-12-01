var LandingApp = angular.module('LandingApp', ['ui.materialize', 'ui.router']);

LandingApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('Home', {
      url: '/',
      templateUrl: 'views/LandingView'
    })
    .state('Portfolio', {
      url: '/portfolio',
      templateUrl: 'views/PortfolioView',
      controller: 'PortfolioController'
    })
    .state('120mm', {
      url: '/portfolio/120mm',
      templateUrl: 'views/PortfolioView',
      controller: '120mmController'
    })
    .state('120mmBlackWhite', {
      url: '/portfolio/120mm/bw',
      templateUrl: 'views/PortfolioView',
      controller: '120mmBwController'
    })
    .state('120mmCouleur', {
      url: '/portfolio/120mm/couleur',
      templateUrl: 'views/PortfolioView',
      controller: '120mmCouleurController'
    })
    .state('35mm', {
      url: '/portfolio/35mm',
      templateUrl: 'views/PortfolioView',
      controller: '35mmController'
    })
    .state('35mmBlackWhite', {
      url: '/portfolio/35mm/bw',
      templateUrl: 'views/PortfolioView',
      controller: '35mmBwController'
    })
    .state('35mmCouleur', {
      url: '/portfolio/35mm/couleur',
      templateUrl: 'views/PortfolioView',
      controller: '35mmCouleurController'
    })
    .state('Film', {
      url: '/portfolio/film',
      templateUrl: 'views/PortfolioView',
      controller: 'FilmController'
    })
    .state('FilmCourt', {
      url: '/portfolio/film',
      templateUrl: 'views/PortfolioView',
      controller: 'FilmCourtController'
    })
}]);

LandingApp.controller('PortfolioController', ['$scope', function($scope) {
  $scope.pictures = pictures;
}]);

LandingApp.controller('120mmController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm') {
      return picture;
    }
  });
  $scope.sliderControl = {};  
}]);

LandingApp.controller('120mmBwController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'bw') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('120mmCouleurController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'color') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '35mm') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmBwController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '35mm' && picture.color === 'bw') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmCouleurController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '35mm' && picture.color === 'color') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('FilmController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === 'Film') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('FilmCourtController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === 'Film' && picture.color === 'court') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

pictures = [ 
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'bw', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'bw', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'color', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'color', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'bw', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'bw', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'color', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'color', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: '', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: '', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'court', date: '28-11-2015'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'court', date: '28-11-2015'} 
]; 
