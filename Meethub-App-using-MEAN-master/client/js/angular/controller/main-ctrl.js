app.controller('main-ctrl', function ($scope, User, LoopBackAuth, $state, $window) {

    $scope.logOut = function () {
        var accessTokenid = LoopBackAuth.accessTokenId;
        User.logout({
            accessTokenid: accessTokenid
        }, function (data) {
            $state.transitionTo('login');
            $window.sessionStorage.removeItem("user_name");
            $window.sessionStorage.removeItem("email");
            $window.sessionStorage.removeItem("userName");

            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
        }, function (error) {
            console.log(error)
        });
    }
});