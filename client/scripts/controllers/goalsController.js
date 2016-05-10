// ADD GOALS CONTROLLER - sends post to server for new goals

myApp.controller('GoalsController', ['$scope', 'GoalService', function($scope, GoalService) {


  console.log('HI, @CONTROLLER - GoalsController Works!');


  // Renames GoalService
  var goalService = GoalService;


  // Empty object to store the goals entered by the User
  $scope.goals = {};


  // FOR NG-HIDE/SHOWS to hide input boxes and disable buttons on form

  $scope.showYear = false;
  $scope.submitGoals = true;
  $scope.changeGoals = true;


  // GET to pull in years to dynamically populate drop down based on saved goals in DB
  function getYears() {
    goalService.getGoals().then(function(response) {

      $scope.goalsArray = response;
      console.log('*** == @GoalsController - $scope.goalsArray: ', $scope.goalsArray);
    });
  }

  // Calls getYears() right away to populate drop down for Admin
  getYears();


  // Allows Admin to add a year in the "Select Year" drop down -
  // Changes showYear to true and shows input box
  $scope.addYear = function() {
    $scope.goals = {};
    $scope.fiscalyear = '';
    $scope.showYear = true;
  };


  $scope.yearArray = [];
  goalService.setYearList();

  console.log('<<< CURRENT YEAR & YEARS >>> : ', goalService.currentYear, goalService.years);

  $scope.yearArray = goalService.years;
  console.log('// === @GoalsController - $scope.yearArray: ', $scope.yearArray);



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


  // Monthly total for individul goals (staff, board, committee, parent, alum, participant, and community support)
  $scope.indTotal = 0;

  // Yearly totals for every goal
  $scope.yearlyTotal = 0;

  // Functions and variables to add the fiscal year to the $scope.goal object -
  // once the user is not focused on the fiscal year input

  // $scope.yearSelected = 0;

  // Decalarse fiscalyear as an empty string to hide it until a year number is entered
  $scope.fiscalyear = '';


  // Function to take a selected year in the pre-populated year drop down -
  // and save it to goals.fiscal_year || Also calls findYear()
  $scope.fiscalYear = function(year){
    console.log('/////// year: ', year);
    $scope.fiscalyear = parseInt(year);
    var fy = $scope.fiscalyear;
    $scope.goals.fiscal_year = fy;

    // Calls to pull back that specific year's data to populate the form for updates
    $scope.findYear();
  };


  // Once Admin is not focused on input this saves the year entered to goals.fiscal_year
  // Also disables the update button but allows the Admin to save the goals
  $scope.addFyKey = function(year) {
    $scope.fiscalyear = parseInt(year);
    var fy = $scope.fiscalyear;
    $scope.goals.fiscal_year = fy;
    $scope.showYear = false;
    $scope.fiscalyear = 0;
    $scope.changeGoals = true;
    $scope.submitGoals = false;
    console.log('#$#$ = @goalsController in addFyKey() year, ', year, 'fy, ', fy,'$scope.fiscalyear, ', $scope.fiscalyear, 'and $scope.goals.fiscalyear', $scope.goals.fiscal_year);
  };


  // Checks to see if the year selected by Admin is in the DB
  // If the year is already recorded it pulls it in to be updated
  $scope.findYear = function() {
    console.log('HI, FISCAL YEAR: ', $scope.goals.fiscal_year);
    // console.log('~ @goalController in findYear - $scope.goals: ', $scope.goals);

    goalService.getSpecificYear($scope.goals.fiscal_year).then(function(response){
      if (response.fiscal_year === $scope.fiscalyear) {
        console.log('||| ---- @goalsController.js in getSpecificYear() after return from Service - $scope.fiscalyear: ', $scope.fiscalyear);
        $scope.goals = response;
        $scope.changeGoals = false;
        $scope.submitGoals = true;
        console.log('~~~~~~~~~~~~~~~~~~~<- $scope.goals: ', $scope.goals);
      } else {
        console.log('........ @goalsController.js in getSpecificYear() else after return from Service - $scope.fiscalyear: ', $scope.fiscalyear);
        $scope.goals = {};
        $scope.goals.fiscal_year = $scope.fiscalyear;
        console.log('~~~~~~~~~~~~~~~~~~~<- $scope.goals: ', $scope.goals);
      }

    });
  };


  // Update goals - PUT to update document in DB
  $scope.updateGoals = function(data) {
    console.log('----_U @goalsController in updateGoals() - data: ', data);

    goalService.updateGoals(data);
    $scope.goals = {};

    getYears();
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
    getYears();
  };


  // Clears form
  $scope.clearForm = function() {
    $scope.goals = {};
    $scope.fiscalyear = 0;
    $scope.showYear = false;
    $scope.submitGoals = true;
    $scope.changeGoals = true;
  };



  // Adding Totals up
  $scope.individualTotal = 0;


  // Function used to calculate totals on form
  $scope.calcTotals = function() {

    // Log to make sure it works!
    console.log('=_-_= @goalsController in calcTotals');


    // main variables
    $scope.goals.yearly_totals = {};
    var goals = $scope.goals;
    var months = goals.months;
    var yearly_totals = goals.yearly_totals;

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
      month.individual_total = individualMonthTotal;

      var corporateMonthTotal = corporateOrganization + corporateMatch;
      month.corporate_total = corporateMonthTotal;

      var foundationMonthTotal = corporateFoundation + familyFoundation + generalFoundation;

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



}]);
