myApp.controller("MainController", ["$scope", "$http", "UserService", "$uibModal", function($scope, $http, UserService, $uibModal) {
  var userService = UserService;
  // $scope.user = {};
  //
  // $http.get('/user').then(function(response) {
  //       if(response.data) {
  //           // $scope.userName = response.data.username;
  //           $scope.user = response.data;
  //           $scope.loggedIn = true;
  //           console.log('User Data: ', $scope.user);
  //       } else {
  //           // $window.location.href = '/index.html';
  //           $scope.loggedIn = false;
  //       }
  //   });

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
