/**
 * Created by narasak.man on 5/22/2017 AD.
 */
/***
 Metronic AngularJS App Main Script
 ***/

angular.module('accouRouteModule', []).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('accou_credit_price', {
            url: "/credit_price",
            templateUrl: "views/accou/credit_price.html",
            data: {
                pageTitle: 'กำหนดค่าหน่วยกิต'
            },
            controller: "creditPriceController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        serie: true,
                        files: [
                            'assets/global/plugins/icheck/skins/all.css',
                            'assets/global/plugins/icheck/icheck.min.js',

                            'js/controllers/accou/creditPriceController.js'
                        ]
                    });
                }]
            }
        });
});