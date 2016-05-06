/**
 * Created by JFCS on 5/4/16.
 */
/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("DonorRetentionController", ["$scope", "$filter", "$uibModal", "DonorRetentionService",

    function($scope, $filter, $uibModal, DonorRetentionService) {

        var donorRetentionService = DonorRetentionService;

        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.retained = [];
        $scope.recovered = [];
        $scope.universe = [];

        //
        donorRetentionService.getDonors();

        $scope.data = donorRetentionService.data;

        $scope.forceData = donorRetentionService.forceData;

        $scope.forceresponse = donorRetentionService.forceresponse;
        $scope.retained = donorRetentionService.retainedDonorsArray;
        $scope.recovered = donorRetentionService.recoveredDonorsArray;
        $scope.universe = donorRetentionService.universeArray;



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


