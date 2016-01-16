angular.module('starter.services', [])

.factory('Login', function($ionicLoading, $ionicPopup, $interval, $location, $window, TIMEOUT, WebServices, userData){
  
  var setID = function(user_id){
    localStorage.setItem("user_id", user_id);
  }
  var loadUser = function(user_id){
    
    var callback = arguments[1];
    userData = WebServices.getUser(user_id);
    $ionicLoading.show({ template: 'Buscando...'});
    var stop = $interval(function(i){
      if(userData.id){
        $ionicLoading.hide();
        $interval.cancel(stop);
        setID(userData.id);
        if(callback) callback();
      } else if(TIMEOUT < i){
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({ title: 'Mensaje', template: 'Usuario no encontrado.' });
        $interval.cancel(stop);
      } 
    }, 1000); 
  }
  var getID = function(){
    return localStorage.getItem("user_id");
  }
  
  return{
    getID: function(){
      return getID();
    },
    
    setID : function(user_id){
      setID(user_id);
    },
    
    loadUser: function(user_id, callback){
      loadUser(user_id, callback);
    },
    
    getUser: function(){
      if(userData == null) loadUser( getID() );
      return userData;
    },
    
    isLogged : function(){
      return ( localStorage.getItem("user_id") != null);
    },
    
    logout : function(){
      localStorage.clear();
      userData = null;
      $window.location.reload();
      $location.path('/tab/login');
    }
  }
})

.factory('WebServices', function($firebaseObject, URL_WEBSERVICES){
  return {
    getUser : function(user_id){
      var ref = new Firebase(URL_WEBSERVICES + user_id);
      var user = $firebaseObject(ref);
      return user;
    }
  }
})

.factory('User', function(Login, WebServices){
  
  return {
    info: function(){
      return Login.getUser();
    },
    dates: function(){
      return Login.getUser().dates;
    },
    
    totalDates: function(){
      return ( Login.getUser().dates )? Login.getUser().dates.length : 0;
    }
    
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
