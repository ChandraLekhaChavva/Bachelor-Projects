app.controller('events-admin-ctrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, Events, $uibModal, $log, $document, LiveSet, LoopBackAuth, createChangeStream,$window) {

//display on side bar
$scope.Userpanel_name = $window.sessionStorage.getItem("userName");             
$scope.Userpanel_name = $scope.Userpanel_name.slice(1, -1);
$scope.Userpanel_email = $window.sessionStorage.getItem("email");
$scope.Userpanel_email = $scope.Userpanel_email.slice(1, -1);
$scope.Userpanel_contact = $window.sessionStorage.getItem("contact");
 $scope.Userpanel_contact= $scope.Userpanel_contact.slice(1, -1);

//---------//

    Events.find({
        filter: {
            where: {
                'organizer': LoopBackAuth.currentUserId
            }
        }
    }, function (data) {
        $scope.eventData = data;
        var src = new EventSource('/api/events/change-stream');
        var changes = createChangeStream(src);
        var set = new LiveSet($scope.eventData, changes);
        $scope.eventData = set.toLiveArray();
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

    //creating new event in ui bootstrap model...
    var $ctrl = this;
    $ctrl.animationsEnabled = true;
    $ctrl.createModel = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'EventCreate.html',
                controller: 'EventCreate-ctrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {}
            });
        } //end of model creation


    //edit the event...
    $ctrl.editModel = function (event, size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'editModel.html',
                controller: 'editModel-ctrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });
        }
        //end of edit function...

    //delete the event...
    $scope.deleteEvent = function (event) {
        Events.deleteById({
            id: event.id
        }, function (data) {
            console.log(data);
        }, function (error) {
            console.log(error)
        })
    }
});


//model controller for new event creation...

app.controller('EventCreate-ctrl', function ($uibModalInstance, $scope, Events, LoopBackAuth) {

    //ng-change function on Date...
    $scope.currDate = new Date();
    $scope.dateError = {
        show: false,
        message: ''
    };

    $scope.dateChanged = function (start_date, end_date) {

            if (end_date != null) {
                if (start_date.getTime() > end_date.getTime()) {
                    $scope.dateError.show = true;
                    $scope.dateError.message = "Satrt date must less than  date";

                } else if (start_date.getTime() < $scope.currDate || end_date.getTime() < $scope.currDate) {
                    $scope.dateError.show = true;
                    $scope.dateError.message = "Dates must greater than  today";
                } else {
                    $scope.dateError.show = false;
                    $scope.dateError.message = "";
                }
            }
        }
        //datepicker modals for start and end date...
    $scope.mytime = new Date();
    $scope.startDatePopup = {
        opened: false
    };
    $scope.endDatePopup = {
        opened: false
    };
    $scope.startDatePicker = function () {
        $scope.startDatePopup.opened = true;
    };
    $scope.endDatePicker = function () {
        $scope.endDatePopup.opened = true;
    };
    //end of date picker models...


    //time picker settings...
    $scope.mytime = new Date();

    $scope.ismeridian = true;

    $scope.clear = function () {
        $scope.mytime = null;
    };
    //end of time picker settings...

    //map settings...
    $scope.geopos = {};
    $scope.geopos.lat = 0;
    $scope.geopos.lng = 0;

    $scope.render = true;
    $scope.validation_text = "";
    $scope.$on('mapInitialized', function (evt, evtMap) {
        $scope.map = evtMap;
        $scope.marker = new google.maps.Marker({
            position: evt.latLng,
            map: $scope.map
        });
        $scope.click = function (evt) {
            var latitude = evt.latLng.lat().toPrecision(8);
            var longitude = evt.latLng.lng().toPrecision(8);
            $scope.validation_text = "";
            $scope.marker.setPosition(evt.latLng);
            $scope.map.panTo(evt.latLng);
            $scope.map.setZoom(10);
            $scope.geopos.lat = latitude;
            $scope.geopos.lng = longitude;
        }
    });
    //end of map settings...

    var $ctrl = this;

    //create new event function...
    $scope.submit_createEvent = function (event_create, lat, lng) {
          var today = new Date();

        if(event_create.startTime == null){
            event_create.startTime.setHours=today.getHours();
            event_create.startTime.setMinutes=today.getMinutes();
            event_create.startTime.setSeconds=today.getSeconds();
        }
        else if(event_create.endTime == null){
             event_create.endTime.setHours=today.getHours();
            event_create.endTime.setMinutes=today.getMinutes();
            event_create.endTime.setSeconds=today.getSeconds();
        }

            //set date and time....
            event_create.startDate.setHours(event_create.startTime.getHours());
            event_create.startDate.setMinutes(event_create.startTime.getMinutes());
            event_create.startDate.setSeconds(event_create.startTime.getSeconds());

            event_create.endDate.setHours(event_create.endTime.getHours());
            event_create.endDate.setMinutes(event_create.endTime.getMinutes());
            event_create.endDate.setSeconds(event_create.endTime.getSeconds());

            //-----//
            event_create.startDate = event_create.startDate.getTime();
            event_create.endDate = event_create.endDate.getTime();
            event_create.startTime = event_create.startTime.getTime();
            event_create.endTime = event_create.endTime.getTime();

            event_create.location = {
                'latitude': lat,
                'longitude': lng
            };
            event_create.organizer = LoopBackAuth.currentUserId;
            event_create.subscribers = new Array();
            event_create.subscribers[0] = LoopBackAuth.currentUserId;

            console.log(event_create)
            if (event_create.startDate >= event_create.endDate || event_create.startDate < today || event_create.endDate < today) {
                console.log("Start Date is not greater than end date...");
            } else if (event_create.startDate < event_create.endDate) {
                Events.create(event_create, function (data) {
                    console.log(data);
                    $uibModalInstance.close();
                }, function (error) {
                    console.log(error);
                    $uibModalInstance.close();
                })
            }
        }
        //END OF createEvent function...
});

//model controller for edit Event...
app.controller('editModel-ctrl', function (event, $uibModalInstance, $scope, Events) {
    $scope.event_create = event;
    $scope.currDate = new Date();

      //ng-change function on Date...
    $scope.dateError = {
        show: false,
        message: ''
    };

    $scope.dateChanged = function (start_date, end_date) {
console.log(start_date , end_date)
            if (end_date != null && start_date != null) {
                if (start_date >= end_date) {
                    $scope.dateError.show = true;
                    $scope.dateError.message = "Start date must less than end date";

                } else if (start_date < $scope.currDate || end_date < $scope.currDate) {
                    $scope.dateError.show = true;
                    $scope.dateError.message = "Start must greater than end today";
                } else {
                    $scope.dateError.show = false;
                    $scope.dateError.message = "";
                }
            }
            else{
                 $scope.dateError.show = true;
                 $scope.dateError.message = "Dates are required";
            }
        }

    //datepicker modals for start and end date in edit model...
    $scope.startDatePopup = {
        opened: false
    };
    $scope.endDatePopup = {
        opened: false
    };
    $scope.startDatePicker = function () {
        $scope.startDatePopup.opened = true;
    };
    $scope.endDatePicker = function () {
        $scope.endDatePopup.opened = true;
    };
    //end of date picker models...


    //time picker settings in editModel...
    $scope.mytime = new Date();

    $scope.ismeridian = true;

    $scope.clear = function () {
        $scope.mytime = null;
    };
    //end of time picker settings...

    //map settings in editModel...
    $scope.geopos = {};
    $scope.geopos.lat = 51.50722;
    $scope.geopos.lng = -0.12750;

    $scope.render = true;
    $scope.validation_text = "";
    $scope.$on('mapInitialized', function (evt, evtMap) {
        $scope.map = evtMap;
        $scope.marker = new google.maps.Marker({
            position: evt.latLng,
            map: $scope.map
        });
        $scope.click = function (evt) {
            var latitude = event_create.location.latitude;
            var longitude = event_create.location.longitude;
            $scope.validation_text = "";
            $scope.marker.setPosition(evt.latLng);
            $scope.map.panTo(evt.latLng);
            $scope.map.setZoom(10);
            $scope.geopos.lat = latitude;
            $scope.geopos.lng = longitude;
        }
    });
    //end of map settings...

    var $ctrl = this;

    //editEvent function...
    $scope.submit_editEvent = function (event_create, lat, lng) {
         var today = new Date();
        
            //set date and time....
            $scope.startDate_edit.setHours( $scope.startTime_edit.getHours());
             $scope.startDate_edit.setMinutes( $scope.startTime_edit.getMinutes());
             $scope.startDate_edit.setSeconds( $scope.startTime_edit.getSeconds());

             $scope.endDate_edit.setHours( $scope.endTime_edit.getHours());
            $scope. endDate_edit.setMinutes( $scope.endTime_edit.getMinutes());
            $scope. endDate_edit.setSeconds( $scope.endTime_edit.getSeconds());

            //-----//
            event_create.startDate =  $scope.startDate_edit.getTime();
            event_create.endDate =  $scope.endDate_edit.getTime();
            event_create.startTime =  $scope.startTime_edit.getTime();
            event_create.endTime =  $scope.endTime_edit.getTime();

            event_create.location = {
                'latitude': lat,
                'longitude': lng
            };
            event_create.organizer = '239y432y47239y23y74y37284y78';

            console.log(event_create)
            if (event_create.startDate >= event_create.endDate || event_create.startDate < today || event_create.endDate < today) {
                console.log("Start Date is not greater than end date...");
            } else if (event_create.startDate < event_create.endDate) {
                Events.replaceById({
                    id: event.id
                }, event_create, function (data) {
                    console.log(data);
                    $uibModalInstance.close();
                }, function (error) {
                    console.log(error);
                    $uibModalInstance.close();
                })
            }
        }
        //END OF editEvent function...
});