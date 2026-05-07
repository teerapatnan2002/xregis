angular.module('MetronicApp').controller('DashboardController', function ($rootScope, $filter, settings, $scope, toastr, wemsFactory, $uibModal, $http, $timeout, storeFactory) {
  $scope.$on('$viewContentLoaded', function () {
    // initialize core components
    //App.initAjax();

    $('[data-toggle="tooltip"]').tooltip();


    $('#examCalendar').fullCalendar(
      {
        // defaultView: 'month',
        header:
          {
            left: 'title',
            right: 'prev,next,today,month,basicWeek,basicDay'
          },
        eventLimit: true, // allow "more" link when too many events
        displayEventTime: false, // allow "more" link when too many events
        // timeFormat: 'h:mm', // uppercase H for 24-hour clock
        eventRender: function (eventObj, $el) {
          $el.popover({
            title: eventObj.title,
            content: eventObj.startTime + 'น.-' + eventObj.endTime + 'น. ' + eventObj.description,
            trigger: 'hover',
            placement: 'top',
            container: 'body'
          });
        },
        lang: 'th',
        events: [],
      }
    );
    $scope.loadCacheThenDataTable();
  });

  // เทส
  // 5906020081
  // 1960300111967
  $scope.std_id = settings.getUserLogin();
  $scope.pageTitle = $scope.$state.get('dashboard').data.pageTitle;

  // set sidebar closed and body solid layout mode
  $rootScope.settings.layout.pageContentWhite = true;
  $rootScope.settings.layout.pageBodySolid = false;
  $rootScope.settings.layout.pageSidebarClosed = false;

  $scope.showExamTable = false;
  $scope.showOutStanding = false;
  $scope.dataExamTable = [];

  $scope.dashboardData = {
    cm_crd_earn: 0,
    totalcredit: 0,
    credit_earn_percent: 0,
    cgpa: 0,
  };

  if ($rootScope.settings.datSM_STDFILE.std_id) {
    $scope.dashboardData.cm_crd_earn = $rootScope.settings.datSM_STDFILE.cm_crd_earn;
    storeFactory.Set('cm_crd_earn', $scope.dashboardData.cm_crd_earn); /// remember  for auto select, when come back

    $scope.dashboardData.totalcredit = $rootScope.settings.datSM_CURRICULUM.totalcredit;
    storeFactory.Set('totalcredit', $scope.dashboardData.totalcredit); /// remember  for auto select, when come back

    // $scope.dashboardData.cgpa = $rootScope.settings.datSM_STDFILE.cgpa;
    if ($scope.SM_GRDCGPA && $scope.SM_GRDCGPA.length > 0) {
      $scope.dashboardData.cgpa = $scope.SM_GRDCGPA[$scope.SM_GRDCGPA.length - 1].cgpa;
      storeFactory.Set('cgpa', $scope.dashboardData.cgpa); /// remember  for auto select, when come back
    }
  } else {
    $scope.dashboardData.cm_crd_earn = storeFactory.Get('cm_crd_earn');
    $scope.dashboardData.totalcredit = storeFactory.Get('totalcredit');
    $scope.dashboardData.cgpa = storeFactory.Get('cgpa');
  }

  // $scope.dashboardData.totalcredit = 229;
  $scope.dashboardData.credit_earn_percent = Math.round(($scope.dashboardData.cm_crd_earn / $scope.dashboardData.totalcredit) * 100);

  $scope.SM_PROFILE = {};
  $scope.SM_GRDCGPA = [];
  $scope.SM_EDUYEAR_SEM = [];
  $scope.SM_GRDFILE = [];
  $scope.SM_GRDFILE_filter = [];

  $scope.gpaChartOption = {
    // title: { text: "ข้อมูลผลการเรียน" },
    dataSource: new kendo.data.DataSource({
      transport: {
        read: function (e) {
          e.success($scope.SM_GRDCGPA);
        }
      },
    }),
    // theme: 'black',
    seriesDefaults: {
      type: "line",
    },
    series: [
      {
        field: "gpa",
        name: "เกรดเฉลี่ยต่อภาค",
        color: "#65c4e0",
        noteTextField: "showGpa",
        notes: {
          label: {
            position: "outside",
            background: "#65c4e0"
          },
          position: "top"
        }
      },
      {
        field: "cgpa",
        name: "เกรดเฉลี่ยสะสม",
        color: "#d92800",
        noteTextField: "showCgpa",
        notes: {
          label: {
            position: "outside",
            background: "#d92800",
            color: "#ffffff"
          },
          position: "bottom"
        }
      },
    ],
    legend: {
      position: "bottom"
    },
    valueAxis: {
      labels: {
        format: "{0}",
        step: 1
      }
    },
    categoryAxis: {
      field: 'edu_year_sem',
      // title: {
      //     text: 'ปี/ภาค'
      // }
    },
    tooltip: {
      visible: true,
      template: '#: series.name#: #: value#'
    },

    zoomable: true,
  };

  $scope.examContactInformation = ''

  /*$scope.creditChartOption = {
      // title: { text: "ข้อมูลผลการเรียน" },
      dataSource: new kendo.data.DataSource({
          transport: {
              read: function (e) {
                  e.success($scope.SM_GRDCGPA);
              }
          },
      }),
      // theme: 'black',
      seriesDefaults: {
          type: "pie",
      },
      series: [
          {
              field: "gpa",
              name: "เกรดเฉลี่ยต่อภาค",
              color: "#65c4e0",
          },
          {
              field: "cgpa",
              name: "เกรดเฉลี่ยสะสม",
              color: "#d92800"
          },
      ],
      legend: {
          position: "bottom"
      },
      tooltip: {
          visible: true,
          template: '#: series.name#: #: value#'
      },

  };*/


  $scope.loadCacheThenDataTable = function () {
    $scope.$on('CacheDone', function () {
      /// do something after cache

      // $scope.mfnQueryData();
      $scope.getOutstandingRegister();
      $scope.getExamTable();
    });
    $scope.PrepareCache();
  };

  $scope.PrepareCache = function () {
    $scope.showSpin = true;
    var promise = wemsFactory.getActionAjax('/regis/stdfile/_get_dashboard/' + $scope.std_id);
    promise.then(
      function (data) {
        $scope.datSM_DATECTRL = data.SM_DATECTRL_filter[0];
        $scope.datSM_STDFILE_filter = data.SM_STDFILE_filter;
        $scope.SM_STD_ADVISER_filter = data.SM_STD_ADVISER_filter;
        $scope.SM_GRDCGPA = $scope.genCgpaChartData(data.SM_GRDCGPA);
        $scope.SM_EDUYEAR_SEM = data.SM_EDUYEAR_SEM;
        $scope.SM_GRDFILE_filter = data.SM_GRDFILE;
        $scope.SM_SEMESTER = data.SM_SEMESTER;
        $scope.SM_PROFILE = data.SM_PROFILE;

        //set gpa for show
        if ($scope.SM_GRDCGPA && $scope.SM_GRDCGPA.length > 0) {
          $scope.dashboardData.cgpa = $scope.SM_GRDCGPA[$scope.SM_GRDCGPA.length - 1].cgpa;
        } else if ($rootScope.settings.datSM_STDFILE.std_id) {
          $scope.dashboardData.cgpa = $rootScope.settings.datSM_STDFILE.cgpa
        }
        storeFactory.Set('cgpa', $scope.dashboardData.cgpa); /// remember  for auto select, when come back
        /*if ($().counterUp) {
            $("[data-counter='counterup']").counterUp({
                delay: 10,
                time: 1000
            });
        }*/
        $scope.gpaChartOption.dataSource.data($scope.SM_GRDCGPA);


        //set current edu_year_sem
        $scope.selectedEduYearSem = $scope.SM_EDUYEAR_SEM[0];
        $scope.SM_GRDFILE = _.filter($scope.SM_GRDFILE_filter, {
          edu_year: $scope.selectedEduYearSem ? $scope.selectedEduYearSem.edu_year : '',
          edu_sem: $scope.selectedEduYearSem ? $scope.selectedEduYearSem.edu_sem : ''
        });

        if($scope.SM_PROFILE.unv_name === 'มหาวิทยาลัยเวสเทิร์น'){
          $scope.examContactInformation = 'โทร. 02-026-6659 กด 2 > ต่อด้วย | กด 1 ป.ตรี | กด 2 ป.โทและป.เอก';
        }else if($scope.SM_PROFILE.unv_name === 'มหาวิทยาลัยเนชั่น') {
          $scope.examContactInformation = 'โทร. 02-026-6659 กด 2 > ต่อด้วย | กด 1 ป.ตรี | กด 2 ป.โทและป.เอก เป็น เบอร์ 0-5426-5170';
        }

      },
      function (reason) {
        console.log(reason);
        toastr.error(reason.statusCode + ': ' + reason.error + '<br/>' + reason.message, 'มีข้อผิดพลาด');
      })
      .finally(function () {
        $scope.showSpin = false;

        $scope.$emit('CacheDone');
        App.unblockUI('#blockui_portlet_body');
      });
  };

  $scope.getExamTable = function () {
    var formdata = {
      edu_year: $scope.datSM_DATECTRL.edu_year,
      edu_sem: $scope.datSM_DATECTRL.edu_sem,
      std_id: $scope.datSM_STDFILE_filter.std_id,
    };
    $scope.showSpin = true;
    var promise = wemsFactory.postActionJson('/acade/rptexamtable/done_query', formdata);
    promise.then(
      function (data) {
        if (!_.isUndefined(data) && data.length > 0) {
          $scope.showExamTable = true;
          $scope.dataExamTable = data;

          var events = [];
          _.each($scope.dataExamTable, function (element) {
            // if('123'.indexOf(element.edu_sem) > -1){
            let bgColor = 'bg-primary'
            if(element.canEnterExam !== undefined && element.canEnterExam !== null){
              if(element.canEnterExam === true){
                bgColor = 'bg-success'
              }else{
                bgColor = 'bg-danger'
              }
            }
            var event = {
              title: element.course_no.trim(),
              start: element.fin_exam_date ? element.fin_exam_date + 'T' + element.fin_time_fr + ':00' : null,
              end: element.fin_exam_date ? element.fin_exam_date + 'T' + element.fin_time_to + ':00' : null,
              className: bgColor,
              description: 'ศูนย์สอบ:' + element.stdcenter_nameth,
              startTime: element.fin_time_fr,
              endTime: element.fin_time_to
            };
            events.push(event);
            // }
          });

          $('#examCalendar').fullCalendar('addEventSource', events)
        }
      },
      function (reason) {
        console.log(reason);
        toastr.error(reason.statusCode + ': ' + reason.error + '<br/>' + reason.message, 'มีข้อผิดพลาด');
      })
      .finally(function () {
      });
  };

  $scope.refreshChart = function () {
    //get SM_GRDCGPA here
    var promise = wemsFactory.getActionAjax('/regis/stdfile/_updateStudentCgpa/' + $scope.std_id);
    promise.then(
      function (data) {

        $scope.SM_GRDCGPA = $scope.genCgpaChartData(data.SM_GRDCGPA);

      },
      function (reason) {
        console.log(reason);
        toastr.error(reason.statusCode + ': ' + reason.error + '<br/>' + reason.message, 'มีข้อผิดพลาด');
      })
      .finally(function () {
        // $timeout(function () {
        $scope.gpaChartOption.dataSource.data($scope.SM_GRDCGPA);
        $scope.chartGpa.refresh();
        // }, 500);
      });
  };

  $scope.onEduYearSemChanged = function (dat) {
    $scope.selectedEduYearSem = dat;

    $scope.SM_GRDFILE = _.filter($scope.SM_GRDFILE_filter, {
      edu_year: $scope.selectedEduYearSem.edu_year,
      edu_sem: $scope.selectedEduYearSem.edu_sem
    });

    $scope.gpaChartOption.dataSource.data($scope.genCgpaChartData($scope.SM_GRDCGPA));
    $scope.chartGpa.refresh();

  };

  $scope.genCgpaChartData = function (data) {
    //for remove 0 gpa
    var newData = [];
    _.each(data, function (element) {
      if (element.gpa !== 0) {
        if (element.showGpa) {
          delete element.showGpa;
          delete element.showCgpa;
        }

        if ($scope.selectedEduYearSem && element.edu_year === $scope.selectedEduYearSem.edu_year
          && element.edu_sem === $scope.selectedEduYearSem.edu_sem) {
          _.extend(element, {
            showGpa: element.gpa,
            showCgpa: element.cgpa
          });
        }

        newData.push(element);
      }
      // if(element.gpa === 0){
      //     element.gpa = null;
      // }
    });

    return newData;
    // return data;
  };

  //หาค้างชำระค่าลงทะเบียน
  $scope.getOutstandingRegister = function () {
    $scope.arrayDataTable = [];

    if (_.isUndefined($scope.std_id) || $scope.std_id === '') return;

    var formdata = {
      std_id: $scope.std_id
    };

    var promise = wemsFactory.postActionJson('/finan/billpayment_stdacct_remain/done_query', formdata);
    promise.then(
      function (data) {
        // $scope.arrayDataTable = data.SM_STDACCT_REMAIN;
        console.log('data',data)

        _.each(data.SM_STDACCT_REMAIN, function (element) {
          var obj = _.findWhere($scope.SM_SEMESTER, {
            semester_id: element.edu_sem
          });

          var semester_nameth = '';
          if (obj != null) {
            semester_nameth = '/' + obj.semester_nameth;
          }

          console.log('before',settings.std_blacklist)
          // check settings.std_blacklist is array
          if (!Array.isArray(settings.std_blacklist)) {
            settings.std_blacklist = [];
          }
          console.log('after',settings.std_blacklist)
          settings.std_blacklist.push({
            remark: element.account_desc + ' ' + element.edu_year + semester_nameth,
            amount: element.balance
          });
        });


        if (data.SM_STDACCT_REMAIN && data.SM_STDACCT_REMAIN.length > 0) {
          // settings.std_blacklist = _.uniq(settings.std_blacklist, 'remark');
          settings.std_blacklist = _.uniq(settings.std_blacklist, function (item) {
            return item.remark + ' ' + item.amount;
          });
          $scope.showOutStanding = true;
        }


        _.each(settings.std_blacklist, function (element) {
          if (typeof element.amount === 'number') {
            element.amount = $filter('number')(element.amount, 2);
          }
        });


      },
      function (reason) {
        console.log(reason);
        toastr.error(reason.statusCode + ': ' + reason.error + '<br/>' + reason.message, 'มีข้อผิดพลาด');
      })
      .finally(function () {
      });
  };

});


