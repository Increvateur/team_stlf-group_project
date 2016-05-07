/**
 * Created by JFCS on 4/22/16.
 */
//angular.module('ui.bootstrap.demo').controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
//    $scope.format = 'yyyy/MM/dd';
//    $scope.date = new Date();
//});
myApp.controller('DatepickerPopupDemoCtrl', ['$scope', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        //dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date() + 1,
        //minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    //$scope.open2 = function() {
    //    $scope.popup2.opened = true;
    //};

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    //$scope.formats = ['MM-dd-yyyy'];
    $scope.format = 'MM-dd-yyyy';
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    //$scope.popup2 = {
    //    opened: false
    //};

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}]);

myApp.controller("HomeController", ["$scope", "$filter", "$uibModal",'MoneyRaisedService','GoalService',
    function($scope, $filter, $uibModal, MoneyRaisedService, GoalService) {

        var moneyRaisedService = MoneyRaisedService;
        var goalService = GoalService;

        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        $scope.accounts = [];
        $scope.data = [];
        $scope.forceData = [];
        $scope.forceresponse = [];
        $scope.goals=[];


        $scope.getGoals = function(){
          $scope.goals = goalService.getGoals();
        };

        $scope.buildtable = function() {
            $scope.accounts = moneyRaisedService.accountArray;
            //$scope.getGoals();

        };


        $scope.open = function(size, data) {
            console.log("Inside the Chart Open Function:", data);

            var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './assets/views/routes/chartContent.html',
              controller: 'ChartContentController',
              size: size,
              keyboard: true,
      		  backdrop: 'static',
              resolve: {
                  results: function() { return data; }
              }
            });
          };
        moneyRaisedService.getTotals();
        moneyRaisedService.moneyRaised();
        $scope.data = moneyRaisedService.data;
        $scope.forceData = moneyRaisedService.forceData;
        $scope.forceresponse = moneyRaisedService.forceresponse;
        $scope.buildtable();

}]);
