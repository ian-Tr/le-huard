(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('ForgotPassword', forgotPassword);

    forgotPassword.$inject = ['$http', '$state'];

    function forgotPassword($http, $state) {
        /*jshint validthis: true */
        var vm = this;

        vm.forgot = {};
        vm.forgot.email = null;
        vm.sendPassword = sendPassword;

        function sendPassword(forgot) {
          vm.showError = false;
          vm.showSuccess = false;

            if (vm.forgot.email !== null) {
                $http.post('/src/server/forgotPassword/forgotPassword.php', forgot).then(function(response) {
                    //http return success block
                    var statusCode = response.status;
                    if (statusCode === 201) {
                        vm.showSuccess = true;
                        //$state.go('portfolio.connection');
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
              vm.showError = true;
            }

          //email field should get cleared either way
          vm.forgot.email = null;
        }
    }

})();
