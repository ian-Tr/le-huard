var LandingApp =
  angular.module('LandingApp',['ui.materialize', 'ui.router', 'ngAnimate', 'akoenig.deckgrid']);

LandingApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('Home', {
      url: '/',
      templateUrl: 'app/landing/landing.html'
    })
    .state('120mm', {
      url: '/120mm',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '120mm'
    })
    .state('120mmBlackWhite', {
      url: '/120mm/bw',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '120mmBlackWhite'
    })
    .state('120mmColor', {
      url: '/120mm/color',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '120mmColor'
    })
    .state('35mm', {
      url: '/35mm',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '35mm'
    })
    .state('35mmBlackWhite', {
      url: '/35mm/bw',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '35mmBlackWhite'
    })
    .state('35mmColor', {
      url: '/35mm/color',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: '35mmColor'
    })
    .state('Film', {
      url: '/film',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: 'Film'
    })
    .state('FilmShort', {
      url: '/film/short',
      templateUrl: 'app/portfolio/portfolio.html',
      controller: 'FilmShort'
    })
    .state('Digital', {
      url: '/digital',
      templateUrl: 'app/portfolio/digital.html',
      controller: 'Digital'
    })
    .state('DigitalIphone', {
      url: '/digital/iphone',
      templateUrl: 'app/portfolio/digital.html',
      controller: 'DigitalIphone'
    })
    .state('DigitalOther', {
      url: '/digital/other',
      templateUrl: 'app/portfolio/digital.html',
      controller: 'DigitalOther'
    })
    .state('Contact', {
      url: '/contact',
      templateUrl: 'app/contact/contact.html',
      controller: 'Contact'
    })
    .state('Connection', {
      url: '/connection',
      templateUrl: 'app/connection/connection.html',
      controller: 'Connection'
    })
    .state('Registration', {
      url: '/registration',
      templateUrl: 'app/registration/registration.html',
      controller: 'Registration'
    });
}]);

LandingApp.controller('120mm', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('120mmBlackWhite', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'Black & White') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('120mmColor', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '120mm' && picture.color === 'Couleur') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mm', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture){
    if (picture.type === '35mm') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmBlackWhite', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === '35mm' && picture.color === 'Black & White') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('35mmColor', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === '35mm' && picture.color === 'Couleur') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('Film', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === 'Film') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('FilmShort', ['$scope', function($scope) {
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === 'Film' && picture.color === 'Court') {
      return picture;
    }
  });
  $scope.sliderControl = {};
}]);

LandingApp.controller('Digital', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale") {
      return picture;
    }
  });
}]);

LandingApp.controller('DigitalIphone', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale" && picture.color === "iPhone") {
      return picture;
    }
  });
}]);

LandingApp.controller('DigitalOther', ['$scope', function($scope){
  $scope.pictures = pictures.filter(function(picture) {
    if (picture.type === "Digitale" && picture.color === "Autre") {
      return picture;
    }
  });
}]);

LandingApp.controller('Connection', ['$scope', function($scope){

}]);

LandingApp.controller('Registration', ['$scope', function($scope){

}]);

var pictures = [
  {url: './images/sample1.jpg', name: 'New York Subway', type: '120mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: '120mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: '120mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: '120mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: '35mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: '35mm', color: 'Black & White', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: '35mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: '35mm', color: 'Couleur', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: 'Film', color: '', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: 'Film', color: '', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: 'Film', color: 'Court', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: 'Film', color: 'Court', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'Autre', date: '28 Novembre, 2015'},
  {url: './images/sample1.jpg', name: 'New York Subway', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/picture2.jpg', name: 'Black & White Hot Chick', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/color1.jpg', name: 'Girl in The Bus', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
  {url: './images/color2.jpg', name: 'Fuzzy Peach', type: 'Digitale', color: 'iPhone', date: '28 Novembre, 2015'},
];

users = [
  {username: 'admin', email: 'admin@admin.com', password: 'admin'},
  {username: 'eloiqs', email: 'eloi.qs@outlook.com', password: 'password'}
];
