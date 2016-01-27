(function() {
    'use strict';

    angular
        .module('App')
        .controller('NewPost', _newPost);

    _newPost.$inject = [];

    function _newPost() {
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
        vm.uploadPost = uploadPost;
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

        function uploadPost(post) {
            
        }
    }

})();
