/***
 Metronic AngularJS App Main Script
 ***/

angular.module('adminRouteModule', []).config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('admin_change_password', {
      url: "/admin_change_password",
      templateUrl: "views/admin/changePassword.html",
      data: {
        pageTitle: 'เปลี่ยนรหัสผ่าน'
      },
      controller: "changePasswordController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            serie: true,
            files: [
              'assets/global/plugins/icheck/skins/all.css',
              'assets/global/plugins/icheck/icheck.min.js',

              'js/controllers/admin/changePasswordController.js'
            ]
          });
        }]
      }
    });
});
