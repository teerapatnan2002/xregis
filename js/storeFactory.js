/*global angular, basil lz-string*/
angular.module('storeFactory', []).factory('storeFactory', function () {
    'use strict';
    return {
        Set_objaes: function (name, obj, crypto_password) {
            //var now = moment();
            var dataString = angular.toJson(obj);
            var aesString = Aes.Ctr.encrypt(dataString, crypto_password, 128); // '2wNXzgVAclgXNPTip5c3D9Mj'
            Basil.sessionStorage.set('_objaes' + name, aesString, {
                'expireDays': 1
            });
            //var end = moment();
            //console.log('diff  = ' + end.diff(now) + ' ms');
            //console.log(' dataString.length = ' + dataString.length);
            //console.log(' aesString.length = ' + aesString.length);
        },
        Get_objaes: function (name, crypto_password) {
            var aesString = Basil.sessionStorage.get('_objaes' + name);
            //console.log(val);
            //console.log('typeof  val = ' + typeof val);
            if (_.isString(aesString)) {
                var dataString = Aes.Ctr.decrypt(aesString, crypto_password, 128); // '2wNXzgVAclgXNPTip5c3D9Mj'

                var jsonObj = angular.fromJson(dataString);
                return jsonObj;
            }
            return _.isNull(aesString) ? _.noop() : val;
        },
        Set_obj: function (name, obj) {
            //var now = moment();
            var dataString = angular.toJson(obj);
            //var compressed = LZString.compressToUTF16(dataString);    /// very slow more than 3 second
            Basil.sessionStorage.set('_obj' + name, dataString, {
                'expireDays': 1
            });
            //var end = moment();
            //console.log('diff  = ' + end.diff(now) + ' ms');
            //console.log(' dataString.length = ' + dataString.length);
            //console.log(' compressed.length = ' + compressed.length);
        },
        Get_obj: function (name) {
            var val = Basil.sessionStorage.get('_obj' + name);
            //console.log(val);
            //console.log('typeof  val = ' + typeof val);
            if (_.isString(val)) {
                var jsonObj = angular.fromJson(val);
                return jsonObj;
            }
            return _.isNull(val) ? _.noop() : val;
        },
        Set: function (name, val) {
            Basil.sessionStorage.set(name, val, {
                'expireDays': 1
            });
        },
        Get: function (name) {
            var val = Basil.sessionStorage.get(name);
            return _.isNull(val) ? _.noop() : val;
        },
        Remove: function (name) {
            return Basil.sessionStorage.remove(name);
        },
        Clear_obj: function () {
            /// prevent session size over limit  5MB
            var keys = Basil.sessionStorage.keys();
            console.log('storeFactory keys = ');
            console.log(keys);
            _.each(keys, function (key) {
                if (key.indexOf('_obj') === 0) {
                    console.log('remove ' + key);
                    Basil.sessionStorage.remove(key);
                }
            });
            return;
        },
        Reset: function () {
            return Basil.sessionStorage.reset();
        },

        SetLocal: function (name, data) {
            Basil.localStorage.set(name, data, {
                'expireDays': 1
            });
        },
        GetLocal: function (name) {
            //console.log('storeFactory.GetLocal');
            var val = Basil.localStorage.get(name);
            //console.log(val);
            //console.log('typeof val ' + typeof val);
            return _.isNull(val) ? _.noop() : val;
        },
        RemoveLocal: function (name) {
            return Basil.localStorage.remove(name);
        },
        ResetLocal: function () {
            return Basil.localStorage.reset();
        }
    };
});
