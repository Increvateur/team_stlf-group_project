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

  // Monthly total for individul goals (staff, board, committee, parent, alum, participant, and community support)
  $scope.indTotal = 0;

  // Yearly totals for every goal
  $scope.yearlyTotal = 0;

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
  // $scope.indTotal = 0;

  $scope.individualTotal = 0;


  // Function used to call the calcIndTot() & calcYearlyTotals() functions to calculate totals on form
  $scope.calcTotals = function() {

    // $scope.calcIndTot();
    // $scope.calcYearlyTotals();

    console.log('=_-_= @goalsController in calcTotals');

    var goals = $scope.goals;
    var months = goals.months;
    var yearly_totals = goals.yearly_totals;

    console.log('~~ - ~~ @goalsController in calcTotals - goals, months, yearly_totals: ', goals, months, yearly_totals);

    var yearly_total;
    var month;


    var staffTotal = 0;
    var boardTotal = 0;
    var committeeTotal = 0;
    var parentTotal = 0;
    var alumTotal = 0;
    var participantTotal = 0;
    var communityTotal = 0;
    var individualTotal = 0;
    var corporationsTotal = 0;
    var foundationsTotal = 0;
    var eventsTotal = 0;

    // var totalGoals;
    //
    // console.log('** ! = @goalsController in calcTotals - months before for loop: ', months);
    //
    // var i;
    //
    // for(i in months) {
    //   month = months[i];
    //
    //   console.log('~~~~ @@goalsController in for loop of calcTotals - month: ', month);
    //
    //
    //   staffTotal += month.staff;
    //   if ( isNaN(staffTotal) ){
    //     staffTotal = 0;
    //   }
    //
    //   boardTotal += month.board;
    //   if ( isNaN(boardTotal) ){
    //     boardTotal = 0;
    //   }
    //
    //   committeeTotal += month.committee;
    //   if ( isNaN(committeeTotal) ){
    //     committeeTotal = 0;
    //   }
    //
    //   parentTotal += month.parent;
    //   if ( isNaN(parentTotal) ){
    //     parentTotal = 0;
    //   }
    //
    //   alumTotal += month.alum;
    //   if ( isNaN(alumTotal) ){
    //     alumTotal = 0;
    //   }
    //
    //   participantTotal += month.participant;
    //   if ( isNaN(participantTotal) ){
    //     participantTotal = 0;
    //   }
    //
    //   communityTotal += month.community;
    //   if ( isNaN(communityTotal) ){
    //     communityTotal = 0;
    //   }
    //
    //   individualTotal += month.individual;
    //   if ( isNaN(individualTotal) ){
    //     individualTotal = 0;
    //   }
    //
    //   corporationsTotal += month.corporations;
    //   if ( isNaN(corporationsTotal) ){
    //     corporationsTotal = 0;
    //   }
    //
    //   foundationsTotal += month.foundations;
    //   if ( isNaN(foundationsTotal) ){
    //     foundationsTotal = 0;
    //   }
    //
    //   eventsTotal += month.events;
    //   if ( isNaN(eventsTotal) ){
    //     eventsTotal = 0;
    //   }
    //
    //
    //   console.log('HERE IS THE FOR LOOP @goalsController calcTotals() - months[i].all: ', staffTotal,
    //   boardTotal, committeeTotal, parentTotal, alumTotal, participantTotal, communityTotal, individualTotal,
    //   corporationsTotal, foundationsTotal, eventsTotal);
    //
    //
    //   totalGoals = staffTotal + boardTotal + committeeTotal + parentTotal + alumTotal + participantTotal +
    //   communityTotal + corporationsTotal + foundationsTotal + eventsTotal;
    //   console.log('% %  %   @@@goalsController in calcTotals - totalGoals in for loop: ', totalGoals);
    //
    //   $scope.yearlyTotal = totalGoals;
    //   console.log('@@@goalsController in calcTotals - $scope.yearlyTotal after for loop: ', $scope.yearlyTotal);
    //
    //   $scope.goals.yearly_totals = $scope.yearly_totals;
    //
    //   totalGoals = 0;
    //
    // }

  };



///////////////////


  // Calculates Yearly totals for all goals for Admin to view
  $scope.calcYearlyTotals = function() {

    console.log('=_-_= @goalsController in calcYearlyTotals');

    var months = $scope.goals.months;
    var yearly_total;
    var month;
    var staffTotal = 0;
    var boardTotal = 0;
    var committeeTotal = 0;
    var parentTotal = 0;
    var alumTotal = 0;
    var participantTotal = 0;
    var communityTotal = 0;
    var individualTotal = 0;
    var corporationsTotal = 0;
    var foundationsTotal = 0;
    var eventsTotal = 0;

    var totalGoals;

    console.log('** ! = @goalsController in calcYearlyTotals - months before for loop: ', months);

    var i;

    for(i in months) {
      month = months[i];

      console.log('~~~~ @@goalsController in for loop of calcYearlyTotals - month: ', month);


      staffTotal += month.staff;
      if ( isNaN(staffTotal) ){
        staffTotal = 0;
      }

      boardTotal += month.board;
      if ( isNaN(boardTotal) ){
        boardTotal = 0;
      }

      committeeTotal += month.committee;
      if ( isNaN(committeeTotal) ){
        committeeTotal = 0;
      }

      parentTotal += month.parent;
      if ( isNaN(parentTotal) ){
        parentTotal = 0;
      }

      alumTotal += month.alum;
      if ( isNaN(alumTotal) ){
        alumTotal = 0;
      }

      participantTotal += month.participant;
      if ( isNaN(participantTotal) ){
        participantTotal = 0;
      }

      communityTotal += month.community;
      if ( isNaN(communityTotal) ){
        communityTotal = 0;
      }

      individualTotal += month.individual;
      if ( isNaN(individualTotal) ){
        individualTotal = 0;
      }

      corporationsTotal += month.corporations;
      if ( isNaN(corporationsTotal) ){
        corporationsTotal = 0;
      }

      foundationsTotal += month.foundations;
      if ( isNaN(foundationsTotal) ){
        foundationsTotal = 0;
      }

      eventsTotal += month.events;
      if ( isNaN(eventsTotal) ){
        eventsTotal = 0;
      }


      console.log('HERE IS THE FOR LOOP @goalsController calcYearlyTotals() - months[i].all: ', staffTotal,
      boardTotal, committeeTotal, parentTotal, alumTotal, participantTotal, communityTotal, individualTotal,
      corporationsTotal, foundationsTotal, eventsTotal);


      totalGoals = staffTotal + boardTotal + committeeTotal + parentTotal + alumTotal + participantTotal +
      communityTotal + corporationsTotal + foundationsTotal + eventsTotal;
      console.log('% %  %   @@@goalsController in calcYearlyTotals - totalGoals in for loop: ', totalGoals);

      $scope.yearlyTotal = totalGoals;
      console.log('@@@goalsController in calcYearlyTotals - $scope.yearlyTotal after for loop: ', $scope.yearlyTotal);

      months.yearly_total = $scope.yearlyTotal;

      totalGoals = 0;

    }


  };




  $scope.calcIndTot = function() {
    // console.log('HELLO! @goalsController - goalToAdd: ', goalToAdd);

    var months = $scope.goals.months;
    var month;
    var individual = 'individual';
    var individualGoal = 0;
    var staffTotal = 0;
    var boardTotal = 0;
    var committeeTotal = 0;
    var parentTotal = 0;
    var alumTotal = 0;
    var participantTotal = 0;
    var communityTotal = 0;

    console.log('** ! = @goalsController in calcIndTot - months before for loop: ', months);

    var i;

    for(i in months) {
      month = months[i];

      console.log('~~~~ @@goalsController in for loop of calcIndTot - month: ', month);


      staffTotal += month.staff;
      if ( isNaN(staffTotal) ){
        staffTotal = 0;
      }

      boardTotal += month.board;
      if ( isNaN(boardTotal) ){
        boardTotal = 0;
      }

      committeeTotal += month.committee;
      if ( isNaN(committeeTotal) ){
        committeeTotal = 0;
      }

      parentTotal += month.parent;
      if ( isNaN(parentTotal) ){
        parentTotal = 0;
      }

      alumTotal += month.alum;
      if ( isNaN(alumTotal) ){
        alumTotal = 0;
      }

      participantTotal += month.participant;
      if ( isNaN(participantTotal) ){
        participantTotal = 0;
      }

      communityTotal += month.community;
      if ( isNaN(communityTotal) ){
        communityTotal = 0;
      }


      // console.log('HERE IS THE FOR LOOP @goalsController - months[i].staff - community: ', staffTotal,
      // boardTotal, committeeTotal, parentTotal, alumTotal, participantTotal, communityTotal);




      individualGoal = staffTotal + boardTotal + committeeTotal + parentTotal + alumTotal + participantTotal + communityTotal;
      console.log('% %  %   @@@goalsController in calcIndTot - individualGoal in for loop: ', individualGoal);

      // console.log('@@@goalsController in calcIndTot - staffTotal after for loop: ', staffTotal);

      $scope.indTotal = individualGoal;
      console.log('@@@goalsController in calcIndTot - $scope.indTotal after for loop: ', $scope.indTotal);

      month.individual = $scope.indTotal;
      // return $scope.indTotal;

      individualGoal = 0;
      staffTotal = 0;
      boardTotal = 0;
      committeeTotal = 0;
      parentTotal = 0;
      alumTotal = 0;
      participantTotal = 0;
      communityTotal = 0;

      $scope.indTotal = 0;

    }

  };




}]);
