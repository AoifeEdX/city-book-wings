//function getbooks() {
// const queryURL = `http://openlibrary.org/search.json?q=london`;

function bookSubject() {
var flightdestination = document.getElementById("citySearch").value;
//const queryURL = `https://openlibrary.org/subjects?q=${flightdestination}&format=json`;
const queryURL = `http://openlibrary.org/subjects/${flightdestination}.json?`;
alert(flightdestination);
fetch(queryURL)
  .then(function (response) {
  //  console.log(response)
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

}
bookSubject();



//const queryURL = `http://openlibrary.org/subjects/search.json?q=${flightdestination}`;
// /subjects/love.json


//}
//getbooks();

//a form input that allows the user to input a subject(city)
//when button is clicked
// onclick="getbooks()"

//add api key

//const APIKey = "gu28zkekvzsey8np79k9kxm6";
//const queryURL = `https://api.tugo.com/v1/travelsafe/country=&appid=${APIKey}`;

//const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIKey}`;

// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
