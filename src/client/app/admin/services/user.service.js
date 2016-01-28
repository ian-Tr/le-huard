(function() {
    'use strict';

    angular
        .module('App')
        .factory('UserService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {
      var users = null;

      return {
          getData: getData,
          loadData: loadData
      };

      function loadData() {
          var defer = $q.defer();

          $http.get('/api/users').then(function(response) {
              users = response.data;
              defer.resolve();
          });

          return defer.promise;
      }

      function getData() {
          return users;
      }
    }

})();
