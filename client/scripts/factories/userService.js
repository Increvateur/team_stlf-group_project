myApp.factory("UserService", ["$http",'$window', function($http,$window) {

  var newUser = function(data) {
    console.log('-@FACTORY userServcie.js newUser(data) = ', data);
    $http.post('/user/postnames', data).then(function(response) {
      // some sort of feedback that user was added to DB
      console.log('@userService - newUser function *** after post - response: ', response);

    });
  };

  var verifyUser = function() {
    return $http.get('/user').then(function(response) {
      var user = {};
      if (response.data === false) {
        user.authenticated = false;
        return user;
      } else if (response.data.admin === true) {
        user.admin = true;
      }
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
