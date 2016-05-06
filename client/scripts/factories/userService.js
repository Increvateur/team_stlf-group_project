myApp.factory("UserService", ["$http",'$window', function($http,$window) {

  // Posts a new user to the database
  var newUser = function(data) {
    console.log('-@FACTORY userServcie.js newUser(data) = ', data);
    $http.post('/user/adduser', data).then(function(response) {
      // some sort of feedback that user was added to DB
      console.log('@userService - newUser function *** after post - response: ', response);
    });
  };

  // Retrieves all the usernames from the server
  var getUsers = function() {

  };

  // Retrieves a specific user's data from the database
  var getUserData = function() {

  };

  // Verifies the user is authenticated and possibly an admin
  var verifyUser = function() {
    return $http.get('/user').then(function(response) {
      var user = {};

      // If response comes back "false", user is not authenticated
      if (response.data === false) {
        user.authenticated = false;
        return user;

      // Determines if the user is an Admin
      } else if (response.data.admin === true) {
        user.admin = true;
      }

      // If it gets here, user is authenticated and
      // their info placed into an object
      user.firstname = response.data.firstname;
      user.lastname = response.data.lastname;
      user.authenticated = true;
      return user;
      });
  };

  var logout = function(){
    $http.get('/logout').then(function(response){
      console.log(response);
      $window.location.href = '/';
    });
  };

  return {

    newUser: newUser,
    verifyUser : verifyUser,
    logout : logout

  };

}]);
