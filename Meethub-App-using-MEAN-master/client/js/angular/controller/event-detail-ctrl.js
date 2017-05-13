app.controller('event-detail-ctrl', function ($scope, Events, User,$window, $stateParams, LoopBackAuth,LiveSet, createChangeStream) {
    var id = $stateParams.id;
    $scope.subscribed = true;
    $scope.capacityFull = false;

    //subscribe the event by putting userId in sbscribers array...
    $scope.subscribeEvent = function () {
        Events.findById({
            id: id
        }, function (data) {

            if(data.capacity == data.subscribers.length){
                $scope.capacityFull = true;
            }
            else{
            data.subscribers.push(LoopBackAuth.currentUserId);
            $scope.subscribed = false;

            Events.updateOrCreate({
                id: id
            }, data, function (data) {
                getEventById();
                console.log("Successfully Subscribed Event");
            }, function (error) {
                console.log(error);
            })
            }
        }, function (error) {
            console.log(data);
        })
    }

    //subscribe the event by putting userId in sbscribers array...
    $scope.unSubscribeEvent = function () {
        Events.findById({
            id: id
        }, function (data) {
            for (var i = 0; i < data.subscribers.length; i++)
                if (data.subscribers[i] == LoopBackAuth.currentUserId) {
                    data.subscribers.splice(i, i + 1);
                    $scope.subscribed = true;

                    Events.updateOrCreate({
                        id: id
                    }, data, function (data) {
                        getEventById()
                        console.log("Successfully Un-subscribed Event");
                    }, function (error) {
                        console.log(error);
                    })
                }
        }, function (error) {
            console.log(data);
        })
    }

    getEventById();
    function getEventById(){
        //get the event first tyme...
        Events.findById({
            id: id
        }, function (data) {
            $scope.eventDetailData = data;

            if(data.capacity == data.subscribers.length){
                $scope.capacityFull = true;
            }
            for (var i = 0; i < $scope.eventDetailData.subscribers.length; i++) {
                if ($scope.eventDetailData.subscribers[i] == LoopBackAuth.currentUserId) {
                    $scope.subscribed = false;
                }
            }

            //gettind subscribers data...
            $scope.subscribers=[];
            for (var i = 0; i < $scope.eventDetailData.subscribers.length; i++) {
                User.findById({'access_token': accessTokenid},{id: $scope.eventDetailData.subscribers[i]},function(data){
                    $scope.subscribers.push(data);
                },function(error){
                    console.log(error)
                })
            }

            $scope.userRole = $window.sessionStorage.getItem("user_name");
            $scope.userRole= $scope.userRole.slice(1, -1);
            var accessTokenid = LoopBackAuth.accessTokenId;
            var userId =  $scope.eventDetailData.organizer;

            //getting organizer detaill from user model...
            User.findById({'access_token': accessTokenid},{id: userId},function(data){
                $scope.organizer = data;
            },function(error){
                console.log(error);
            })

            //map settings...
            $scope.geopos = {};
            $scope.geopos.lat = $scope.eventDetailData.location.latitude;
            $scope.geopos.lng = $scope.eventDetailData.location.longitude;

            $scope.render = true;
            $scope.validation_text = "";
            $scope.$on('mapInitialized', function (evt, evtMap) {
                $scope.map = evtMap;
                $scope.marker = new google.maps.Marker({
                    position: evt.latLng,
                    map: $scope.map
                });
            });
            //end of map settings...

        }, function (error) {
            console.log(error)
        });
    }//end of function...
});
