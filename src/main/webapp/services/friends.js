angular.module('app.home')
    .factory('Friends', ['$http', function($http) {

        console.log('module app.factory');
//        this.get = function() {
//                   return $http.get('home/friends.json').then(function(response){
//
//                       console.log('module app.factory.friends.get');
//                       return response.data;
//                   })};




        return {
            get: function() {

                 var httpGet = $http.get('home/friends.json');
                 var thn = httpGet.then(function(response) {
                         console.log('http.get.then');
                         return response.data;
                     });
                 var thn2 = thn.then(function(result){
                    console.log('result: ' + result);
                 });
                 return thn;
             }
        };
    }])