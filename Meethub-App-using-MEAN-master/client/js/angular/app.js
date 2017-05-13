var app=angular.module('event-management',['ngRoute', 'lbServices' ,'ui.router','datatables','ngAnimate', 'ngSanitize', 'ui.bootstrap','ngMap','ls.LiveSet', 'ls.ChangeStream']);

           
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'view/login-view.html',
            controller: 'login-ctrl',
             data: {}
        })

        .state('signUp', {
            url: '/signUp',
            templateUrl: 'view/signUp-view.html',
            controller: 'signUp-ctrl',
             data: {}
        })

        .state('events-admin', {
            url: '/events_admin',
            templateUrl: 'view/events-admin.html',
            controller: 'events-admin-ctrl as $ctrl',
            data: {
               requireLogin: true,
               accessedBy : "admin"
             }
        })

        .state('events-user', {
            url: '/events_user',
            templateUrl: 'view/events-user.html',
            controller: 'events-user-ctrl',
            data: {
               requireLogin: true,
               accessedBy : "user"
             }
        })

        .state('event_detail', {
            url: '/event_detail/:id',
            templateUrl: 'view/event-detail.html',
            controller: 'event-detail-ctrl',
            data: {
               requireLogin: true,
               accessedBy : "both"
             }
        })

        $urlRouterProvider.otherwise('/login');   
});

app.run(function ($rootScope, $state, authFact,$window) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var token = authFact.getToken();
    if( token != "undefined" && requireLogin == true){
        var userRole = $window.sessionStorage.getItem("user_name");
        if(userRole != undefined){
             userRole= userRole.slice(1, -1);
        if (toState.data.accessedBy == 'admin' && toState.name == "events-admin" && userRole == 'admin'){
        }
        else if (toState.data.accessedBy == 'user' && toState.name == "events-user" && userRole == 'user'){
        }
        else if (toState.data.accessedBy == 'both' && toState.name == "event_detail"){
        }
        else if (toState.data.accessedBy == 'admin' && toState.name == "events-admin" && userRole == 'admin'){
        }
        else if (toState.data.accessedBy == 'user' && toState.name == "events-user" && userRole == 'user'){
        }
        else{
            event.preventDefault();
        }
        }
    }
    else if(toState.name == "login" || toState.name == "signUp"){
    }
    else {
        event.preventDefault();
        }
  })
});

app.factory('authFact', function(LoopBackAuth){
    return{
        getToken: function(){
            return LoopBackAuth.accessTokenId;
        }
    }
})