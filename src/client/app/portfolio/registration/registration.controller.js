(function() {
    'use strict';

    angular
        .module('App')
        .controller('Registration', _registration);

    _registration.$inject = ['$http', '$state'];

    function _registration($http, $state) {
        /*jshint validthis: true */
        var vm = this;

        vm.user = {};
        vm.user.username = null;
        vm.user.email = null;
        vm.user.password = null;
        vm.confirmation = null;
        vm.register = register;

        function register(user) {
          //reset error flags on submit to keep them current
          vm.showError = false;
          vm.showNoMatchError = false;

            if (vm.user.password === vm.confirmation) {
                $http.post('/src/server/registration/registration.php', user).then(function(response) {
                    //http return success block
                    var statusCode = response.status;
                    if (statusCode === 201) {
                        $state.go('portfolio.connection');
                    }
                }, function (response) {
                  //http return error block
                  var statusCode = response.status;
                  if (statusCode === 409 || statusCode === 404) {
                      vm.showError = true;
                  }
                });
            }
            else {
              vm.showNoMatchError = true;
            }
        }
    }



})();
