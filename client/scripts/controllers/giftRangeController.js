/**
 * Created by JFCS on 5/4/16.
 */
/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("GiftRangeController", ["$scope", "$filter", "$uibModal",

    function($scope, $filter, $uibModal) {


        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];

        //moneyRaisedService.moneyRaised();
        //
        //$scope.data = moneyRaisedService.data;
        //
        //$scope.forceData = moneyRaisedService.forceData;
        //
        //$scope.forceresponse = moneyRaisedService.forceresponse;
        //$scope.accounts = moneyRaisedService.accountArray;



        $scope.open = function(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './assets/views/routes/chartContent.html',
                controller: 'ChartContentController',
                size: size,
                keyboard: true,
                backdrop: 'static'
            });
        };


    }]);

