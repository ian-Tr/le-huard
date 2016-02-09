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
          vm.show404Error = false;
          vm.show409Error = false;
          vm.showSuccess = false;

            if (vm.forgot.email !== null) {
                console.log(forgot);
                $http.post('/src/server/forgotPassword/forgotPassword.php', forgot).then(function(response) {
                    //http return success block
                    var statusCode = response.status;
                    if (statusCode === 201) {
                        vm.showSuccess = true;
                        vm.forgot.email = null;
                        //$state.go('portfolio.connection');
                    }
                }, function (response) {
                  //http return error block
                  var statusCode = response.status;
                  if (statusCode === 404) {
                      vm.show404Error = true;
                      vm.forgot.email = null;
                  }
                  if (statusCode === 409) {
                      vm.show409Error = true;
                      vm.forgot.email = null;
                  }
                });
            }
            else {
              vm.show404Error = true;
              vm.forgot.email = null;
            }
        }
    }

})();
