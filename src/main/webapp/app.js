console.log('loading app.js');

angular.module("app",['ui.router', 'app.home', 'app.about'])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

        console.log('module app.config');
        $urlRouterProvider.otherwise('/about');
        $stateProvider
            .state('app', {
                template: '<div class="app-body-body" ui-view></div>',
                abstract: true

            });
    }])
    .run(function(){
        console.log('module app.run');
    })
