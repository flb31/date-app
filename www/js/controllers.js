angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, User, Login, CalendarNotification, $location) {
  $scope.user = User.info();
  $scope.logout = function(){
    Login.logout();
  }
  
  //Load dates for notification
  var dates = User.dates();
  for ( var i = 0; i < dates.length; i++){
    var id = dates[i].id;
    
    var now = new Date().getTime();
    var date = new Date(now + ( 30 * (i+1)  * 1000) );
    //var date = dates[i].date;
    var text = dates[i].title;
    var data = { url : "/tab/calendar/"+id };
    CalendarNotification.addNotification(id, text, date, data);
  }
  
  $scope.$on('$cordovaLocalNotification:click',
    function (event, notification, state) {
    
    if( typeof notification.data !== 'null' ){
      var data = JSON.parse( notification.data );
      //Callback function here, but in the future...
      $location.path(data.url);
    }else
      console.log('Notificacion no ejecutada.');
    
  });
  
})

.controller('CalendarCtrl', function($scope, $location, CalendarData) {
  
  var vm = this;
  vm.calendarView = 'month';
  vm.viewDate = CalendarData.firstDate();
  vm.events = CalendarData.get();
  
  vm.eventClicked = function(date) {
    $location.path("/tab/calendar/"+date.id); ;
  };

})

.controller('CalendarDetail', function($scope, $stateParams, User, moment) {
  var objDate = User.getDate($stateParams.calendarId);
  objDate.textDate = moment(objDate.date).format("dddd[,] D MMMM [de] YYYY h:mm A");
  $scope.date = objDate;
})

.controller('SettingCtrl', function($scope, User, BusinessEmail, BusinessPhone) {
  $scope.user = User.info();
  $scope.totalDates = User.totalDates();
  $scope.phone = BusinessPhone;
  $scope.email = BusinessEmail;
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
