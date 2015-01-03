console.log('loading home/module.js');

angular.module('app.home',[])

    .config(['$stateProvider', function($stateProvider) {


        console.log('module app.home.config');
        $stateProvider
            .state('app.home', {
                url:'/home',
                templateUrl:'home/home.tpl.html',
                controller:'homeCtrl',
                resolve: {
                    friends:['Friends', function(Friends) {
                        return Friends.get().then(function(result){return result;});
                    }]
                }
            });
    }])

    .run(function(){
        console.log('module app.home.run');
    })

    .value('a', 123)
    .factory('f', function() {
        console.log('module app.home.factory');
        return 123;
    })
    .directive('directiveName', function() {
        console.log('module app.home.directive');
    })
    .filter('filterName', function() {
        console.log('module app.home.filter');
    });