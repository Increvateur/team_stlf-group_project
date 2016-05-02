myApp.controller("MainController", ["$scope", "UserService", "$uibModal", function($scope, UserService, $uibModal) {
  var userService = UserService;

// login modal

  $scope.open = function (size) {
    // ModalService.openModal({
    console.log('modal clicked',size);
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './assets/views/routes/loginModal.html',
      controller: 'loginController',
      size: size,
      keyboard: true
    });
  };

  $scope.logout = function(){
    userService.logout();
  };


}]);


// end login modal
