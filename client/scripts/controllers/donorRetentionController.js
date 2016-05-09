/**
 * Created by JFCS on 5/4/16.
 */
/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("DonorRetentionController", ["$scope", "$filter", "$uibModal", "DonorRetentionService",

    function($scope, $filter, $uibModal, DonorRetentionService) {

        var donorRetentionService = DonorRetentionService;
        var endDate = new Date();
        var today = new Date();
        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.retained = [];
        $scope.recovered = [];
        $scope.universe = [];
        $scope.date = today.getFullYear();
        $scope.endDate = donorRetentionService.endDate;

        donorRetentionService.getDonors();

        $scope.data = donorRetentionService.data;
        $scope.forceData = donorRetentionService.forceData;
        $scope.forceresponse = donorRetentionService.forceresponse;
        $scope.retained = donorRetentionService.retainedDonorsArray;
        $scope.recovered = donorRetentionService.recoveredDonorsArray;
        $scope.universe = donorRetentionService.universeArray;



        $scope.open = function(size , data) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './assets/views/routes/chartContent.html',
                controller: 'ChartContentController',
                size: size,
                keyboard: true,
                backdrop: 'static',
                resolve: {
                    results: function() { return data; }
                }
            });
        };
        ///////
        // datepicker
        /////

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: null,
            startingDay: 1
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };

        ////////////////////

        $scope.setEndDate = function(date){
            //console.log(date.getMonth());
            // this updates the table columns to the correct fiscal year for the data to be displayed.
            if(date.getMonth() < 8) {
                $scope.date = date.getFullYear();
            } else {
                $scope.date = date.getFullYear() + 1 ;
            }
            console.log('date display',$scope.date);
            endDate = date;
            //console.log(endDate);
            donorRetentionService.setEndDate(endDate);
        };

    }]);


