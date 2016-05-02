myApp.factory("GoalService", ["$http", function($http) {

  var newGoals = function(addGoals) {
    console.log('*@FACTORY goalService, newGoals(addGoals): ', addGoals);

    $http.post('/goals/postgoals', addGoals).then(function(response){
      // some sort of feedback that user was added to DB
      console.log('@GoalService in newGoals function after post - response: ', response);
    });
  };

  return {
    newGoals: newGoals
  };

}]);
