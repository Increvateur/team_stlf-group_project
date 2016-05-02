myApp.factory("UserService", ["$http",'$window', function($http,$window) {

  var newUser = function(data) {
    console.log('-@FACTORY userServcie.js newUser(data) = ', data);
    $http.post('/user/postnames', data).then(function(response) {
      // some sort of feedback that user was added to DB
      console.log('@userService - newUser function *** after post - response: ', response);

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
    logout : logout

  };

}]);
