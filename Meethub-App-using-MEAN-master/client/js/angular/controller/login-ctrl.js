app.controller('login-ctrl',function($scope,$http,User,$state, $window){
            $scope.login_error=false;
            
    //handle user login data...
    $scope.submitUserLogin = function(userLogin){
        User.login(userLogin, function(data){
             $window.sessionStorage.setItem("user_name", JSON.stringify(data.user.userRole));
            $window.sessionStorage.setItem("contact", JSON.stringify(data.user.contactNo));
            $window.sessionStorage.setItem("userName", JSON.stringify(data.user.fullName));
            $window.sessionStorage.setItem("email", JSON.stringify(data.user.email));
            $scope.login_error=false;
            if(data.user.userRole == 'admin'){
                 $state.transitionTo('events-admin');
            }
            else if(data.user.userRole == 'user')
                 $state.transitionTo('events-user');
        },function(error){
            $scope.login_error=true;
            console.log(error);
        })
    }

});