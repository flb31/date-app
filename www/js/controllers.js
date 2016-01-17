angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, User, Login) {
  $scope.user = User.info();
  $scope.logout = function(){
    Login.logout();
  }
})

.controller('CalendarCtrl', function($scope, calendarConfig, Chats, User) {
  
  var vm = this;
  
  var dataEvents = new Array();
  var dates = User.dates();
  if(dates){
    var current = new Date();
    for(var k in dates ){
      var item = dates[k];
      var id = item
      var date = new Date(item.date);
      var type = ( current > date )? 'important' : 'success';
      var title = item.title + " , Doctor: " + item.doctor;
      var dateM = moment(date);

      dataEvents.push ( 
                {
                  id : id,
                  title : title,
                  startsAt : dateM._d,
                  //endsAt: ,
                  type: type,
                  editable : false,
                  editable: false, 
                  deletable: false, 
                  draggable: false,
                  resizable: false,
                  incrementsBadgeTotal: true,
                  recursOn: 'year'
                }
      );
    }  
  }
  
  moment.locale('es', {weekdays: 'D_L_M_M_J_V_S'.split('_') });
  calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
  var originali18n = angular.copy(calendarConfig.i18nStrings);

  vm.calendarView = 'month';
  vm.viewDate = new Date();
  vm.events = dataEvents;
  
  vm.eventClicked = function(event) {
    alert('Clicked');
    console.log(event);
  };

})
/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('SettingCtrl', function($scope, User) {
  $scope.user = User.info();
  $scope.totalDates = User.totalDates();
})

.controller('TabsCtrl', function($scope, Login) {
  $scope.$watch( function() {
    return Login.isLogged();
  },
  function(newVal, oldVal){
    $scope.show_tabs =  ( newVal ) ? '' : 'main-tab';  
  });
})
.controller('LoginCtrl', function($scope, $location, Login) {
  
  $scope.loginUser = function(user_id){
    Login.loadUser(user_id, goHome);
  }
  var goHome = function(){
    $location.path("/tab/home");
  }
})
