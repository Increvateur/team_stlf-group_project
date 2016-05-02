myApp.factory("UserService", ["$http",'$window', function($http,$window) {

  var data = {};

  var getNames = function() {
    return $http.get("/getnames").then(function(response) {
      data.response = response.data;
      return response.data;
    });
  };

  var postNames = function(data) {
    console.log(data);
    return $http.post("/postnames", data).then(function(response) {
      return getNames();
    });
  };

  var newUser = function(data) {
    console.log('-@FACTORY userServcie.js newUser(data) = ', data);
    // $http.post('users/newuser', data).then(function(response) {
    //   // some sort of feedback that user was added to DB
    // });
  };

  var logout = function(){
    $http.get('/logout').then(function(response){
      console.log(response);
      $window.location.href = '/';
    });
  };

  return {

    getNames : getNames,
    postNames : postNames,
    newUser: newUser,
    data : data,
    logout : logout

  };

}]);
