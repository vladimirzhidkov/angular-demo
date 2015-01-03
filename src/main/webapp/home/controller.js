angular.module("app.about")
    .controller('homeCtrl',['$scope','friends', 'Friends', function($scope, friends, Friends){

        console.log('module app.home.controller');

        var f = Friends.get();

        $scope.title = "Home";
        $scope.data = friends;

//        Friends.get().then(function(result){
//            console.log('module app.home.controller Friends callback: ' + result);
//            $scope.data = result;
//        });


        //$scope.data = Friends.get().data;

        $scope.items = ['item1','item2','item3'];
        $scope.selectedItem = $scope.items[0];

        // Data for slick grid
//        var someDates = ["01/01/2009", "02/02/2009", "03/03/2009"];
//        data = [];
//        for (var i = 0; i < 500; i++) {
//            var d = (data[i] = {});
//            d["id"] = "id_" + i;
//            d["num"] = i;
//            d["title"] = "Task " + i;
//            d["duration"] = Math.round(Math.random() * 30);
//            d["percentComplete"] = Math.round(Math.random() * 100);
//            d["start"] = someDates[ Math.floor((Math.random()*2)) ];
//            d["finish"] = someDates[ Math.floor((Math.random()*2)) ];
//            d["cost"] = Math.round(Math.random() * 10000) / 100;
//            d["effortDriven"] = (i % 5 == 0);
//        }
//        $scope.tableData = data;
    }])