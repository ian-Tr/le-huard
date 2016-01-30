(function() {
    'use strict';

    angular
        .module('App')
        .controller('Profile', _profile);

    _profile.$inject = ['$http', '$state'];

    function _profile($http, $state) {
        /*jshint validthis: true */
        var vm = this;

        //changeProfile block
        vm.newProfile = {};
        vm.newProfile.email = null;
        vm.newProfile.about = null;
        vm.updateProfile = updateProfile;

        function updateProfile(newProfile) {
          vm.showDatabaseError = false;
          vm.showEmailError = false;
          vm.showProfileSuccess = false;

          $http.post('/src/server/accountSettings/updateProfile.php', newProfile).then(function(response) {
            //http return success block
            var statusCode = response.status;
            if (statusCode === 201) {
              vm.showProfileSuccess = true;
            }
          }, function (response) {
            //http return error block
            var statusCode = response.status;
            if (statusCode === 409) {
              vm.showEmailError = true;
            }
            if (statusCode === 404) {
              vm.showDatabaseError = true;
            }
          });
        }
        //end of changeProfile block

        //changePassword block
        vm.passwords = {};
        vm.passwords.currentPassword = null;
        vm.passwords.newPassword = null;
        vm.confirmPassword = null;
        vm.changePassword = changePassword;

        function changePassword(passwords) {
          vm.showError = false;
          vm.showNoMatchError = false;
          vm.showSuccess = false;

            if (vm.passwords.newPassword === vm.confirmPassword) {
                $http.post('/src/server/accountSettings/changePassword.php', passwords).then(function(response) {
                    //http return success block
                    var statusCode = response.status;
                    if (statusCode === 201) {
                        vm.showSuccess = true;
                        vm.passwords = {};
                        vm.confirmPassword = null;
                    }
                }, function (response) {
                  //http return error block
                  var statusCode = response.status;
                  if (statusCode === 409 || statusCode === 404) {
                      vm.showError = true;
                      vm.passwords.currentPassword = null;
                  }
                });
            }
            else {
              vm.showNoMatchError = true;
              vm.passwords.newPassword = null;
              vm.confirmPassword = null;
            }
        }
        //end of changePassword block

        //deleteAccount block
        vm.account = {};
        vm.account.password = null;
        vm.deleteString = null;
        vm.deleteAccount = deleteAccount;

        function deleteAccount(account) {
          vm.showDeleteStringError = false;
          vm.showDeletePasswordError = false;

            if (vm.deleteString === 'delete my account') {
                $http.post('/src/server/accountSettings/deleteAccount.php', account).then(function(response) {
                    //http return success block
                    var statusCode = response.status;
                    if (statusCode === 201) {
                        $state.go('portfolio.menu');
                    }
                }, function (response) {
                  //http return error block
                  var statusCode = response.status;
                  if (statusCode === 409 || statusCode === 404) {
                      vm.showDeletePasswordError = true;
                      vm.account.password = null;
                  }
                });
            }
            else {
              vm.showDeleteStringError = true;
              vm.deleteString = null;
            }
        }
        //end of deleteAccount block

    }

})();
