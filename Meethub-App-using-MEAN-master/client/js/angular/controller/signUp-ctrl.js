app.controller('signUp-ctrl', function ($scope, $http, User, $state, $window) {

    //handle signup data...
    $scope.signUpuser = function (userSignUp) {
        User.create(userSignUp, function (data) {
            $window.sessionStorage.setItem("user_name", JSON.stringify(userSignUp.userRole));
             $state.transitionTo('login');
        }, function (error) {
            console.log(error)
        });
    }
});