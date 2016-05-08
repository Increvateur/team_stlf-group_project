/**
* Created by JFCS on 4/26/16.
*/
myApp.controller('UserController', ['$scope', 'UserService', '$timeout', function($scope, UserService, $timeout) {
  var userService = UserService;

  // Resets all form fields
  reset();

  // Retrieves the list of users from the database
  userService.getUsers().then(function(response) {
    $scope.userList = response;
  });

  // Retrieves the user data from the database and sets the form settings
  $scope.selectedUser = function(data) {
    userService.getUserData(data)
    .then(function(response) {
      $scope.stlfuser.firstname = response.data.firstname;
      $scope.stlfuser.lastname = response.data.lastname;
      $scope.stlfuser.email = response.data.email;
      $scope.stlfuser.username = response.data.username;
      $scope.stlfuser.admin = response.data.admin;
      $scope.stlfuser.password = "";

      $scope.selected = true;
      $scope.clear = false;
      $scope.save = false;
      $scope.delete = false;
      $scope.add = true;
      $scope.username = true;
      $scope.modify = false;
    });
  };

  // Posts new user to the database and clears out the input form
  $scope.submit = function(data) {
    userService.newUser(data).then(function(response) {
      $scope.userList = response;
      $scope.showAddAlert = true;
      reset();
    });
  };

  // Updates the form whenever input is entered
  $scope.changed = function() {
    if ($scope.selected === true) {
      $scope.add = true;
      $scope.delete = false;
      $scope.save = false;
    } else {
      $scope.add = false;
      $scope.save = true;
      $scope.clear = false;
      $scope.delete = true;
    }
  };

  // Loads the form reset via scope
  $scope.resetForm = function() {
    reset();
  };

  // Enables and disables modifying the username in the form
  $scope.enableUsername = function() {
    if ($scope.username === true) {
      $scope.username = false;
    } else {
      $scope.username = true;
    }
  };

  // Deletes the user from the database and resets the form
  $scope.deleteUser = function() {
    userService.deleteUser($scope.stlfuser).then(function(response) {
      $scope.userList = response;
      $scope.showDeleteAlert = true;
      reset();
    });
  };

  // Function for completely resetting the form
  function reset() {
    $scope.stlfuser = {};
    $scope.stlfuser.admin = false;
    $scope.add = true;
    $scope.save = true;
    $scope.delete = true;
    $scope.clear = true;
    $scope.username = false;
    $scope.modify = false;
    $scope.selected = false;
  }

  // Function for closing alerts
  $scope.closeAlert = function() {
     $scope.showAddAlert = false;
     $scope.showDeleteAlert = false;
   };
   
}]);
