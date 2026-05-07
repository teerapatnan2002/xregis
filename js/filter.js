"use strict";

MetronicApp.filter('filterCampusName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.campus_id)) return '- กรุณาเลือก วิทยาเขต';
        // return dat.campus_call_nameth + ' ' + dat.campus_nameth;
        return dat.campus_nameth;
    };
});
MetronicApp.filter('filterStudyLevelName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.studylevel_id)) return '- กรุณาเลือก';
        return dat.studylevel_nameth;
    };
});
MetronicApp.filter('filterDateCtrlDesc1', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.edu_year)) return '- กรุณาเลือก ';
        return dat.edu_year + '/' + dat.edu_sem;
    };
});
MetronicApp.filter('filterFactypeName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.factype_id)) return '- กรุณาเลือก หน่วยงาน';
        return dat.factype_nameth;
    };
});
MetronicApp.filter('filterDivisionName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.division_id)) return '- กรุณาเลือก คณะ';
        // return dat.division_call_nameth + ' : ' + dat.division_nameth;
        return dat.division_nameth;
    };
});
MetronicApp.filter('filterDepartmentName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.department_id)) return '- กรุณาเลือก สาขา';
        // return dat.department_call_nameth + ' : ' + dat.department_nameth;
        return dat.department_nameth;
    };
});
MetronicApp.filter('filterMajorName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.CODE)) return '- กรุณาเลือก วิชาเอก';
        return dat.CODE + ' : ' + dat.NAMETHAI;
    };
});
MetronicApp.filter('filterConcentrateName2', function () {
    return function (dat) {
        if (typeof dat.concentrate_id === 'undefined') return '- กรุณาเลือก เน้นเรียน';
        return dat.concentrate_call_nameth + ' : ' + dat.concentrate_nameth;
    };
});
MetronicApp.filter('filterZoneName2', function () {
    return function (dat) {
        if (typeof dat.zone_id === 'undefined') return '- กรุณาเลือก หลักสูตร';
        return dat.zone_id + ' : ' + dat.zone_nameth;
    };
});
MetronicApp.filter('filterCountryName2', function () {
    return function (dat) {
        if (typeof dat.country_id === 'undefined') return '- กรุณาเลือก ประเทศ';
        return dat.country_id + ' : ' + dat.country_nameth;
    };
});
MetronicApp.filter('filterProvinceZoneName2', function () {
    return function (dat) {
        if (typeof dat.province_zone === 'undefined') return '- กรุณาเลือก ภาค';
        return dat.province_zone + ' : ' + dat.province_zone_nameth;
    };
});

MetronicApp.filter('filterCurrstructureCategoryName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.curriculum_category_id)) return '- กรุณาเลือก หมวดหมู่';
        return dat.curriculum_category_nameth;
    }
});

MetronicApp.filter('filterCurrstructureGroupName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.curriculum_group_id)) return '- กรุณาเลือก กลุ่มวิชา';
        return dat.curriculum_group_nameth;
    }
});

MetronicApp.filter('filterCurriculumName2', function () {
    return function (dat) {
        if (typeof dat.ID === 'undefined') return '- กรุณาเลือก หลักสูตร';
        return dat.CURRCODE + ' : ' + dat.CURRNAMETHAI;
    };
});

MetronicApp.filter('filterEduYearName2', function () {
    return function (dat) {
        //if (typeof dat.edu_year === 'undefined') return '- กรุณาเลือก ปีการศึกษา';
        if (_.isUndefined(dat) || _.isUndefined(dat.edu_year)) return '- กรุณาเลือก ';
        return dat.edu_year;
    };
});

MetronicApp.filter('filterWorkFlowStatus', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.Id)) return '- กรุณาเลือก สถานะเอกสาร';
        return dat.Code + ' : ' + dat.Name;
    };
});
MetronicApp.filter('filterCurrYearName2', function () {
    return function (dat) {
        //if (typeof dat.edu_year === 'undefined') return '- กรุณาเลือก ปีการศึกษา';
        if (_.isUndefined(dat) || _.isUndefined(dat.curr_year)) return '- กรุณาเลือก ';
        return dat.curr_year;
    };
});

MetronicApp.filter('filterEduYearSemName2', function () {
    return function (dat) {
        if (_.isUndefined(dat) || _.isUndefined(dat.edu_year_sem)) return '- กรุณาเลือก ';
        return dat.edu_year_sem;
    };
});

MetronicApp.filter('filterSemesterName2', function () {
    return function (dat) {
        //if (typeof dat.edu_year === 'undefined') return '- กรุณาเลือก ปีการศึกษา';
        if (_.isUndefined(dat) || _.isUndefined(dat.edu_year)) return '- กรุณาเลือก ';
        return dat.edu_sem;
    };
});

MetronicApp.filter('filterCurrentDate', ['$filter', function ($filter) {
    return function (format) {
        console.log('currentdate format = ' + format);
        if (format === 'th')
            return $filter('date')(new Date().toStringDmy(543));
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}]);
MetronicApp.filter('filterDate_th', ['$filter', function ($filter) {
    return function (dat, params) {
        //console.log('filterDate dat = ' + dat);
        //console.log(params);

        if (_.isUndefined(dat) || _.isNull(dat)) return '-';

        var fmt = _.isUndefined(params) ? 'dmyy' : params;
        //console.log('fmt = ' + fmt);
        //console.log(dat.formatDateTime(fmt, 543));
        if (_.isString(dat)) {
            return dat.formatDateTime(fmt, 543);
        }
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}]);
MetronicApp.filter('filterDateTime_th', ['$filter', function ($filter) {
    return function (dat, params) {
        //console.log('filterDate dat = ' + dat);
        //console.log(params);

        if (_.isUndefined(dat) || _.isNull(dat)) return '-';

        var fmt = _.isUndefined(params) ? 'dmyy' : params;
        //console.log('fmt = ' + fmt);
        //console.log(dat.formatDateTime(fmt, 543));
        if (_.isString(dat)) {
            return dat.formatDateTime(fmt, 543);
        }
        return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    };
}]);


MetronicApp.filter('filterDayString', function () {
    return function (dat) {
        var day = '';
        switch (dat) {
            case 'Monday':
                day = 'จันทร์';
                break;
            case 'Tuesday':
                day = 'อังคาร';
                break;
            case 'Wednesday':
                day = 'พุธ';
                break;
            case 'Thursday':
                day = 'พฤหัส';
                break;
            case 'Friday':
                day = 'ศุกร์';
                break;
            case 'Saturday':
                day = 'เสาร์';
                break;
            case 'Sunday':
                day = 'อาทิตย์';
                break;
        }

        return day;
    };
});