(function () {
  'use strict';

  angularjs.service('vtexService', ["$q", function ($q) {

    var client = ZAFClient.init();

    return {

      consultCPF: function (data) {
        var deferred = $q.defer();

        client.request({
          url: 'https://n0e6xtbvqa.execute-api.us-east-1.amazonaws.com/default/flordemaio-zendesk-mock?cpf='+data,
          type: 'GET',
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

      consultPedido: function (data) {
        var deferred = $q.defer();

        client.request({
          url: 'https://v4c1btaq78.execute-api.us-east-1.amazonaws.com/default/allShopping?idShopping='+data,
          type: 'GET',
          contentType: 'application/json'
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error)
        });
        return deferred.promise;
      },

    }

  }])

})();