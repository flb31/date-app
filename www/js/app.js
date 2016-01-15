// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.constants', 'starter.values', 'starter.controllers', 'starter.services', 'mwl.calendar', 'firebase' ])

.run(function($ionicPlatform, $location, Login) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    // if none of the above states are matched, use this as the fallback
    if(Login.isLogged())
      $location.path('/tab/home');
    else
      $location.path('/tab/login');
   
  });
})

.config(function($stateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })
  
  // Each tab has its own nav history stack:
  
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'templates/tab-calendar.html',
          controller: 'CalendarCtrl'
        }
      }
    })
   /* .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/

  .state('tab.setting', {
    url: '/setting',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  });

});
