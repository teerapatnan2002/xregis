'use strict';

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ngSanitize",
  "kendo.directives",
  'regisRouteModule', 'accouRouteModule', 'finanRouteModule', 'docuRouteModule',
  'adminRouteModule',
  'wemsFactory', 'amplifyFactory', 'storeFactory',
  'ngAnimate',
  'ui.bootstrap',
  'toastr',
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // global configs go here
  });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

MetronicApp.config(['$httpProvider', function ($httpProvider) {

  $httpProvider.interceptors.push(['settings', function (settings) {
    return {
      'request': function (config) {
        //console.log('test httpProvider  config.headers.Authorization ');
        //console.log(settings);
        var token = settings.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = token;
        }
        return config;
      }
    };
  }]);
}]);

//toastr Config
MetronicApp.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: true,
    closeButton: true,
    extendedTimeOut: 1000,
    progressBar: false,
    timeOut: 5000,
    tapToDismiss: false,
  });
});

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', 'storeFactory', function ($rootScope, storeFactory) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: '../assets',
    globalPath: '../assets/global',
    layoutPath: '../assets/layouts/layout',

    sarunrdPath: 'js/sarunrd/',
    crypto_password: 'sarun.rd',

    PrivateKey: UUID.generate(), // actas UUID   must have priv-key when after login or not ?

    userSignin_info: {
      Token: '',
      User_Idx: 0,
      UserLogin: '',
      UserFullName: '',
      UserImageUrl: '',
      UserGroupCode: '',

      IsAdmin: false,
      IsTeacher: false,
      IsStudent: false
    },
    client_ip: '',
    getToken: function () {
      return this.userSignin_info.Token;
    },
    getUser_Idx: function () {
      return this.userSignin_info.User_Idx;
    },
    getUserLogin: function () {
      return this.userSignin_info.UserLogin;
    },
    getUserFullName: function () {
      return this.userSignin_info.UserFullName;
    },
    getUserImageUrl: function () {
      return this.userSignin_info.UserImageUrl;
    },
    IsAdmin: function () {
      return this.userSignin_info.IsAdmin;
    },
    doUpdate_UserSignin: function (payload) {
      this.PrivateKey = payload.PrivateKey;
      this.userSignin_info.Token = payload.Token;
      this.userSignin_info.User_Idx = payload.User_Idx;
      this.userSignin_info.UserLogin = payload.UserLogin;
      this.userSignin_info.UserFullName = payload.UserFullName;
      this.userSignin_info.UserImageUrl = payload.UserImageUrl;
      this.userSignin_info.UserGroupCode = payload.UserGroupCode;

      if (payload.UserGroupCode === 'ADM') {
        this.userSignin_info.IsAdmin = true;

        this.userSignin_info.IsTeacher = false;
        this.userSignin_info.IsStudent = false;
      }
      if (payload.UserGroupCode === 'TCH') {
        this.userSignin_info.IsTeacher = false;

        this.userSignin_info.IsAdmin = false;
        this.userSignin_info.IsStudent = true;
      }
      if (payload.UserGroupCode === 'STU') {
        this.userSignin_info.IsStudent = false;

        this.userSignin_info.IsAdmin = true;
        this.userSignin_info.IsTeacher = false;
      }
      $rootScope.$emit('UserSignin_Changed');
    },
    doUpdate_Signout: function () {
      // console.log('  do doClear() .....');

      this.enableUpdateStaffStatus = false;

      this.userSignin_info.User_Idx = 0;
      this.userSignin_info.Token = '';
      this.userSignin_info.UserFullName = '';
      this.userSignin_info.UserImageUrl = '';

      storeFactory.RemoveLocal('Token');

      $rootScope.$emit('UserSignin_Changed');
    },
    tempObj: {},

    datSM_STDFILE: {},
    is_online: false,

    std_blacklist: {},
    std_blacklist_show: false,
    std_electric_bill_show: false,
    std_register_blacklist: {},
    std_register_blacklist_show: false,

    ExternalTransferWorkFlow: null,
    StudentDocumentWorkFlow: null,
    isStudentDocumentOffLimit: false,
    hasManualBillRegister: false,
  };

  $rootScope.settings = settings;

  return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on('$viewContentLoaded', function () {
    //App.initComponents(); // init core components
    //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
  });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', function ($rootScope, $scope, $state, $window, settings, toastr, wemsFactory, $uibModal, storeFactory) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initHeader(); // init header
  });

  $scope.IsUserAuthenticated = false;
  $scope.UserFullName = '';

  $rootScope.$on('OnSettingsChanged', function (event) {
    //console.log('OnSettingsChanged ');
    /// refresh image load
    //$scope.UserLoginPictureUrl = pict + '?timestamp=' + new Date().getTime();
    //$scope.$apply();
    //console.log(settings);
    $scope.IsUserAuthenticated = false;
    if (settings.User_Idx > 0) {
      $scope.IsUserAuthenticated = true;
      $scope.UserFullName = settings.UserFullName;

      // console.log('  set  IsUserAuthenticated  to TRUE 3........ ')
    } else $scope.IsUserAuthenticated = false;
    //$scope.$apply();
  });

  $scope.doneUserLogout = function () {
    //console.log('doneLogin');
    var obj = {
      UserLogin: settings.getUserLogin(),
      PrivateKey: settings.PrivateKey
    };
    //console.log(params);
    var promise = wemsFactory.postActionJson('/user/logout', obj);
    promise.then(
        function (jsonObj) {
          //console.log(jsonObj);

          $scope.IsAuthenticated = false;

          storeFactory.RemoveLocal('Token');
          storeFactory.RemoveLocal('PrivateKey');

          settings.doUpdate_Signout();

          $rootScope.$broadcast('OnSettingsChanged');

          $window.location.href = '/index_login.html';

          //toastr.success(value.Message, 'รายงานผล');
        },
      function (reason) {
        toastr.error(reason.statusCode + ': ' + reason.error + '<br/>' + reason.message, 'มีข้อผิดพลาด');
      });
  };

  $scope.goChangePassword = function () {
    $state.go("admin_change_password");
  };

});

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$rootScope', '$state', '$scope', 'settings', function ($rootScope, $state, $scope, settings, $location) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initSidebar($state); // init sidebar
  });

  var report = new Report();
  $scope.linkReportTranscriptInformal = report.config.url + 'regis/TranscriptInformal.html?std_id='; //get user_id from sidebar page

  $scope.linkReportCoursePlanDetailGrade = report.config.url + 'regis/CoursePlanDetailGrade.html' +
      '?std_id_to=&stdtransfertype_id=&stdcenter_id=&stdstatus_id=' +
      '&campus_id=&factype_id=&division_id=&department_id=&concentrate_id=&zone_id=&std_id_from=' //get user_id from sidebar page


  /* MINOVATE */
  $scope.oneAtATime = false;
  $scope.status = {
    isFirstOpen: true,
    isSecondOpen: true,
    isThirdOpen: true
  };


  $scope.onMenuClick = function(program){
    $scope.currentProgram = program;
    $state.go(program.Controller);
  }

  $scope.getCurrentProgram = function(){
    let state = $location.absUrl().split('/');
    state = state[state.length - 1];
    $scope.currentProgram = _.findWhere($scope.tbProgram, {
      Controller: state
    });
  }

}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    setTimeout(function () {
      QuickSidebar.init(); // init quick sidebar
    }, 2000)
  });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Demo.init(); // init theme panel
  });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initFooter(); // init footer
  });
}]);

/* MINOVA Setup  */
MetronicApp.controller('MainCtrl', function ($scope, $http) {

  $scope.main = {
    title: 'Minovate',
    settings: {
      navbarHeaderColor: 'scheme-default',
      sidebarColor: 'scheme-default',
      brandingColor: 'scheme-default',
      activeColor: 'default-scheme-color',
      headerFixed: true,
      asideFixed: true,
      rightbarShow: false
    }
  };

  /*$scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.currentLanguage = langKey;
  };
  $scope.currentLanguage = $translate.proposedLanguage() || $translate.use();*/
});

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
      // Dashboard
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        data: {
          pageTitle: 'Dashboard'
        },
        controller: "DashboardController",
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'MetronicApp',
              insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
              files: [
                // '../assets/global/plugins/morris/morris.css',
                // '../assets/global/plugins/morris/morris.min.js',
                // '../assets/global/plugins/morris/raphael-min.js',
                // '../assets/global/plugins/jquery.sparkline.min.js',


                // '../assets/apps/scripts/calendar.min.js',
                '../assets/global/plugins/fullcalendar/fullcalendar.min.css',
                '../assets/global/plugins/fullcalendar/fullcalendar.min.js',
                // '../assets/global/plugins/fullcalendar/lang/th.js',
                // '../assets/global/plugins/fullcalendar/lang-all.js',

                '../assets/global/plugins/counterup/jquery.counterup.min.js',
                '../assets/global/plugins/counterup/jquery.waypoints.min.js',

                '../assets/pages/scripts/dashboard.min.js',
                'js/controllers/DashboardController.js',
              ]
            });
          }]
        }
      })

      // User Profile
      .state("profile", {
        url: "/profile",
        templateUrl: "views/profile/main.html",
        data: {
          pageTitle: 'User Profile'
        },
        controller: "UserProfileController",
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'MetronicApp',
              insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
              files: [
                '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                '../assets/pages/css/profile.css',

                '../assets/global/plugins/jquery.sparkline.min.js',
                '../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                '../assets/pages/scripts/profile.min.js',

                'js/controllers/UserProfileController.js'
              ]
            });
          }]
        }
      })

      // User Profile Dashboard
      .state("profile.dashboard", {
        url: "/dashboard",
        templateUrl: "views/profile/dashboard.html",
        data: {
          pageTitle: 'User Profile'
        }
      })

      // User Profile Account
      .state("profile.account", {
        url: "/account",
        templateUrl: "views/profile/account.html",
        data: {
          pageTitle: 'User Account'
        }
      })

      // User Profile Help
      .state("profile.help", {
        url: "/help",
        templateUrl: "views/profile/help.html",
        data: {
          pageTitle: 'User Help'
        }
      })

}]);

/* Init global settings and run the app */
MetronicApp.run(function ($rootScope, $state, $window, $http, settings, toastr, wemsFactory, $uibModal, storeFactory) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view

  //MINOVA THEME
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {

    event.targetScope.$watch('$viewContentLoaded', function () {

      angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

      setTimeout(function () {
        angular.element('#wrap').css('visibility','visible');

        if (!angular.element('.dropdown').hasClass('open')) {
          angular.element('.dropdown').find('>ul').slideUp();
        }
      }, 200);
    });
    $rootScope.containerClass = toState.containerClass;
  });

  settings.client_ip = '127.0.0.1';
  $.getJSON('//api.ipify.org?format=jsonp&callback=?', function (data) {
    //console.log(JSON.stringify(data, null, 2));
    //console.log(typeof data);
    // console.log('ipify -> ' + data.ip);
    settings.client_ip = data.ip;
  });

  $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
    var local_token = storeFactory.GetLocal('Token');
    if (_.isUndefined(local_token) || local_token.isEmpty()) {
      //console.log('   if (_.isUndefined(token)) { current: ' + current);
      //console.log('   if (_.isUndefined(token)) { next:    ' + next);
      /// check token already ?
      // console.log(' ****** MetronicApp.run  ==>  locationChangeSuccess');
      //alert('333 OK Moveto Login Page !!! ' + newUrl + ' <> ' + oldUrl);
      if (newUrl !== oldUrl) {
        $window.location.href = '/index_login.html';
        //prevent navigation by default since we'll handle it
        //once the user selects a dialog option
        event.preventDefault();
      }
    }
  });
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //console.log(' ****** MetronicApp.run  ==>  locationChangeStart');

    var local_token = storeFactory.GetLocal('Token');
    //console.log('   local_token = ' + local_token);
    //console.log('                 ' + settings.userSignin_info.Token);

    if (_.isUndefined(local_token) || local_token.isEmpty()) {
      $window.location.href = '/index_login.html';
      event.preventDefault();
      return;
    }

    if (local_token && local_token !== settings.userSignin_info.Token) {
      //console.log('   if (token && token !== settings.Token) {');
      //console.log('   verify token ???????? Oh yes.');

      //console.log('   if (_.isUndefined(token)) { current: ' + current);
      //console.log('   if (_.isUndefined(token)) { next:    ' + next);

      //console.log('   check_usersignin_token  ');
      check_usersignin_token(local_token, function (success) {
        //console.log('success = ' + success);

        if (!success) {
          $window.location.href = '/index_login.html';
          event.preventDefault();
          return;
        }

        /// check student blacklist
        check_student_blacklist(function () {
          // console.log('#1  after  check_student_blacklist !!!');
        });

        checkManualBillRegister();
      });

      return;
    }

    if (local_token && settings.userSignin_info.User_Idx === 0) {
      //console.log('   if (settings.userSignin_info.User_Idx === 0) {  ');
      /// check token already ?

      //console.log('   if (_.isUndefined(token)) { current: ' + current);
      //console.log('   if (_.isUndefined(token)) { next:    ' + next);
      //if (next.indexOf('staff-signin') === -1)
      //    $location.path('/staff-signin');

      //console.log('   check_usersignin_token  ');
      check_usersignin_token(local_token, function (success) {
        if (!success) {
          $window.location.href = '/index_login.html';
          event.preventDefault();
          return;
        }

        /// check student blacklist
        console.log('check student blacklist')
        check_student_blacklist(function () {
          // console.log('#2  after  check_student_blacklist !!!');
        });

        checkManualBillRegister();
      });

    }
  });

  ///////////////////////
  /// check Token is ok ?
  var check_usersignin_token = function (token, callback) {
    //console.log('   var check_token = function (token) { ' + token);
    var obj = {
      Token: token
    };
    var promise = wemsFactory.postActionJson('/user/check_token', obj);
    promise.then(
        function (jsonObj) {
          //console.log('  /user/check_token jsonObj  **********************');
          //console.log('jsonObj ' + typeof jsonObj);
          //console.log(jsonObj);

          if (settings.PrivateKey !== jsonObj.PrivateKey) {
            //console.log('>> found PrivateKey mismatch <<');
            //settings.PrivateKey = jsonObj.PrivateKey;
            storeFactory.SetLocal('PrivateKey', jsonObj.PrivateKey);
          }

          /// update settings
          settings.doUpdate_UserSignin(jsonObj);

          get_userstudent_info(settings.userSignin_info.User_Idx, function (success) {
            if (success) {
              storeFactory.SetLocal('Token', jsonObj.Token);
            }

            //toastr.success('รายงานผล<br/> ' + 'Welcome ' + jsonObj.UserFullName);
            callback(success);
          });
        },
        function (reason) {
          //console.log(reason);
          toastr.error('มีข้อผิดพลาด<br/> ' + reason.message);

          settings.doUpdate_Signout();

          //$window.location.href = '/index_login.html';
          callback(false);
        });
  };

  ///////////////////////
  /// get User STudent Info ?
  var get_userstudent_info = function (User_Idx, callback) {
    //console.log('   var get_userstudent_info = function (token) { ' + User_Idx);
    var obj = {
      User_Idx: User_Idx
    };
    var promise = wemsFactory.postActionJson('/user/get_user_info', obj);
    promise.then(
        function (jsonObj) {
          //console.log('  /user/get_user_info jsonObj  **********************');
          //console.log('jsonObj ' + typeof jsonObj);
          // console.log('get_user_info');
          // console.log(jsonObj);

          //toastr.success('รายงานผล<br/> ' + 'Welcome ' + jsonObj.UserFullName);
          settings.datSM_STDFILE = jsonObj.datSM_STDFILE;
          settings.datSM_CURRICULUM = jsonObj.datSM_CURRICULUM;

          settings.ExternalTransferWorkFlow = jsonObj.ExternalTransferWorkFlow;
          settings.StudentDocumentWorkFlow = jsonObj.StudentDocumentWorkFlow;
          settings.isStudentDocumentOffLimit = jsonObj.isStudentDocumentOffLimit;

          $rootScope.settings.datSM_STDFILE = jsonObj.datSM_STDFILE;
          $rootScope.settings.datSM_CURRICULUM = jsonObj.datSM_CURRICULUM;

          if (jsonObj.datSM_STDFILE.zonegroup === '20') {
            settings.is_online = true;
          }
          else if (jsonObj.datSM_STDFILE.zonegroup === '10' && jsonObj.datSM_STDFILE.studylevel_id === '1') {
            settings.is_online = true;
          }
          else {
            settings.is_online = false;
          }

          // console.log('settings.is_online',settings.is_online)

          if (jsonObj.datSM_STDFILE.stdstatus_id != 'S') {
            settings.std_terminate = true;

            settings.stdstatus_nameth = jsonObj.datSM_STDSTATUS.stdstatus_nameth;

            return;
          }

          callback(true);
        },
        function (reason) {
          //console.log(reason);
          toastr.error('มีข้อผิดพลาด<br/> ' + reason.message);

          //$window.location.href = '/index_login.html';
          callback(false);
        });
  };

  ///////////////////////
  /// check student blacklist is ok ?
  var check_student_blacklist = function (callback) {
    //console.log('   check_student_blacklist  ');
    //console.log('   check_student_blacklist  ' + _.isUndefined(settings.student_blacklist));

    //var std_id = '5907010015';
    var std_id = settings.getUserLogin();
    //console.log(std_id);

    if (_.isUndefined(settings.students_blacklist)) {
      $http.get('std_blacklist.json').success(function (result) {
        //console.log(result);
        settings.students_blacklist = result;

        var dat = _.where(settings.students_blacklist, {
          std_id: std_id
        });
        console.log('students_blacklist', dat);
        settings.std_blacklist = dat ? dat : {};
        settings.std_blacklist_show = !_.isEmpty(settings.std_blacklist);
        let billElectric = _.findWhere(settings.std_blacklist, function (element) {
          return element.remark.indexOf('ค่าไฟฟ้า') > 0
        });
        settings.std_electric_bill_show = billElectric ? true : false;
      });
    } else {
      var dat = _.findWhere(settings.students_blacklist, {
        std_id: std_id
      });
      console.log('students_blacklist 2', dat);
      settings.std_blacklist = dat ? dat : {};
      settings.std_blacklist_show = !_.isEmpty(settings.std_blacklist);
      let billElectric = _.findWhere(settings.std_blacklist, function (element) {
        // console.log(element);
        return element.remark.indexOf('ค่าไฟฟ้า') > 0
      });
      settings.std_electric_bill_show = billElectric ? true : false;
    }

    if (_.isUndefined(settings.students_register_blacklist)) {
      $http.get('std_register_blacklist.json').success(function (result) {
        //console.log(result);
        settings.students_register_blacklist = result;

        var datRegister = _.where(settings.students_register_blacklist, {
          std_id: std_id
        });
        //console.log(dat);
        settings.std_register_blacklist = datRegister ? datRegister : {};
        settings.std_register_blacklist_show = !_.isEmpty(settings.std_register_blacklist);
      });
    } else {
      var datRegister = _.findWhere(settings.student_blacklist, {
        std_id: std_id
      });
      settings.std_register_blacklist = datRegister ? datRegister : {};
      settings.std_register_blacklist_show = !_.isEmpty(settings.std_register_blacklist);
    }

    // console.log('settings.std_register_blacklist_show',settings.std_register_blacklist_show)
  };

  var checkManualBillRegister = function () {
    var std_id = settings.getUserLogin();
    // console.log('std_id', std_id)

    $http.get(`upload/finan/manual_bill_register/${std_id}.pdf`)
        .success(function (result) {
          if (result) {
            settings.hasManualBillRegister = true;
          } else {
            settings.hasManualBillRegister = false;
          }
        }).error(function (error) {
           settings.hasManualBillRegister = false;
        });

  }

});
