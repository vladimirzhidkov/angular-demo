console.log('loading about/module.js');
angular.module('app.about', [])
    .config(['$stateProvider', function($stateProvider){

    console.log('module app.about.config');
        $stateProvider
            .state('app.about', {
                url:'/about',
                templateUrl:'about/about.tpl.html'
            });
    }])
    .run(function(){
        console.log('module app.about.run');
    })