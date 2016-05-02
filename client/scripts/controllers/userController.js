/**
 * Created by JFCS on 4/26/16.
 */
myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.userName ='';
    $scope.user = {};

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $http.get('/user').then(function(response) {
        if(response.data) {
            // $scope.userName = response.data.username;
            $scope.user = response.data;
            console.log('User Data: ', $scope.user);
        } else {
            $window.location.href = '/index.html';
        }
    });
}]);
