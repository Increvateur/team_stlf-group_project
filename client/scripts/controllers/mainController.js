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
      keyboard: true,
      backdrop: 'static'
    });
  };

  $scope.logout = function(){
   console.log('clicked');
    userService.logout();
  };


}]);


// end login modal
