/*global angular, amplify*/
angular.module('amplifyFactory', []).factory('amplifyFactory', function() {
    'use strict';
    return {
        Add: function(name, data) {
            amplify.store.sessionStorage(name, data, {
                'expires': 43200000
            }); // 12Hr. 12*60*60*1000
        },
        Get: function(name) {
            return amplify.store.sessionStorage(name);
        },
        Remove: function(name) {
            return amplify.store.sessionStorage(name, null);
        },
        AddLocal: function(name, data) {
            amplify.store.localStorage(name, data, {
                'expires': 43200000
            }); //  12Hr. 12*60*60*1000
        },
        GetLocal: function(name) {
            return amplify.store.localStorage(name);
        },
        RemoveLocal: function(name) {
            return amplify.store.localStorage(name, null);
        }
    };
});