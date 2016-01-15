angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, User) {
  $scope.user = User.info();
})

.controller('CalendarCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
 /* $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/

  $scope.calendarView = 'month';
  $scope.calendarDate = new Date();
  $scope.events = [
    {
      title: 'Mi evento de prueba', // The title of the event
      type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      startsAt: moment().startOf('day').add(7, 'hours').toDate(), // A javascript date object for when the event starts
      //endsAt: new Date(2016,1,10,11), // Optional - a javascript date object for when the event ends
      editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
      draggable: false, //Allow an event to be dragged and dropped
      resizable: false, //Allow an event to be resizable
      incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
      cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    }
  ];
  $scope.isCellOpen = true;

  $scope.eventClicked = function(event) {
    alert.show('Clicked', event);
  };

})
/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('SettingCtrl', function($scope) {
  
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
