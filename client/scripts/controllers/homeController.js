/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("HomeController", ["$scope", "$filter", "$uibModal",'MoneyRaisedService','GoalService',
    function($scope, $filter, $uibModal, MoneyRaisedService, GoalService) {

        var moneyRaisedService = MoneyRaisedService;
        var goalService = GoalService;

        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.goals=[];


        $scope.getGoals = function(){
          $scope.goals = goalService.getGoals();
        };

        $scope.buildtable = function() {
            $scope.accounts = moneyRaisedService.accountArray;
            //$scope.getGoals();

        };


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
        moneyRaisedService.getTotals();
        moneyRaisedService.moneyRaised();
        $scope.data = moneyRaisedService.data;
        $scope.forceData = moneyRaisedService.forceData;
        $scope.forceresponse = moneyRaisedService.forceresponse;
        $scope.buildtable();

}]);
