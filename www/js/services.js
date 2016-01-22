angular.module('starter.services', [])

.factory('Login', function($ionicLoading, $ionicPopup, $interval, $location, $window, TIMEOUT, WebServices, UserData){
  
  var setID = function(user_id){
    localStorage.setItem("user_id", user_id);
  }
  var loadUser = function(user_id){
    //WebServices.getUser(user_id);
    var callback = arguments[1];
    
    
    $ionicLoading.show({ template: 'Buscando...'});
    var stop = $interval(function(i){
      if(UserData[user_id].id){
        $ionicLoading.hide();
        $interval.cancel(stop);
        setID(UserData[user_id].id);
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
      if(UserData == null) loadUser( getID() );
      return UserData[getID()];
    },
    
    isLogged : function(){
      return ( localStorage.getItem("user_id") != null);
    },
    
    logout : function(){
      $ionicPopup.confirm({
         title: 'Salir',
         template: 'Desea salir ahora?',
          buttons: [
          { text: 'No' },
          {
            text: 'Si',
            type: 'button-positive',
            onTap: function(res) {
              if(res) {
                  localStorage.clear();
                  //userData = null;
                  $location.path('/tab/login');
               }
            }
          }
        ]
       });
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

.factory('User', function(Login, Calendar){
  
  return {
    info: function(){
      return Login.getUser();
    },
    dates: function(){
      return Login.getUser().dates;
    },
    
    getDate: function(date_id){
      var dates = Login.getUser().dates;
      for (var i = 0; i < dates.length; i++) {
        if (dates[i].id == date_id) {
          return dates[i];
        }
      }
      return null;
    },
    
    totalDates: function(){
      var dates = Login.getUser().dates;
      var total = 0;
      for ( var i = 0; i < dates.length; i++)
        if ( !Calendar.isExpired( new Date(dates[i].date) ) )
          total++;
      return total;
    }
    
  };
})

.factory('CalendarData', function(User, Calendar){
  var dataEvents = new Array();
  var dates = User.dates();
  if(dates){
    var current = new Date();
    for(var k in dates ){
      var item = dates[k];
      var id = item.id;
      var date = new Date(item.date);
      console.log(date + " "+item.date);
      var type = ( current > date )? 'important' : 'success';
      var title = item.title + " , Médico: " + item.doctor;
      var dateM = moment(date);

      dataEvents.push ( 
                {
                  id : id,
                  title : title,
                  startsAt : dateM._d,
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
    console.log(dataEvents);
  }
  
  return {
    get: function(){
      return dataEvents;
    },
    firstDate: function(){
      var current = new Date();
      var first_date;
      for(var i = 0; i < dataEvents.length; i++){
        var d_index = dataEvents[i].startsAt;
        if( !Calendar.isExpired(d_index) ){
          if( !first_date || first_date.getTime() > d_index.getTime() )
            first_date = d_index;  
        }
      }
      return (typeof first_date == 'undefined') ? current : first_date;
    }
  }
  
})

.factory('Calendar', function(){
  return {
    isExpired : function(date){
      var now = new Date();
      return (date.getTime() < now.getTime() ) ? true : false;
    }
  }
})

.factory('CalendarNotification', function($cordovaLocalNotification, $location, TitleApp){
  
  return {
    addNotification : function(id, text, date){
      if(window.plugin && window.plugin.notification) { 
      
        var data = (typeof arguments[3] === 'object') ? arguments[3] : null;

        //Create two dates (1 before week and 1 day before and 6am date's day )
        $cordovaLocalNotification.schedule({
          id: id,
          title: TitleApp,
          text: text,
          date: date,
          data: data
        }).then(function () {
          //Ok
        });
      }
    }
  }
  
});
