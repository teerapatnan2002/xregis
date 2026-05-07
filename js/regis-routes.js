/***
 Metronic AngularJS App Main Script
 ***/

angular.module('regisRouteModule', []).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('regis_datectrl', {
            url: "/regis_datectrl",
            templateUrl: "views/regis/datectrl.html",
            data: {
                pageTitle: 'ข้อมูล กำหนดปีการศึกษา'
            },
            controller: "datectrlController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/scripts/bootstrap-datepicker-master/css/bootstrap-datepicker.min.css',
                            'js/scripts/bootstrap-datepicker-master/js/bootstrap-datepicker.min.js',
                            'js/scripts/bootstrap-datepicker-master/locales/bootstrap-datepicker.th.min.js',

                            'js/controllers/regis/datectrlController.js'
                        ]
                    });
                }]
            }
        })
        .state('regis_adviser', {
            url: "/regis_adviser",
            templateUrl: "views/regis/adviser.html",
            data: {
                pageTitle: 'ข้อมูล บันทึกอาจารย์ที่ปรึกษา'
            },
            controller: "adviserController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/regis/adviserController.js'
                        ]
                    });
                }]
            }
        })
        .state('regis_adviser_detail', {
            url: "/regis_adviser_detail/:idx",
            templateUrl: "views/regis/adviser_detail.html",
            data: {
                pageTitle: 'ข้อมูล บันทึกอาจารย์ที่ปรึกษา'
            },
            controller: "adviser_detailController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/regis/adviser_detailController.js'
                        ]
                    });
                }]
            }
        })
        .state('regis_bachregist', {
            url: "/regis_bachregist",
            templateUrl: "views/regis/bach_regist.html",
            data: {
                pageTitle: 'ลงทะเบียนรายวิชา'
            },
            controller: "bach_registController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/regis/bach_registController.js'
                        ]
                    });
                }]
            }
        })
        .state('update_stdfile', {
            url: "/update_stdfile",
            templateUrl: "views/regis/update_stdfile.html",
            data: {
                pageTitle: 'ปรับปรุงที่อยู่ปัจจุบัน'
            },
            controller: "update_stdfileController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/scripts/bootstrap-datepicker-master/css/bootstrap-datepicker.min.css',
                            'js/scripts/bootstrap-datepicker-master/js/bootstrap-datepicker.min.js',
                            'js/scripts/bootstrap-datepicker-master/locales/bootstrap-datepicker.th.min.js',

                            'js/controllers/regis/update_stdfileController.js'
                        ]
                    });
                }]
            }
        })
        .state('regis_examfile_gradef', {
            url: "/regis_examfile_gradef",
            templateUrl: "views/regis/examfile_gradef.html",
            data: {
                pageTitle: 'รายวิชาขาดสอบ'
            },
            controller: "examfile_gradefController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',
                            'js/scripts/EasyQRCodeJS/dist/easy.qrcode.min.js',

                            'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js',
                            'assets/global/plugins/bootstrap-sweetalert/sweetalert.css',

                            'js/controllers/regis/examfile_gradefController.js'
                        ]
                    });
                }]
            }
        })
      .state('regis_student_class_review', {
          url: "/regis_student_class_review",
          templateUrl: "views/regis/studentClassReview.html",
          data: {
              pageTitle: 'ประเมินการเรียนการสอน'
          },
          controller: "studentClassReviewController",
          resolve: {
              deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'MetronicApp',
                      insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                      serie: true,
                      files: [
                          'assets/global/plugins/icheck/skins/all.css',
                          'assets/global/plugins/icheck/icheck.min.js',
                          '../assets/global/plugins/sweetalert2/dist/sweetalert2.min.js',
                          '../assets/global/plugins/sweetalert2/dist/sweetalert2.min.css',

                          'js/controllers/regis/studentClassReviewController.js'
                      ]
                  });
              }]
          }
      })
});
