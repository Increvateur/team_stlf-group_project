myApp.controller("loginController", ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {

    ////////////
    // close the login modal
    ////////////
  $scope.close = function() {
      $uibModalInstance.close();
  };
}]);
