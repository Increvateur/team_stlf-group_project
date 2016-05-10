myApp.factory("GoalService", ["$http", function($http) {

  // Object to store a specific year for updating
  var goals = {};

  // Array to store goals when get call is complete from Server/DB
  var goalsArray = [];

  // POST to Server/DB for any new goals added by Admin
  var newGoals = function(addGoals) {
    console.log('*@FACTORY goalService, newGoals(addGoals): ', addGoals);

    // POST for new goals
    $http.post('/goals/postgoals', addGoals).then(function(response){
      // some sort of feedback that user was added to DB
      console.log('@GoalService in newGoals function after post - response: ', response);
    });
  };


  // GET from Server/DB to pull goals and stores them in goalsArray declared above
  var getGoals = function() {
    return $http.get('/goals/getgoals').then(function(response){
      console.log('@GoalService in getGoals() - response from server: ', response);

      // Saves goals from GET into array
      goalsArray = response.data;
      console.log('!-@GoalService in getGoals() - goalsArray: ', goalsArray);

      return response.data;
    });
  };


  // Year genrator function

  var date = new Date();
  date = date.getFullYear();
  var currentYear = date;
  var startYear = 2010;
  var endYear = currentYear + 2;
  var counter = endYear;
  var years = [];

  var setYearList = function() {
    var year = endYear;
    while (counter >= startYear) {
      years.push(year);
      year--;
      counter--;
    }
  };


  // GET to check for specific year
  var getSpecificYear = function(year) {
    console.log('<><> GET @goalService.js in getSpecificYear(year) - year: ', year);
    return $http.get('goals/' + year).then(function(response){
      console.log('xxxxxxx @goalService.js - from server, response.data: ', response.data);
      return response.data;

      // console.log('o` | `o -- @goalService GET specific year goals: ', goals);

    });

  };


  // PUT existing goals (edit current year's goals)
  var updateGoals = function(data) {

    console.log('@FACTORY - updateGoals() before put - data: ', data);

    $http.put('/goals/update', data).then(function(response){
      console.log('***@GoalService in updateGoals function after put - response: ', response);
    });

  };

  // Runs GET to pull goal data even if new goals are not entered
  // getGoals();

  return {
    newGoals: newGoals,
    getGoals: getGoals,
    getSpecificYear: getSpecificYear,
    updateGoals: updateGoals,
    goalsArray: goalsArray,
    setYearList: setYearList,
    currentYear: currentYear,
    years: years,
  };

}]);
