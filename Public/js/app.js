var LandingApp = angular.module('LandingApp', ['ui.materialize', 'ui.router']);

LandingApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/LandingView.html'
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: 'views/PortfolioView.html',
      controller: 'PortfolioController'
    })
    .state('mm120', {
      url: '/portfolio/120mm',
      templateUrl: 'views/PortfolioView.html',
      controller: 'Mm120Controller'
    })
    .state('mm120bw', {
      url: '/portfolio/120mm/bw',
      templateUrl: 'views/PortfolioView.html',
      controller: 'Mm120BwController'
    })
    .state('mm120c', {
      url: '/portfolio/120mm/couleur',
      templateUrl: 'views/PortfolioView',
      controller: 'Mm120CController'
    })
}]);

LandingApp.controller('PortfolioController', ['$scope', function($scope) {
  $scope.pictures = pictures;
}]);

LandingApp.controller('Mm120Controller', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('Mm120BwController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'bw') {
      return picture;
    }
  });
}]);

LandingApp.controller('Mm120CController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'color') {
      return picture;
    }
  });
}]);

LandingApp.controller('Mm35Controller', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '35mm') {
      return picture;
    }
  });
}]);

LandingApp.controller('FilmController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === 'Film') {
      return picture;
    }
  });
}]);

pictures = [ 
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'color'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '120mm', color: 'color'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'color'},
  {url: 'sample1.jpg', name: 'New York Subway', type: '35mm', color: 'color'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'bw'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'color'},
  {url: 'sample1.jpg', name: 'New York Subway', type: 'Film', color: 'color'} 
]; 
