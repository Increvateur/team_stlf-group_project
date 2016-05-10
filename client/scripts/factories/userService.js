myApp.factory("UserService", ["$http",'$window', function($http, $window) {

  // Posts a new user to the database
  var newUser = function(data) {
    return $http.post('/user/adduser', data).then(function() {
      return getUsers().then(function(response) {
        return response;
      });
    });
  };

  // Retrieves all the usernames from the server
  var getUsers = function() {
    return $http.get("/user/getusers").then(function(response) {
      return response.data;
    });

  };

  // Retrieves a specific user's data from the database
  var getUserData = function(data) {
    return $http.get("/user/getuserdata/" + data).then(function(response) {
      return response;
    });
  };

  // Updates the user in the database
  var updateUser = function(data) {
    return $http.put("/user/updateuser", data).then(function() {
      return getUsers().then(function(response) {
        return response;
      });
    });
  };

  // Deletes the specific user from the database
  var deleteUser = function(data) {
    return $http.post("/user/deleteuser", data).then(function() {
      return getUsers().then(function(response) {
        return response;
      });
    });
  };

  // Saves updated user data to the database
  var saveUser = function(data) {
    return $http.post("/user/saveuser").then(function(response) {
      console.log(response);
    });
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

  // Logs the user out and directs them to the main page
  var logout = function(){
    $http.get('/logout').then(function(response) {
      $window.location.href = '/';
    });
  };

  return {

    verifyUser : verifyUser,
    newUser: newUser,
    getUsers : getUsers,
    getUserData : getUserData,
    updateUser : updateUser,
    deleteUser : deleteUser,
    saveUser : saveUser,
    logout : logout

  };
}]);
