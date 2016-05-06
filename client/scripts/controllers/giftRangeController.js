/**
 * Created by JFCS on 5/4/16.
 */
/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("GiftRangeController", ["$scope", "$filter", "$uibModal",'GiftRangeService',

    function($scope, $filter, $uibModal,GiftRangeService) {

        var giftRangeService = GiftRangeService;

        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.gifts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.amountRaised = [];

        giftRangeService.giftRange();

        //$scope.data = giftRangeService.data;
        //
        //$scope.forceData = giftRangeService.forceData;
        //
        //$scope.forceresponse = giftRangeService.forceresponse;
        $scope.gifts = giftRangeService.giftArray;
        $scope.amountRaised = giftRangeService.amountRaised;



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


