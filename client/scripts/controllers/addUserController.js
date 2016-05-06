/**
 * Created by JFCS on 4/26/16.
 */
myApp.controller('AddUserController', ['$scope', 'UserService', function($scope, UserService) {
    var userService = UserService;

    // Empties out the scopes for new user data entry
    $scope.addUser = {};
    $scope.addUser.admin = false;


    // Posts new user to the database and clears out the input form
    $scope.submit = function(data) {
        userService.newUser(data);
        $scope.addUser = {};
    };
}]);
