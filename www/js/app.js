// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.constants', 'starter.values', 'starter.controllers', 'starter.services', 'mwl.calendar', 'firebase', 'ngCordova' ])

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
    
    if(device.platform === "iOS") {
      window.plugin.notification.local.promptForPermission();
    }
    
    // if none of the above states are matched, use this as the fallback
    if(Login.isLogged())
      $location.path('/tab/home');
    else
      $location.path('/tab/login');
   
  });
})

.config(function($stateProvider, $ionicConfigProvider, calendarConfig) {

  //Translate
  $ionicConfigProvider.backButton.text('Atrás');
  
  //Moment Config
  moment.locale('es', {weekdays: 'Dom_Lun_Mar_Mie_Jue_Vie_Sab'.split('_')});
  
  //Calendar Config
  calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
  calendarConfig.allDateFormats.moment.date.time = "hh:mm A";
  var originali18n = angular.copy(calendarConfig.i18nStrings);
  
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
          controller: 'CalendarCtrl as vm'
        }
      }
    })
    .state('tab.calendar-detail', {
        url: '/calendar/:calendarId',
        views: {
          'tab-calendar': {
            templateUrl: 'templates/calendar-detail.html',
            controller: 'CalendarDetail'
          }
        }
      })

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
