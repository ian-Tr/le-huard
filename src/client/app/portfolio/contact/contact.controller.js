(function() {
    'use strict';

    angular
        .module('Portfolio')
        .controller('Contact', contact);

    contact.$inject = ['$http', '$state', 'AboutService'];

    function contact($http, $state, AboutService) {
        /*jshint validthis: true */
        var vm = this,
            about = AboutService.getData();

        vm.about = about;
        vm.contact = {};
        vm.contact.email = null;
        vm.contact.subject = null;
        vm.contact.message = null;
        vm.sendEmail = sendEmail;

        function sendEmail(contact) {
          vm.showError = false;
          vm.showSuccess = false;

          $http.post('src/server/contact/contact.php', contact).then(function(response) {
            //http return success block
            var statusCode = response.status;
            if (statusCode === 201) {
              vm.showSuccess = true;
            }
          }, function (response) {
            //http return error block
            var statusCode = response.status;
            if (statusCode === 409) {
              vm.showError = true;
            }
            if (statusCode === 404) {
              vm.showError = true;
            }
          });
        }

    }
})();
