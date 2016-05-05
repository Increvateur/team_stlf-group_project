/**
 * Created by JFCS on 4/26/16.
 */
myApp.controller('UserController', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
    var userService = UserService;


    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE

    userService.verifyUser().then(function(response) {
        $scope.user = response;
    });
}]);
