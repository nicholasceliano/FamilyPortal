familyPortalApp.factory('portalApiSvc', ['$resource', '$http', '$q', function ($resource, $http, $q) {
    'use strict';

    var service = {};

    service.Api = function (uriPath, parameters) {
        return $resource(location.origin + uriPath, parameters);
    };

    return service;
}]);