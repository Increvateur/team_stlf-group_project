/**
 * Created by JFCS on 4/26/16.
 */
myApp.controller('UserController', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
    var userService = UserService;

    userService.verifyUser().then(function(response) {
        if(response.authenticated) {
            if (response.admin === true) {
                $scope.admin = true;
            } else {
                $scope.admin = false;
            }
            $scope.login = true;
            $scope.user = response;
        } else {
            $scope.admin = false;
            $scope.login = false;
        }
    });
}]);
