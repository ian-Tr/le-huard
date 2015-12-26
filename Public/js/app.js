var LandingApp =
  angular.module('LandingApp',['ui.materialize', 'ui.router', 'ngAnimate', 'akoenig.deckgrid']);

LandingApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

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
      url: '/portfolio/film/court',
      templateUrl: 'views/PortfolioView',
      controller: 'FilmCourtController'
    })
    .state('Digitale', {
      url: '/portfolio/digitale',
      templateUrl: 'views/DigitaleView',
      controller: 'DigitaleController'
    })
    .state('DigitaleIphone', {
      url: '/portfolio/digitale/iphone',
      templateUrl: 'views/DigitaleView',
      controller: 'DigitaleIphoneController'
    })
    .state('DigitaleAutre', {
      url: '/portfolio/digitale/autre',
      templateUrl: 'views/DigitaleView',
      controller: 'DigitaleAutreController'
    })
    .state('Connection', {
      url: '/connection',
      templateUrl: 'views/ConnectionView',
      controller: 'ConnectionController'
    })
    .state('Enregistrement', {
      url: '/enregistrement',
      templateUrl: 'views/RegistrationView',
      controller: 'RegistrationController'
    });
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
    if (picture.type === '120mm' && picture.color === 'Black & White') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('120mmCouleurController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'Couleur') {
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
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === '35mm' && picture.color === 'Black & White') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmCouleurController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === '35mm' && picture.color === 'Couleur') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('FilmController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === 'Film') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('FilmCourtController', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === 'Film' && picture.color === 'Court') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('DigitaleController', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale") {
      return picture;
    }
  });
}]);

LandingApp.controller('DigitaleIphoneController', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale" && picture.color === "iPhone") {
      return picture;
    }
  });
}]);

LandingApp.controller('DigitaleAutreController', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale" && picture.color === "Autre") {
      return picture;
    }
  });
}]);

LandingApp.controller('ConnectionController', ['$scope', function($scope){

}]);

LandingApp.controller('RegistrationController', ['$scope', function($scope){

}]);

pictures = [
  {url: 'img/sample1.jpg', name: 'New York Subway', type: '120mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: '120mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: '120mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: '120mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: '35mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: '35mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: '35mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: '35mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: 'Film', color: '', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: 'Film', color: '', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: 'Film', color: 'Court', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: 'Film', color: 'Court', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: 'img/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: 'img/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
];

users = [
  {username: 'admin', email: 'admin@admin.com', password: 'admin'},
  {username: 'eloiqs', email: 'eloi.qs@outlook.com', password: 'password'}
];
