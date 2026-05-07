/*global angular*/
angular.module('wemsFactory', []).factory('wemsFactory', function ($http, $q) {
    'use strict';
    var dataFactory = {};

    //var prefix = 'http://localhost:2774/api' + '/userprofile/login';
    var prefix = ''; // 'http://localhost:3230/api';

    dataFactory.getActionAjax = function (url) {
        var url2 = prefix + url;
        //console.log('getActionAjax ' + url2);
        var deferred = $q.defer();
        $http.get(url2)
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                console.log('reason => ' + reason);
                console.log(reason);
                console.log('code => ' + code);
                if (reason === null) reason = 'Please refresh page...';
                deferred.reject(reason);
            });
        return deferred.promise;
    };

    dataFactory.postActionJson = function (url, jsonObj) {
        var url2 = prefix + url;
        //console.log('postActionAjax ' + url2);
        var deferred = $q.defer();
        $http.post(url2, jsonObj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                console.log('reason => ' + reason);
                console.log(reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    };

    dataFactory.postActionAjax = function (url, params) {
        var url2 = prefix + url;
        //console.log('postActionAjax ' + url2);
        var deferred = $q.defer();
        $http.post(url2, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                console.log('reason => ' + reason);
                console.log(reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    };
    dataFactory.putActionAjax = function (url, params) {
        var url2 = prefix + url;
        var deferred = $q.defer();
        $http.put(url2, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                //console.log( 'reason => ' + reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    };

    dataFactory.postActionUploadAjax = function (url, params) {
        var url2 = prefix + url;
        var deferred = $q.defer();
        $http.post(url2, params, {
                //////////////////// test
                ///transformRequest: angular.identity,////////////////
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                deferred.reject(reason);
            });
        return deferred.promise;
    };

    //////////////////////////////
    function hashFnv32a(str, asString, seed) {
        /*jshint bitwise:false */
        var i, l,
            hval = (seed === undefined) ? 0x811c9dc5 : seed;

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if (asString) {
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;
    }

    function hash(str) {
        var hash = 5381,
            i = str.length;
        while (i) {
            hash = (hash * 33) ^ str.charCodeAt(--i);
        }
        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
         * integers. Since we want the results to be always positive, convert the
         * signed int to an unsigned by doing an unsigned bitshift. */
        return hash >>> 0;
    }
    dataFactory.postActionAjax_Secure = function (url, obj) {
        var url2 = prefix + url;
        var deferred = $q.defer();

        _.extend(obj, {
            nonce: _.random(0, 100000)
        });
        var signature_str = '';
        _.each(obj, function (element, key) {
            signature_str += key + element;
        });
        console.log(signature_str);

        var signature = hashFnv32a(signature_str);
        console.log('signature');
        console.log(signature);

        var params = $.param(obj);
        $http.post(url2, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Signature': signature
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                //console.log( 'reason => ' + reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    };
    dataFactory.postActionJson_Secure = function (url, jsonObj) {
        var url2 = prefix + url;
        var deferred = $q.defer();

        _.extend(jsonObj, {
            nonce: _.random(0, 100000)
        });
        var signature_str = '';
        _.each(jsonObj, function (element, key) {
            signature_str += key + element;
        });
        //console.log(signature_str);

        var signature = hashFnv32a(signature_str);
        //console.log('signature');
        //console.log(signature);

        $http.post(url2, jsonObj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Signature': signature
                }
            })
            .success(function (value, status) {
                deferred.resolve(value);
            })
            .error(function (reason, code) {
                if (reason === null) reason = 'Please refresh page...';
                //console.log( 'reason => ' + reason);
                deferred.reject(reason);
            });
        return deferred.promise;
    };
    //////////////////////////////

    return dataFactory;
});
