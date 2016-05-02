myApp.factory("GoalService", ["$http", function($http) {

  var goalsArray = [];

  var newGoals = function(addGoals) {
    console.log('*@FACTORY goalService, newGoals(addGoals): ', addGoals);

    $http.post('/goals/postgoals', addGoals).then(function(response){
      // some sort of feedback that user was added to DB
      console.log('@GoalService in newGoals function after post - response: ', response);
    });
  };

  var getGoals = function() {
    $http.get('/goals/getgoals').then(function(response){
      console.log('@GoalService in getGoals() - response from server: ', response);

      goalsArray = response.data;
      console.log('!-@GoalService in getGoals() - goalsArray: ', goalsArray);
    });
  };

  return {
    newGoals: newGoals,
    getGoals: getGoals
  };

}]);
