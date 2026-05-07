/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope', '$state',
    function ($rootScope, $state) {
        return {
            link: function (scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function (event) {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
MetronicApp.directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

/////////////////////////////////////////////////////////////
/// sarun.rd
/// required:
///           https://jojosati.github.io/bootstrap-datepicker-thai/
///           https://bootstrap-datepicker.readthedocs.io/en/latest/
MetronicApp.directive('bsdatepicker', function ($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            return $timeout(function () {
                var checkin = $(element).datepicker({
                    language: attrs.language || 'th',
                    format: 'dd/mm/yyyy',
                    autoclose: true,
                    todayHighlight: true,
                    keyboardNavigation: false,
                }).on('changeDate', function (ev) {
                    //console.log('on changeDate done  ');
                }).on('blur', function (ev) {
                    if (typeof ngModelCtrl.$viewValue !== 'undefined') {
                        if (ngModelCtrl.$viewValue.length > 0 && ngModelCtrl.$viewValue.length !== 10)
                            $(element).datepicker('update', ngModelCtrl.$viewValue);
                    }
                }).on('show', function (ev) {
                    //console.log('ngModelCtrl.$viewValue = ' + ngModelCtrl.$viewValue);
                });

                /// for assign startup value to datepicker
                scope.$watch(attrs['ngModel'], function (newValue) {
                    //console.log('on watch done  ' + newValue);
                    if (newValue && newValue.length === 10)
                        $(element).datepicker('update', newValue);
                });
            });
        }
    };
});

/// required: bsdatepicker directive
MetronicApp.directive('myDatePickerInputGroup', function () {
    return {
        restrict: 'E',
        template: function (element, attrs) {
            if (typeof attrs.ownmodel === 'undefined') return '<h2>Please assign: ownmodel </h2>';

            var ng_model = attrs.ownmodel;
            var lang = attrs.lang || 'th';

            var htmlText = '<div class="input-group">' +
                ' <span class="input-group-addon">' +
                ' <i class="glyphicon glyphicon-calendar"></i>' +
                ' </span> ' +
                ' <input bsdatepicker type="text" name="' + ng_model + '"' +
                ' class="form-control" ' +
                ' language="' + lang + '" ' +
                ' ng-model="' + ng_model + '" ' +
                ' autocomplete="off"' +
                ' maxlength="10" >' +
                '</div>';
            return htmlText;
        }
    };
});

//// using https://github.com/jdewit/bootstrap-timepicker/graphs/contributors
//// version new
MetronicApp.directive('myBootstrapTimePicker', function ($timeout, $parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, $attrs, ngModel) {
            return $timeout(function () {

                //scope.$watch($attrs['ngModel'], function (newValue) {
                //    console.log('newValue');
                //    console.log(newValue);
                //if (!_.isUndefined(newValue))
                //    $(element).timepicker('setTime', newValue);
                //});

                console.log('  ==> myBootstrapTimePicker   ' + _.now());
                return $(element).timepicker({
                    template: false,
                    showMeridian: false,
                    minuteStep: 10,
                    defaultTime: false,
                    explicitMode: false
                }).on('changeTime.timepicker', function (event) {
                    console.log('event.time');
                    console.log(event.time);
                    /// event.time = Object { value: "10:20", hours: 10, minutes: 20, seconds: 0, meridian: undefined }
                    if ($attrs['ngModel']) {
                        //console.log('    ++++++++ ' + $attrs['ngModel']);
                        //scope.$apply(function () {
                        ngModel.$setViewValue(event.time.value);
                        //});
                    }
                });
            });
        }
    };
});

MetronicApp.directive('myIcheck', function ($timeout, $parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, $attrs, ngModel) {
            return $timeout(function () {

                scope.$watch($attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });

                var checkboxClass = $(element).attr('checkboxClass');
                //console.log('checkboxClass');
                //console.log(checkboxClass);
                if (_.isUndefined(checkboxClass)) checkboxClass = 'icheckbox_flat-grey';

                return $(element).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: 'iradio_flat-grey'
                }).on('ifChanged', function (event) {
                    //console.log(event);
                    //console.log(' element.type == ' + $(element).attr('type'));
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        var value = $attrs['value'];
                        scope.$apply(function () {
                            ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
});

MetronicApp.directive('mySwitch', function ($timeout, $parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, $attrs, ngModel) {
            return $timeout(function () {
                scope.$watch($attrs['ngModel'], function (newValue, oldValue) {
                    //console.log('  $scope.$watch  newValue = ' + newValue);
                    if ($(element).attr('type') === 'checkbox' && !_.isUndefined(newValue))
                        $(element).bootstrapSwitch('state', newValue, true);
                });

                $(element).bootstrapSwitch()
                    .on('init.bootstrapSwitch', function (event) {
                        console.log('init.bootstrapSwitch');
                        $(element).bootstrapSwitch('radioAllOff', true);
                    })
                    .on('switchChange.bootstrapSwitch', function (event, state) {
                        console.log('ngModel');
                        console.log(ngModel);

                        //console.log('on switchChange state = ' + state);
                        //console.log(' element.type == ' + $(element).attr('type'));
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });
            });
        }
    };
});