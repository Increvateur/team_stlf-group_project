
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap','smart-table']);



myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


        $routeProvider
            .when('/', {
                templateUrl: 'assets/views/templates/home.html',
                controller: 'HomeController'
            })
            .when('/queries', {
                templateUrl: 'assets/views/templates/queries.html',
                controller: 'QueryController'
            })
            .when('/failure', {
                templateUrl: 'assets/views/templates/failure.html',
                controller: 'MainController'
            })
            .when('/register', {
                templateUrl: 'assets/views/templates/register.html',
                controller: 'AddUserController'
            })
            .when('/goals', {
                templateUrl: 'assets/views/templates/goals.html',
                controller: 'AddGoalsController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

    }]);
