/**
 * Created by JFCS on 4/22/16.
 */



myApp.controller("HomeController", ["$scope", "$filter", "$uibModal",'MoneyRaisedService','GoalService',
    function($scope, $filter, $uibModal, MoneyRaisedService, GoalService) {

        var moneyRaisedService = MoneyRaisedService;
        var goalService = GoalService;
        var endDate = new Date();
        var today = new Date();
        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.goals=[];
        $scope.date = today.getFullYear();
        $scope.endDate = moneyRaisedService.endDate;
        ////////////////
        // Get the info to build the tables
        ////////////////
        $scope.getGoals = function(){
          $scope.goals = goalService.getGoals();
        };

        $scope.buildtable = function() {
            $scope.accounts = moneyRaisedService.accountArray;
            //$scope.getGoals();
        };

        ///////////////////


        ///////////
        // open the chart modal.
        ///////////
        $scope.open = function(size, data) {
            console.log("Inside the Chart Open Function:", data);

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
            moneyRaisedService.setEndDate(endDate);
        };




        moneyRaisedService.getTotals();
        moneyRaisedService.moneyRaised();
        $scope.data = moneyRaisedService.data;
        $scope.forceData = moneyRaisedService.forceData;
        $scope.forceresponse = moneyRaisedService.forceresponse;
        $scope.buildtable();

}]);
