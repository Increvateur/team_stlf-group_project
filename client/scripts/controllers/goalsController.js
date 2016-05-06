// ADD GOALS CONTROLLER - sends post to server for new goals

myApp.controller('GoalsController', ['$scope', 'GoalService', function($scope, GoalService) {

  console.log('HI, @CONTROLLER - GoalsController Works!');

  // Renames GoalService
  var goalService = GoalService;

  $scope.goalsArray = goalService.goalsArray;
  console.log('*** == @GoalsController - $scope.goalsArray: ', $scope.goalsArray);

  goalService.getGoals();

  $scope.yearArray = [];
  goalService.setYearList();

  console.log('<<< CURRENT YEAR & YEARS >>> : ', goalService.currentYear, goalService.years);

  $scope.yearArray = goalService.years;
  console.log('// === @GoalsController - $scope.yearArray: ', $scope.yearArray);


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
  // $scope.fiscalyear = 'Fiscal Year';

  // Monthly total for individul goals (staff, board, committee, parent, alum, participant, and community support)
  $scope.indTotal = 0;

  // Yearly totals for every goal
  $scope.yearlyTotal = 0;

  // Function to add the fiscal year to the $scope.goal object once the user is not focused on the fiscal year input

  $scope.year = '';

  $scope.fiscalYear = function(year){
    $scope.addFyKey(year);
    $scope.findYear();
    return $scope.goals.fiscalyear;

  };


  $scope.addFyKey = function(year) {
    $scope.fiscalyear = year;
    $scope.goals.fiscalyear = $scope.fiscalyear;
    return $scope.goals.fiscalyear;
  };



  // Checks to see if the year selected by Admin is in the DB
  // If the year is already recorded it pulls it in to be updated
  $scope.findYear = function() {
    console.log('HI, FISCAL YEAR: ', $scope.goals.fiscalyear);
    console.log('~ @goalController in findYear - $scope.goals: ', $scope.goals);

    goalService.getSpecificYear($scope.goals.fiscalyear).then(function(response){
        $scope.goals = response;
        console.log('~~~~~~~~~~~~~~~~~~~<- $scope.goals', $scope.goals);
    });
  };



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


  // Function used to calculate totals on form
  $scope.calcTotals = function() {

    // $scope.calcIndTot();
    // $scope.calcYearlyTotals();

    // Log to make sure it works!
    console.log('=_-_= @goalsController in calcTotals');


    // main variables
    $scope.goals.yearly_totals = {};
    var goals = $scope.goals;
    var months = goals.months;
    var yearly_totals = goals.yearly_totals;
    // var staff_total;
    // var board_total;
    // var committee_total;
    // var parent_total;
    // var alum_total;
    // var participant_total;
    // var community_total;
    // var individual_yearly_total;
    // var corporate_organization_total;
    // var corporate_match_total;
    // var corporate_yearly_total;
    // var corporate_foundation_total;
    // var family_foundation_total;
    // var general_foundation_total;
    // var foundation_yearly_total;


    console.log('~~ - ~~ @goalsController in calcTotals - goals, months, yearly_totals: ', goals, months, yearly_totals);


    // Declaring all neccessary variables here:
    var yearlyTotal;
    var month;

    var staffTotal = 0;
    var boardTotal = 0;
    var committeeTotal = 0;
    var parentTotal = 0;
    var alumTotal = 0;
    var participantTotal = 0;
    var communityTotal = 0;
    var individualTotal = 0;
    var corporateTotal = 0;
    var corporateOrganizationTotal = 0;
    var corporateMatchTotal = 0;
    var foundationTotal = 0;
    var corporateFoundationTotal = 0;
    var familyFoundationTotal = 0;
    var generalFoundationTotal = 0;

    var monthlyTotal;

    // Loop through $scope.goals object to calculate totals
    var i;

    for(i in months) {

      // Declare variables for loop (specific to each month)
      month = months[i];
      console.log('~~~~ @@goalsController in for loop of calcTotals - month: ', month);

      // var staff = month.staff;
      // var board = month.board;
      // var committee = month.committee;
      // var parent = month.parent;
      // var alum = month.alum;
      // var participant = month.participant;
      // var community = month.community;
      // var individualMonthTotal = month.individual;
      // var corporateMonthTotal = month.corporate_total;
      // var corporateOrganization = month.corporate_organization;
      // var corporateMatch = month.corporate_match;
      // var foundationMonthTotal = month.foundation_total;
      // var corporateFoundation = month.corporate_foundation;
      // var familyFoundation = month.family_foundation;
      // var generalFoundation = month.general_foundation;

      var staff = month.staff;
      if ( isNaN(staff) ){
        staff = 0;
      }

      var board = month.board;
      if ( isNaN(board) ){
        board = 0;
      }

      var committee = month.committee;
      if ( isNaN(committee) ){
        committee = 0;
      }

      var parent = month.parent;
      if ( isNaN(parent) ){
        parent = 0;
      }

      var alum = month.alum;
      if ( isNaN(alum) ){
        alum = 0;
      }

      var participant = month.participant;
      if ( isNaN(participant) ){
        participant = 0;
      }

      var community = month.community;
      if ( isNaN(community) ){
        community = 0;
      }

      var corporateOrganization = month.corporate_organization;
      if ( isNaN(corporateOrganization) ){
        corporateOrganization = 0;
      }

      var corporateMatch = month.corporate_match;
      if ( isNaN(corporateMatch) ){
        corporateMatch = 0;
      }

      var corporateFoundation = month.corporate_foundation;
      if ( isNaN(corporateFoundation) ){
        corporateFoundation = 0;
      }

      var familyFoundation = month.family_foundation;
      if ( isNaN(familyFoundation) ){
        familyFoundation = 0;
      }

      var generalFoundation = month.general_foundation;
      if ( isNaN(generalFoundation) ){
        generalFoundation = 0;
      }

      // MONTHLY TOTALS

      var individualMonthTotal = staff + board + committee + parent + alum + participant + community;
      // if ( isNaN(individual) ){
      //   individual = 0;
      // }
      month.individual_total = individualMonthTotal;

      var corporateMonthTotal = corporateOrganization + corporateMatch;
      // if ( isNaN(corporateMonthTotal) ){
      //   corporateMonthTotal = 0;
      // }
      month.corporate_total = corporateMonthTotal;

      var foundationMonthTotal = corporateFoundation + familyFoundation + generalFoundation;
      // if ( isNaN(foundationMonthTotal) ){
      //   foundationMonthTotal = 0;
      // }
      month.foundation_total = foundationMonthTotal;


      console.log('HERE IS THE FOR LOOP @goalsController calcTotals() - months[i].all: ', staff,
      board, committee, parent, alum, participant, community, individualMonthTotal,
      corporateOrganization, corporateMatch, corporateMonthTotal, foundationMonthTotal, corporateFoundation, familyFoundation, generalFoundation);


      monthlyTotal = individualMonthTotal + corporateMonthTotal + foundationMonthTotal;
      console.log('% %  %   @@@goalsController in calcTotals - monthlyTotal in for loop: ', monthlyTotal);

      console.log('** - = @goalsController in calcTotals - $scope.goals: ', $scope.goals);

      // Dynamically saves and creates totals

      // monthly_total creates totals for all goals in each month
      month.monthly_total = monthlyTotal;

      staffTotal += month.staff;
      console.log('+++ @goalsController in loop - staffTotal: ', staffTotal);
      yearly_totals.staff_year = staffTotal;

      boardTotal += month.board;
      yearly_totals.board_year = boardTotal;

      committeeTotal += month.committee;
      yearly_totals.committee_year = committeeTotal;

      parentTotal += month.parent;
      yearly_totals.parent_year = parentTotal;

      alumTotal += month.alum;
      yearly_totals.alum_year = alumTotal;

      participantTotal += month.participant;
      yearly_totals.participant_year = participantTotal;

      communityTotal += month.community;
      yearly_totals.community_year = communityTotal;

      individualTotal += month.individual_total;
      yearly_totals.individual_year = individualTotal;

      corporateOrganizationTotal += month.corporate_organization;
      yearly_totals.corporate_organization_year = corporateOrganizationTotal;

      corporateMatchTotal += month.corporate_match;
      yearly_totals.corporate_match_year = corporateMatchTotal;

      corporateTotal += month.corporate_total;
      yearly_totals.corporate_year = corporateTotal;

      corporateFoundationTotal += month.corporate_foundation;
      yearly_totals.corporate_foundation_year = corporateFoundationTotal;

      familyFoundationTotal += month.family_foundation;
      yearly_totals.family_foundation_year = familyFoundationTotal;

      generalFoundationTotal += month.general_foundation;
      yearly_totals.general_foundation_year = generalFoundationTotal;

      foundationTotal += month.foundation_total;
      yearly_totals.foundation_year = foundationTotal;


      yearlyTotal = individualTotal + corporateTotal + foundationTotal;
      console.log('! - H E L L O  @goalsController in calcTotals in loop - yearlyTotal: ', yearlyTotal);
      yearly_totals.year_total = yearlyTotal;

    }



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
