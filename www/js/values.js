var data = new Array();
data["123456"] =
  {
    "id" : "123456",
    "name" : "Pedro Perez",
    "email" : "pedro@gmail.com",
    "phone" : "(+57)1234567",
    "dates" : [
      {
        "id" : "50",
        "date" : "2016-01-20T17:35:00-0500",
        "title" : "Examen de la vista",
        "doctor" : "Alberto Sierra",
        "office" : "200"
      },
      {
        "id" : "100",
        "date" : "2016-02-25T15:30:00-0500",
        "title" : "Examen Fisico",
        "doctor" : "Juan Carlos Barrios",
        "office" : "204"
      }
    ]
  };

data["9876"] =
  {
    "id" : "9876",
    "name" : "Andres Salamanca",
    "email" : "andres@gmail.com",
    "phone" : "44444444",
    "dates" : [
      {
        "id" : "35",
        "date" : "2016-02-20T12:00:00-0500",
        "title" : "Analisis de sangre",
        "doctor" : "Tatiana Bustamante",
        "office" : "333"
      },
      {
        "id" : "36",
        "date" : "2016-03-01T12:00:00-0500",
        "title" : "Analisis de Sangre (2)",
        "doctor" : "Tatiana Bustamante",
        "office" : "333"
      }
    ]
  };

data["1122"] =
  {
    "id" : "1122",
    "name" : "Andrea Jimenez",
    "email" : "andrea@gmail.com",
    "phone" : "5555555",
    "dates" : [

    ]
  };

angular.module('starter.values', [])
.value('UserData', data)
.value('TitleApp', 'Citas Base Naval')
.value('BusinessEmail', 'correo@armada.mil.co')
.value('BusinessPhone', '+57-5-1234567');