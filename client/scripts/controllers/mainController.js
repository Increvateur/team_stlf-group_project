myApp.controller("MainController", ["$scope", "UserService", "$uibModal",
function($scope, UserService, $uibModal) {
  var userService = UserService;

  // User verification
  userService.verifyUser().then(function(response) {
    if(response.authenticated) {
      if (response.admin === true) {
        $scope.admin = true;
      } else {
        $scope.admin = false;
      }
      $scope.login = true;
      $scope.user = response;
    } else {
      $scope.admin = false;
      $scope.login = false;
    }
  });

  // Login modal function and settings
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './assets/views/routes/loginModal.html',
      controller: 'loginController',
      size: size,
      keyboard: true
    });
  };

  // Logout function
  $scope.logout = function(){
    userService.logout();
  };

}]);
