(function() {
    'use strict';

    angular
        .module('App')
        .controller('NewPost', _newPost);

    _newPost.$inject = ['Upload'];

    function _newPost(Upload) {
        /*jshint validthis: true */
        var vm = this,
            currentDate = new Date();

        vm.mediumType = null;
        vm.mediumSpec = null;
        vm.date = null;
        vm.file = null;
        vm.title = null;
        vm.mediumSpecs = [];
        vm.setMediumSpecs = setMediumSpecs;
        vm.submit = submit
        vm.upload = upload;
        vm.clear = clear;
        vm.mediums = [{
            type: '120mm',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: '35mm',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: 'Digital',
            spec: [
                'iPhone',
                'Other'
            ]
        }, {
            type: 'Disposable',
            spec: [
                'B&W',
                'Color'
            ]
        }, {
            type: 'Film',
            spec: [
                'Short'
            ]
        }, ];

        function setMediumSpecs() {
            var key = null;
            for (var i = 0; i < vm.mediums.length; i++) {
                if (vm.mediums[i].type === vm.mediumType) {
                    key = i;
                }
            }
            vm.mediumSpecs = vm.mediums[key].spec;
        }

        function clear() {
            vm.mediumType = null;
            vm.mediumSpec = null;
            vm.date = null;
            vm.mediumSpecs = [];
            vm.file = null;
            vm.title = null;
        }

        function submit() {
            if (vm.file && vm.title && vm.mediumType) {
                vm.upload(vm.file);
            }
        }

        function upload(file) {
            Upload.upload({
                url: '/api/post',
                data: {
                    file: file
                }
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    }

})();
