/**
 * Created by narasak.man on 5/22/2017 AD.
 */
/***
 Metronic AngularJS App Main Script
 ***/

angular.module('finanRouteModule', []).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('finan_batch_regisbillpayment_reprint', {
      url: "/regisbillpayment",
      templateUrl: "views/regis/batch_registbillpayment_reprint.html",
      data: {
        pageTitle: 'พิมพ์ใบแจ้งการชำระเงินใหม่'
      },
      controller: "batchRegistBillPaymentController",
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

              'js/controllers/finan/batchRegistBillPaymentController.js'
            ]
          });
        }]
      }
    })
    .state('finan_billpayment_stdacct_remain', {
      url: "/finan_billpayment_stdacct_remain",
      templateUrl: "views/finan/billpayment_stdacct_remain.html",
      data: {
        pageTitle: 'พิมพ์ใบแจ้งการชำระเงิน (งวดค้างชำระ)'
      },
      controller: "billpayment_stdacct_remainController",
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

              'js/controllers/finan/billpayment_stdacct_remainController.js'
            ]
          });
        }]
      }
    })
    .state('finan_bach_registconfirm', {
      url: "/registconfirm",
      templateUrl: "views/regis/regisconfirm.html",
      data: {
        pageTitle: 'ยืนยันลงทะเบียน'
      },
      controller: "bachRegistConfirmController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            serie: true,
            files: [
              'assets/global/plugins/icheck/skins/all.css',
              'assets/global/plugins/icheck/icheck.min.js',

              'js/controllers/finan/bachRegistConfirmController.js'
            ]
          });
        }]
      }
    })
    .state('finan_bill_payment_fee', {
      url: "/billpaymentfee",
      templateUrl: "views/finan/bill-payment-fee.html",
      data: {
        pageTitle: 'พิมพ์ใบแจ้งการชำระเงิน สำหรับค่าธรรมเนียมต่าง ๆ'
      },
      controller: "billPaymentFeeController",
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

              'js/controllers/finan/billPaymentFeeController.js'
            ]
          });
        }]
      }
    })
    .state('finan_bill_payment_fee_graduate', {
      url: "/billpaymentfeegraduate",
      templateUrl: "views/finan/bill-payment-fee-graduate.html",
      data: {
        pageTitle: 'พิมพ์ใบแจ้งการชำระเงินสำหรับค่าธรรมเนียมขอจบการศึกษา'
      },
      controller: "billPaymentFeeGraduateController",
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

              'js/controllers/finan/billPaymentFeeGraduateController.js'
            ]
          });
        }]
      }
    })
    .state('finan_bach_billpayment_monthly', {
      url: "/finan_bach_billpayment_monthly",
      templateUrl: "views/finan/bach_billpayment_monthly.html",
      data: {
        pageTitle: 'ออกใบแจ้งการชำระเงิน'
      },
      controller: "bach_billpayment_monthlyController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            serie: true,
            files: [
              'assets/global/plugins/icheck/skins/all.css',
              'assets/global/plugins/icheck/icheck.min.js',
              'assets/pages/css/profile-2.min.css',
              'assets/global/plugins/bootstrap/js/bootstrap.min.js',

              'js/scripts/EasyQRCodeJS/dist/easy.qrcode.min.js',

              'assets/global/plugins/bootstrap-sweetalert/sweetalert.min.js',
              'assets/global/plugins/bootstrap-sweetalert/sweetalert.css',

              'js/controllers/finan/bach_billpayment_monthlyController.js'
            ]
          });
        }]
      }
    })
    .state('finan_check_payment', {
      url: "/finan_check_payment",
      templateUrl: "views/finan/check_payment.html",
      data: {
        pageTitle: 'ตรวจสอบการชำระเงิน'
      },
      controller: "checkPaymentController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            serie: true,
            files: [
              'assets/global/plugins/icheck/skins/all.css',
              'assets/global/plugins/icheck/icheck.min.js',

              'js/controllers/finan/checkPaymentController.js'
            ]
          });
        }]
      }
    })
    .state('finan_bill_electric', {
      url: "/finan_bill_electric",
      templateUrl: "views/finan/bill-electric.html",
      data: {
        pageTitle: 'ค่าหอพัก-ค่านำ้-ค่าไฟฟ้า'
      },
      controller: "billElectricController",
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

              'js/controllers/finan/billElectricController.js'
            ]
          });
        }]
      }
    })
    .state('finan_manual_bill_register', {
      url: "/finan_manual_bill_register",
      templateUrl: "views/finan/manual_bill_register.html",
      data: {
        pageTitle: 'ใบแจ้งชำระค่าลงทะเบียน ภาค 1/2563'
      },
      controller: "manualBillRegisterController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'MetronicApp',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            serie: true,
            files: [
              'assets/global/plugins/icheck/skins/all.css',
              'assets/global/plugins/icheck/icheck.min.js',

              'js/controllers/finan/manualBillRegisterController.js'
            ]
          });
        }]
      }
    })
    .state('finan_fee_graduate_ceremony', {
      url: "/fee_graduate_ceremony",
      templateUrl: "views/finan/feeGraduateCeremony.html",
      data: {
        pageTitle: 'ค่าเข้าร่วมพิธีประสาทปริญญาบัตร'
      },
      controller: "feeGraduateCeremonyController",
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

              'js/controllers/finan/feeGraduateCeremonyController.js'
            ]
          });
        }]
      }
    })
    .state('finan_order_student_uniform', {
      url: "/finan_order_student_uniform",
      templateUrl: "views/finan/orderStudentUniform.html",
      data: {
        pageTitle: 'สั่งจองเครื่องแต่งกายนิสิต'
      },
      controller: "orderStudentUniformController",
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

              'js/controllers/finan/orderStudentUniformController.js'
            ]
          });
        }]
      }
    })
    .state('finan_QrPaymentOwe', {
      url: "/finan_QrPaymentOwe",
      templateUrl: "views/finan/QrPaymentOwe.html",
      data: {
        pageTitle: 'ชำระเงินค้างชำระ'
      },
      controller: "QrPaymentOweController",
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

              'js/controllers/finan/QrPaymentOweController.js'
            ]
          });
        }]
      }
    })

});
