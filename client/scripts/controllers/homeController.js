/**
 * Created by JFCS on 4/22/16.
 */


myApp.controller("HomeController", ["$scope", "$filter", "$uibModal",'QueryService',
    // testing data for front end practice.

    function($scope, $filter, $uibModal, QueryService) {
        //
        //var mockService = MockService;
        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.donations = [];
        $scope.campaigns = [];
        $scope.contacts = [];
        $scope.households = [];


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


