/***
 Metronic AngularJS App Main Script
 ***/

angular.module('docuRouteModule', []).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('docum_externaltransferupload', {
            url: "/docum_externaltransferupload",
            templateUrl: "views/docum/externaltransferupload.html",
            data: {
                pageTitle: 'อัพโหลดเอกสารเทียบโอนรายวิชา'
            },
            controller: "externaltransferuploadController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/docum/externaltransferuploadController.js'
                        ]
                    });
                }]
            }
        })
        .state('docum_studentdocumentupload', {
            url: "/docum_studentdocumentupload",
            templateUrl: "views/docum/studentdocumentupload.html",
            data: {
                pageTitle: 'อัพโหลดเอกสารการสมัครเรียน'
            },
            controller: "studentdocumentuploadController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/docum/studentdocumentuploadController.js'
                        ]
                    });
                }]
            }
        })
});