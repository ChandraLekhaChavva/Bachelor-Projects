app.controller('events-user-ctrl', function ($scope, DTOptionsBuilder, LoopBackAuth, DTColumnDefBuilder, Events, $window) {


//display on side bar
$scope.Userpanel_name = $window.sessionStorage.getItem("userName");             
$scope.Userpanel_name = $scope.Userpanel_name.slice(1, -1);
$scope.Userpanel_email = $window.sessionStorage.getItem("email");
$scope.Userpanel_email = $scope.Userpanel_email.slice(1, -1);
$scope.Userpanel_contact = $window.sessionStorage.getItem("contact");
 $scope.Userpanel_contact= $scope.Userpanel_contact.slice(1, -1);

//---------//


    Events.find(function (data) {
        $scope.eventData = data;
    }, function (error) {
        console.log(error);
    })


    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(5);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6)
    ];
    var subscriberId = LoopBackAuth.currentUserId;
    $scope.registerWithEvent = function () {}
});