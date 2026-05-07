//ฟังก์ชั่นแสดงวันที่และเวลา
function showdatetime(dt) {
    var mo;
    var yr = parseFloat(dt.substring(0, 4)) + 543;
    var mo_tmp = dt.substring(5, 7);
    switch (mo_tmp) {
        case "01":
            mo = "มกราคม";
            break;
        case "02":
            mo = "กุมภาพันธ์";
            break;
        case "03":
            mo = "มีนาคม";
            break;
        case "04":
            mo = "เมษายน";
            break;
        case "05":
            mo = "พฤษภาคม";
            break;
        case "06":
            mo = "มิถุนายน";
            break;
        case "07":
            mo = "กรกฎาคม";
            break;
        case "08":
            mo = "สิงหาคม";
            break;
        case "09":
            mo = "กันยายน";
            break;
        case "10":
            mo = "ตุลาคม";
            break;
        case "11":
            mo = "พฤศจิกายน";
            break;
        case "12":
            mo = "ธันวาคม";
            break;
        default:
            mo = dt;

    }
    var day = dt.substring(8, 10);
    var hr = dt.substring(11, 13);
    var min = dt.substring(14, 16);
    var sec = dt.substring(17, 19);
    var output = day + " " + mo + " " + yr + " " + hr + ":" + min + ":" + sec;
    return output;
}

function showtime(dt) {
    var hr = dt.substring(11, 13);
    var min = dt.substring(14, 16);
    var sec = dt.substring(17, 19);
    var output = hr + ":" + min + ":" + sec;
    return output;
}

////////// Sarun. Update

/// sarunrd for text area input with html tag
/// A potentially dangerous Request.Form value was detected from the client (DetailName="yes <br/> I see").
function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

var constants = Object.freeze({
    "DMY": '',
    "e": 2.718281828459045,
    "i": Math.sqrt(-1)
});

///////////////////////////
/// String extend prototype
///  "2016-01-16T09:00:00"
String.prototype.fromYMDtoDMY = function (offset) {
    offset = offset || 0;
    //var dd = value.substr(8, 2), mm = value.substr(5, 2);
    var yy = parseInt(this.substr(0, 4)) + parseInt(offset);

    return this.substr(8, 2) + '/' + this.substr(5, 2) + '/' + yy;
};
String.prototype.jsonDate2DmyHms = function () {
    if (this.length >= 20 && this.startWith('/Date(')) { /// '/Date(1438361940000)/'
        var mydate = eval(this.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
        return mydate.toStringDmyHms();
    }
    return this;
};
String.prototype.jsonDate2Dmy = function () {
    if (this.length >= 20 && this.startWith('/Date(')) { /// '/Date(1438361940000)/'
        var mydate = eval(this.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
        return mydate.toStringDmy();
    }
    return this;
};
String.prototype.startWith = function (needle) {
    //return ( this.indexOf(needle) === 0 );
    //console.log( this.slice(0, needle.length) + ' ' + needle );
    return this.slice(0, needle.length) === needle;
};
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
String.prototype.getContentInBody = function () {
    var p1 = this.indexOf('<body');
    if (p1 === -1) return '';

    var p2 = this.indexOf('>', p1);
    if (p2 === -1) p2 = p1 + 5;
    p2++;

    var p3 = this.indexOf('</body>', p2);
    if (p3 === -1) return '';

    var content = this.substring(p2, p3);
    return content;
}

String.prototype.toDate = function (fmt, offset) {
    if (this.isEmpty()) return new Date();

    offset = offset || 0;

    if (fmt === 'dmy' && this.length >= 10) {
        var dd = parseInt(this.substr(0, 2)),
            mm = parseInt(this.substr(3, 2)),
            yyyy = parseInt(this.substr(6, 4));

        //console.log(dd + ' ' + mm + ' ' + yyyy + ' ' + offset);
        var now = new Date(yyyy + offset, mm - 1, dd); /// defaut it parse to UTC zone
        //console.log(now);
        //console.log(now.toLocaleString());
        //console.log(now.getTimezoneOffset());     /// TimeZone +7 return -420
        //if (now.getTimezoneOffset() > 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        //else if (now.getTimezoneOffset() < 0) now.setTime(now.getTime() + (-now.getTimezoneOffset() * 60 * 1000));
        if (now.getTimezoneOffset() !== 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        //console.log(now);
        return now;
    }
    if (fmt === 'ymd' && this.length >= 10) {
        var dd = parseInt(this.substr(8, 2)),
            mm = parseInt(this.substr(5, 2)),
            yyyy = parseInt(this.substr(0, 4));

        var now = new Date(yyyy + offset, mm - 1, dd, 0, 0, 0, 0);
        //if (now.getTimezoneOffset() > 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        //else if (now.getTimezoneOffset() < 0) now.setTime(now.getTime() + (-now.getTimezoneOffset() * 60 * 1000));
        if (now.getTimezoneOffset() !== 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        return now;
    }
    if (fmt === 'ymdhms' && this.length >= 19) {
        var dd = parseInt(this.substr(8, 2)),
            mm = parseInt(this.substr(5, 2)),
            yyyy = parseInt(this.substr(0, 4));
        var hr = parseInt(this.substr(11, 2)),
            min = parseInt(this.substr(14, 2)),
            sec = parseInt(this.substr(17, 2));

        var now = new Date(yyyy + offset, mm - 1, dd, hr, min, sec, 0);
        //if (now.getTimezoneOffset() > 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        //else if (now.getTimezoneOffset() < 0) now.setTime(now.getTime() + (-now.getTimezoneOffset() * 60 * 1000));
        if (now.getTimezoneOffset() !== 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        return now;
    }

    if (fmt === 'json') {
        return eval(this.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
    }
    return new Date();
};
String.prototype.convertToDate = function (fmt, offset) {
    // fmt -> json '/Date(1438361940000)/'
    // fmt -> ymd  '2015-08-28T17:00:00.000Z'

    if (this.isEmpty()) return new Date();

    offset = offset || 0;

    if (fmt === 'json') {
        return eval(this.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
    } else if (fmt === 'ymd') {
        var dd = this.substr(8, 2),
            mm = this.substr(5, 2),
            yyyy = this.substr(0, 4);
        var hr = this.substr(11, 2),
            min = this.substr(14, 2),
            sec = this.substr(17, 2);

        var now = new Date(parseInt(yyyy) + offset, parseInt(mm) - 1, parseInt(dd), parseInt(hr), parseInt(min), parseInt(sec), 0);
        if (now.getTimezoneOffset() !== 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
        return now;
    }
    return new Date();
};
String.prototype.formatDateTime = function (fmt, offset) {
    //2016-08-28T06:18:10.000Z
    // jsondate from ASP.NET is string  '/Date(1438361940000)/'   or '30/07/2015 22:55:00'   '2015-08-28T17:00:00.000Z'
    // jsondate from Node.JS is string  '2015-08-28T17:00:00.000Z' '2016-06-22T14:20:47.160Z'
    if (this.isEmpty()) return '';
    offset = offset || 0;
    ///console.log('formatDateTime  ' + fmt + offset);
    ///console.log(this);

    if (this.length >= 20 && this.startWith('/Date(')) {
        var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
        return 'mydate';
    }
    if (this.length === 19 || this.length === 24) {
        if (this.substr(0, 10) === '1900-01-01') return ''; /// check case date is null in oracle ...
        if (this.substr(0, 10) === '1970-01-01') return ''; /// check case date is null in oracle ...
        if (fmt === 'dmy') {
            var yyyy = parseInt(this.substr(0, 4)) + offset;
            return this.substr(8, 2) + '/' + this.substr(5, 2) + '/' + yyyy;
        } else if (fmt === 'dmyy') {
            var yyyy = parseInt(this.substr(0, 4)) + offset;
            var yy = yyyy.toString().substr(2, 2);
            return this.substr(8, 2) + '/' + this.substr(5, 2) + '/' + yy;
        } else if (fmt === 'hms') {
            var hr = this.substr(11, 2),
                min = this.substr(14, 2),
                sec = this.substr(17, 2);
            return hr + ':' + min + ':' + sec;
        } else if (fmt === 'hm') {
            var hr = this.substr(11, 2),
                min = this.substr(14, 2);
            return hr + ':' + min;
        } else if (fmt === 'dmyy-hms') {
            var yyyy = parseInt(this.substr(0, 4)) + offset;
            var yy = yyyy.toString().substr(2, 2);
            var dmyy = this.substr(8, 2) + '/' + this.substr(5, 2) + '/' + yy;
            var hr = this.substr(11, 2),
                min = this.substr(14, 2),
                sec = this.substr(17, 2);
            var hms = hr + ':' + min + ':' + sec;
            return dmyy + ' - ' + hms;
        }
    }
};

if (typeof String.prototype.padEnd !== 'function') {
    String.prototype.padEnd = function (targetLength, padString) {
        var pad = new Array(targetLength).join(padString || ' ');
        var result = this + pad;
        return result.substr(0, targetLength);
    };
}

//////////////////////////

Number.prototype.formatDateTime = function (fmt) {
    var mydate = new Date(this);
    if (fmt === 'dmy') {
        var yyyy = ('0000' + mydate.getFullYear()).slice(-4),
            mm = ('00' + (mydate.getMonth() + 1)).slice(-2),
            dd = ('00' + mydate.getDate()).slice(-2);
        return dd + '/' + mm + '/' + yyyy;
    } else if (fmt === 'hms') {
        var hr = ('00' + mydate.getHours()).slice(-2),
            min = ('00' + mydate.getMinutes()).slice(-2),
            sec = ('00' + mydate.getSeconds()).slice(-2);
        return hr + ':' + min + ':' + sec;
    } else if (fmt === 'hm') {
        var hr = ('00' + mydate.getHours()).slice(-2),
            min = ('00' + mydate.getMinutes()).slice(-2);
        return hr + ':' + min;
    }
};
/////////////////////////
/// Date extend prototype
Date.prototype.toStringDmy = function (offset) {
    var mydate = this;
    offset = offset || 0;

    my_yr = ('0000' + (mydate.getFullYear() + offset)).slice(-4);
    my_month = ('00' + (mydate.getMonth() + 1)).slice(-2);
    my_day = ('00' + mydate.getDate()).slice(-2);

    return my_day + '/' + my_month + '/' + my_yr;
};
Date.prototype.toStringDmyHms = function () {
    var mydate = this;

    my_yr = ('0000' + mydate.getFullYear()).slice(-4);
    my_month = ('00' + (mydate.getMonth() + 1)).slice(-2);
    my_day = ('00' + mydate.getDate()).slice(-2);

    my_hr = ('00' + mydate.getHours()).slice(-2);
    my_min = ('00' + mydate.getMinutes()).slice(-2);
    my_sec = ('00' + mydate.getSeconds()).slice(-2);

    return my_day + '/' + my_month + '/' + my_yr + ' ' + my_hr + ':' + my_min + ':' + my_sec;
};
Date.prototype.toStringHm = function () {
    var mydate = this;

    my_hr = ('00' + mydate.getHours()).slice(-2);
    my_min = ('00' + mydate.getMinutes()).slice(-2);

    return my_hr + ':' + my_min;
};
Date.prototype.toStringHms = function () {
    var mydate = this;

    my_hr = ('00' + mydate.getHours()).slice(-2);
    my_min = ('00' + mydate.getMinutes()).slice(-2);
    my_sec = ('00' + mydate.getSeconds()).slice(-2);

    return my_hr + ':' + my_min + ':' + my_sec;
};
Date.prototype.Equal = function (val) {
    var mydate = this;

    if (mydate.getFullYear() === val.getFullYear() &&
        mydate.getMonth() === val.getMonth() &&
        mydate.getDate() === val.getDate())
        return true;

    return false;
};

var fn_string = function () {
    var
        JsonDate2DmyHms = function (value) {
            // jsondate from ASP.NET is string  '/Date(1438361940000)/'
            //                                   /Date(275072400000)/
            //console.log(value);
            if (value === null) return '';
            if (value.length >= 20 && value.startWith('/Date(')) {
                var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
                //console.log( 'is json date '+ value);
                //console.log( mydate + ' '+ mydate.toStringDmy());
                return mydate.toStringDmyHms();
            }
            return value;
        },
        isTimeValid_hhmm = function (time) {
            var timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g;
            return timePattern.test(time);
        },
        isTimeValid_hhmmss = function (time) {
            var timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g;
            var resultFrom = timePattern.test(time);
        }

    return {
        JsonDate2DmyHms: JsonDate2DmyHms,
        isTimeValid_hhmm: isTimeValid_hhmm,
        isTimeValid_hhmmss: isTimeValid_hhmmss
    }
}

var convertDmyToTimeMs = (function (dmy, offset) {
    if (_.isUndefined(dmy)) return 0;
    if (!_.isString(dmy)) return dmy;
    if (dmy.isEmpty()) return 0;
    if (dmy.length !== 8 && dmy.length !== 10) return 0;

    offset = offset || 0;

    var dd = parseInt(dmy.substr(0, 2)),
        mm = parseInt(dmy.substr(3, 2));
    var yyyy = dmy.length === 10 ? parseInt(dmy.substr(6, 4)) : parseInt(dmy.substr(6, 2));

    if (offset !== 0 && yyyy < 100) {
        yyyy = 2500 + yyyy; /// make 59 -> 2559
    }

    var now = new Date(yyyy + offset, mm - 1, dd); /// defaut it parse to UTC zone
    now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
    return now.getTime();
});
var convertDmyHmsToTimeMs = (function (dmy, hms, offset) {
    if (_.isUndefined(dmy)) return 0;
    if (dmy.isEmpty()) return 0;
    if (dmy.length !== 8 && dmy.length !== 10) return 0;

    offset = offset || 0;

    /// support 'dd/mm/yyyy''  and  'dd/mm/yy'
    var dd = parseInt(dmy.substr(0, 2)),
        mm = parseInt(dmy.substr(3, 2));
    var yyyy = dmy.length === 10 ? parseInt(dmy.substr(6, 4)) : parseInt(dmy.substr(6, 2));

    if (offset !== 0 && yyyy < 100) {
        yyyy = 2500 + yyyy; /// make 59 -> 2559
    }

    /// support 'hh:mm:ss'    
    var hh = 0,
        min = 0,
        ss = 0;
    var hmsArray = hms.split(':');
    if (hmsArray.length >= 2 && hmsArray[0]) hh = parseInt(hmsArray[0]);
    if (hmsArray.length >= 2 && hmsArray[1]) min = parseInt(hmsArray[1]);
    if (hmsArray.length >= 3 && hmsArray[2]) ss = parseInt(hmsArray[2]);
    /*
        if (hms.length === 5 || hms.length === 8) {
            hh = parseInt(hms.substr(0, 2)),
                min = parseInt(hms.substr(3, 2)),
                ss = 0;
            if (hms.length === 8)
                ss = parseInt(hms.substr(5, 2));
        }*/

    var now = new Date(yyyy + offset, mm - 1, dd, hh, min, ss); /// defaut it parse to UTC zone
    if (now.getTimezoneOffset() !== 0) now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
    return now.getTime();
});

var fn_datetime_utils = function () {
    var
        formatDateTime = function (value, fmt, offset) {
            if (value) {
                return value.formatDateTime(fmt, offset);
            } else return '';
        },
        convertJsonDate2Dmy = function (value) {
            // jsondate from ASP.NET is string  '/Date(1438361940000)/'   or '30/07/2015 22:55:00'   '2015-08-28T17:00:00.000Z'
            //                                   /Date(275072400000)/
            //console.log(value);
            if (value === null) return '';
            if (value.length == 10) { /// 30/7/2015
                return value;
            } else if (value.length > 10 && value.length < 20) { /// 30/07/2015 22:55:00
                return value.substr(0, 10);
            } else if (value.length >= 20 && value.startWith('/Date(')) {
                var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
                //console.log( 'is json date '+ value);
                //console.log( mydate + ' '+ mydate.toStringDmy());
                return mydate.toStringDmy();
            }
            return value;
        },
        convertJsonDate2DmyHms = function (value) {
            // jsondate from ASP.NET is string  '/Date(1438361940000)/'
            //                                   /Date(275072400000)/
            //console.log(value);
            if (value === null) return '';
            if (value.length >= 20 && value.startWith('/Date(')) {
                var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
                //console.log( 'is json date '+ value);
                //console.log( mydate + ' '+ mydate.toStringDmy());
                return mydate.toStringDmyHms();
            }
            return value;
        },
        convertJson2Date = function (value) {
            // jsondate from ASP.NET is string  '/Date(1438361940000)/'   
            // or '30/07/2015 22:55:00'   '2015-11-13T00:00:00'  '2015-08-28T17:00:00.000Z'  '2015-11-25T14:37:10.0989585'
            //                                                                               '2015-11-25T20:45:49.291224'
            //console.log(typeof value);         /Date(-50655600000)/

            ///console.log(typeof value);
            if (typeof value !== 'string') return null;
            //if (value === null) return null;

            if (value.isEmpty()) return null;

            if (value.length === 10) {
                var dd = value.substr(0, 2),
                    mm = value.substr(3, 2),
                    yy = value.substr(6, 4);

                var mydate = new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd), 0, 0, 0, 0);
                return mydate;
            } else if (value.length >= 20 && value.startWith('/Date(')) { /// '/Date(1438361940000)/'
                //var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
                var mydate = new Date(parseInt(value.substr(6)));

                return mydate;
            } else if (value.length === 19 || value.length > 24) {
                // 2015-12-23T17:00:00  /// '2015-11-13T00:00:00'  '2015-08-28T17:00:00.000Z'
                if (value.substr(4, 1) === '-' && value.substr(10, 1) === 'T') {
                    //var mydate = new Date(value);
                    var dd = value.substr(8, 2),
                        mm = value.substr(5, 2),
                        yy = value.substr(0, 4);
                    var hr = value.substr(11, 2),
                        min = value.substr(14, 2),
                        sec = value.substr(17, 2);

                    var mydate = new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd), parseInt(hr), parseInt(min), parseInt(sec), 0);
                    return mydate;
                }

                var dd = value.substr(0, 2),
                    mm = value.substr(3, 2),
                    yy = value.substr(6, 4);
                var hr = value.substr(11, 2),
                    min = value.substr(14, 2),
                    sec = value.substr(17, 2);

                var mydate = new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd), parseInt(hr), parseInt(min), parseInt(sec), 0);
                return mydate;
            }

            console.log('[' + value + ']');
            console.log(typeof value);
            console.log('convertJson2Date   --> invalid json date');
            return value;
        },
        convertValue2Date = function (value) {

            if (typeof value === 'string') {
                return convertJson2Date(value);
            } else if (typeof value === 'object') { // typeof 'object' mean to Date,   
                return value;
            }

            //console.log('[' + value + ']');
            //console.log(typeof value);
            console.log('convertValue2Date   --> invalid json date');
            return value;
        },
        convertString2Date = function (value) {
            // jsondate from ASP.NET is string  '/Date(1438361940000)/'   or '30/07/2015 22:55:00'   '2015-08-28T17:00:00.000Z'
            //console.log(typeof value);         /Date(-50655600000)/

            //console.log(typeof value);
            if (typeof value !== 'string') return null;
            //if (value === null) return null;

            if (value.isEmpty()) return null;

            if (value.length === 10) {
                var dd = value.substr(0, 2),
                    mm = value.substr(3, 2),
                    yy = value.substr(6, 4);

                var mydate = new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd), 0, 0, 0, 0);
                return mydate;
            } else if (value.length === 19) {
                var dd = value.substr(0, 2),
                    mm = value.substr(3, 2),
                    yy = value.substr(6, 4);
                var hr = value.substr(11, 2),
                    min = value.substr(14, 2),
                    sec = value.substr(17, 2);

                var mydate = new Date(parseInt(yy), parseInt(mm) - 1, parseInt(dd), parseInt(hr), parseInt(min), parseInt(sec), 0);
                return mydate;
            } else if (value.length >= 20 && value.startWith('/Date(')) {
                var mydate = eval(value.replace(/\/Date\((-?\d+)\)\//gi, "new Date($1)"));
                return mydate;
            }

            console.log('[' + value + ']');
            console.log(typeof value);
            console.log('   --> invalid json date');
            return value;
        },
        convertDate2DMY = function (mydate) {
            if (typeof mydate !== 'object') return '';

            my_yr = ('0000' + mydate.getFullYear()).slice(-4);
            my_month = ('00' + (mydate.getMonth() + 1)).slice(-2);
            my_day = ('00' + mydate.getDate()).slice(-2);

            return my_day + '/' + my_month + '/' + my_yr;
        },
        convertDate2HM = function (mydate) {
            if (typeof mydate !== 'object') return '';

            my_hr = ('00' + mydate.getHours()).slice(-2);
            my_min = ('00' + mydate.getMinutes()).slice(-2);
            my_sec = ('00' + mydate.getSeconds()).slice(-2);

            return my_hr + ':' + my_min;
        },
        isTimeValid_hhmm = function (time) {
            var timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g;
            return timePattern.test(time);
        },
        isTimeValid_hhmmss = function (time) {
            var timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g;
            var resultFrom = timePattern.test(time);
        }

    return {
        formatDateTime: formatDateTime,
        convertDmyToTimeMs: convertDmyToTimeMs,
        convertJsonDate2Dmy: convertJsonDate2Dmy,
        convertJsonDate2DmyHms: convertJsonDate2DmyHms,
        convertJson2Date: convertJson2Date,
        convertString2Date: convertString2Date,
        convertValue2Date: convertValue2Date,
        convertDate2DMY: convertDate2DMY,
        convertDate2HM: convertDate2HM,
        isTimeValid_hhmm: isTimeValid_hhmm,
        isTimeValid_hhmmss: isTimeValid_hhmmss
    }
};

/// get parameter value from url syntax
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var UUID = (function () {
    var self = {};
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
    }
    self.generate = function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    };
    self._p8 = function (s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    self.guid = function () {
        return self._p8() + self._p8(true) + self._p8(true) + self._p8();
    }
    return self;
})();