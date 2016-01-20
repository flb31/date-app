angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, User, Login) {
  $scope.user = User.info();
  $scope.logout = function(){
    Login.logout();
  }
})

.controller('CalendarCtrl', function($scope, $location, CalendarData) {
  
  var vm = this;
  vm.calendarView = 'month';
  vm.viewDate = CalendarData.firstDate();
  vm.events = CalendarData.get();
  vm.dateClicked = function(){
    alert("Ahora es mi click");
  }
  
  vm.eventClicked = function(date) {
    $location.path("/tab/calendar/"+date.id); ;
  };

})

.controller('CalendarDetail', function($scope, $stateParams, User, moment) {
  var objDate = User.getDate($stateParams.calendarId);
  objDate.date = moment(objDate.date).format("dddd[,] D MMMM [de] YYYY h:mm A");
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
