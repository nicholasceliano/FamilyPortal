familyPortalApp.factory('portalApiSvc', function ($resource, $http, $q) {
    'use strict';

    var service = {};

    service.Get = function (uriPath) {
        return $resource(location.origin + uriPath, null);
    };

    service.Post = function (uriPath) {
        return $resource(location.origin + uriPath, null, { save: { method: 'POST' } });
    };

    return service;
});