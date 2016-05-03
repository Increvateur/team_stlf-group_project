// ADD GOALS CONTROLLER - sends post to server for new goals

myApp.controller('GoalsController', ['$scope', 'GoalService', function($scope, GoalService) {

  console.log('HI, @CONTROLLER - GoalsController Works!');

  // Renames GoalService
  var goalService = GoalService;

  $scope.goalsArray = goalService.goalsArray;
  console.log('*** == @GoalsController - $scope.goalsArray: ', $scope.goalsArray);

  goalService.getGoals();


  // Empty object to store the goals entered by the User
  $scope.goals = {};

  // Object to populate the form with the months in order from Sept - Aug for the fiscal year
  // $scope.monthsObj.name is for any labeling on the DOM
  // $scope.monthsObj.key is for creating keys in $scope.goals object
  $scope.monthsObj = {
    months : [
      {
        name: 'September',
        key: 'september'
      },
      {
        name: 'October',
        key: 'october'
      },
      {
        name: 'November',
        key: 'november'
      },
      {
        name: 'December',
        key: 'december'
      },
      {
        name: 'January',
        key: 'january'
      },
      {
        name: 'February',
        key: 'february'
      },
      {
        name: 'March',
        key: 'march'
      },
      {
        name: 'April',
        key: 'april'
      },
      {
        name: 'May',
        key: 'may'
      },
      {
        name: 'June',
        key: 'june'
      },
      {
        name: 'July',
        key: 'july'
      },
      {
        name: 'August',
        key: 'august'
      }
    ]
  };

  // To save the User's input for the fiscal year. TODO Will need to change to a selection menu
  $scope.fiscalyear = '';

  // Need to update the Total Individual Goals for each month live!
  $scope.individualTotals = 'Individual Totals';

  // Function to add the fiscal year to the $scope.goal object once the user is not focused on the fiscal year input
  $scope.addFyKey = function(year) {
    $scope.fiscalyear = year;
    return $scope.fiscalyear;
  };

  // console.log('~ @goalController after addFyKey - $scope.goals: ', $scope.goals);



  // Function that process the data/goals inputed by the User and sends it through the newGoals() function in the GoalService
  $scope.saveGoals = function(data) {

    // var addGoals = {};

    // Console.logs - to verify information and confirm the data and $scope.fiscalyear
    console.log('@goalController.js fiscalyear: ', $scope.fiscalyear);
    console.log('! @goalController in saveGoals - data: ', data);

    // Run function newGoals() from GoalService that POSTs that data to the server
    goalService.newGoals(data);

    // Clears the goals object
    $scope.goals = {};

    goalService.getGoals();
  };

  // Adding Totals up
  $scope.indTotal = 0;

  $scope.calcIndTot = function() {
    // console.log('HELLO! @goalsController - goalToAdd: ', goalToAdd);

    var months = $scope.goals.months;
    var indivudal = 0;
    var staffTotal = 0;

    console.log('** ! = @goalsController in calcIndTot - months before for loop: ', months);

    var i;

    for(i in months) {
      staffTotal += months[i].staff;
    }
    console.log('@@@goalsController in calcIndTot - staffTotal after for loop: ', staffTotal);

    $scope.indTotal = staffTotal;

  };

}]);
