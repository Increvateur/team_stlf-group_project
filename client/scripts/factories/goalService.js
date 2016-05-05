myApp.factory("GoalService", ["$http", function($http) {

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
    $http.get('/goals/getgoals').then(function(response){
      console.log('@GoalService in getGoals() - response from server: ', response);

      // Saves goals from GET into array
      goalsArray = response.data;
      console.log('!-@GoalService in getGoals() - goalsArray: ', goalsArray);
    });
  };


  // Year genrator function

  var date = new Date();
  date = date.getFullYear();
  var currentYear = date;
  var startYear = 2003;
  var endYear = currentYear + 5;
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

    //http.get

  };


  // PUT existing goals (edit current year)
  var updateGoals = function(year) {

    //http.put

  };

  // Runs GET to pull goal data even if new goals are not entered
  // getGoals();

  return {
    newGoals: newGoals,
    getGoals: getGoals,
    goalsArray: goalsArray,
    setYearList: setYearList,
    currentYear: currentYear,
    years: years
  };

}]);
