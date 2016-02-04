(function() {
    'use strict';

    angular
        .module('Admin')
        .controller('NewPost', newPost);

    newPost.$inject = ['Upload', 'MediaService'];

    function newPost(Upload, MediaService) {
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
            vm.progress = 0;
            vm.uploading = false;
            vm.error = null;
        }

        function upload(file) {
            Upload.upload({
                url: '/api/post',
                data: {
                    file: file,
                    title: vm.title,
                    type: vm.mediumType,
                    spec: vm.mediumSpec,
                    date: vm.date
                }
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                MediaService.loadData();
                vm.clear();
            }, function(resp) {
                console.log('Error status: ' + resp.status);
                vm.error = 'Sorry, ' + resp.statusText;
            }, function(evt) {
                vm.uploading = true;
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                vm.progress = progressPercentage;
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    }

})();
