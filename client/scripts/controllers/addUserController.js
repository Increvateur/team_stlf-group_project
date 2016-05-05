/**
 * Created by JFCS on 4/26/16.
 */
myApp.controller('AddUserController', ['$scope', 'UserService', function($scope, UserService) {

    console.log('AddUserController Works!');

    // Redeclares UserService
    var userService = UserService;

    // Empty object to store new User data that the Admin inputs
    $scope.addUser = {};
    $scope.addUser.admin = false;


    // Function that runs the new User data through the newUser() function in UserService
    $scope.submit = function(data) {
        console.log('@mainController.js AddUserController data (AKA: addUser: ', data);

        // Function to POST new User data to server
        userService.newUser(data);


    // Clears addUser object
    $scope.addUser = {};

    };
}]);
