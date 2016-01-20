var data = new Array();
data["1128053244"] =
  {
    "id" : "1128053244",
    "name" : "Fabian Luna",
    "email" : "flb031@gmail.com",
    "phone" : "(+57)30100000",
    "dates" : [
      {
        "id" : "50",
        "date" : "2016-01-20T17:35:00-0500",
        "title" : "Examen de los ojos",
        "doctor" : "Fulanito de tal",
        "office" : "20"
      },
      {
        "id" : "100",
        "date" : "2016-02-25T15:30:00-0500",
        "title" : "Examen Fisico",
        "doctor" : "Fulanito de tal",
        "office" : "204"
      }
    ]
  };

data["123456"] =
  {
    "id" : "123456",
    "name" : "Pepito Perez",
    "email" : "pepito@gmail.com",
    "phone" : "44444444",
    "dates" : [
      {
        "id" : "35",
        "date" : "2016-02-20T12:00:00-0500",
        "title" : "Examen de los ojos",
        "doctor" : "Juanita de tal",
        "office" : "33"
      },
      {
        "id" : "36",
        "date" : "2016-03-01T12:00:00-0500",
        "title" : "Examen de los ojos 2",
        "doctor" : "Juanita de tal",
        "office" : "33"
      }
    ]
  };

data["1212"] =
  {
    "id" : "1212",
    "name" : "Andrea J",
    "email" : "andrea@gmail.com",
    "phone" : "555",
    "dates" : [

    ]
  };

angular.module('starter.values', [])
.value('UserData', data)
.value('TitleApp', 'Citas Base Naval')
.value('BusinessEmail', 'correo@armada.mil.co')
.value('BusinessPhone', '+57-5-1234567');