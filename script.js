//create var for cities
//make global so it can be used in other .js files
//make sure each one matches the city name verbatim as configured in the API.
var cities = [
  "London, United Kingdom",
  "Berlin, Germany",
  "Dublin, Ireland",
  "Madrid, Spain",
  "Beijing, China",
  "Mumbai, India",
];
function getbooks() {
  //const queryURL = `http://openlibrary.org/search.json?q=london`
  const queryURL = `http://openlibrary.org/subjects/london.json?q=london`;
  // /subjects/love.json
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getbooks();
function bookSubject() {
  var flightdestination = document.getElementById("citysearch").value;
  alert(flightdestination);
}
//target cities el in html
var destCityName = document.querySelectorAll(".cities");
console.log(destCityName);
destCityName.forEach((list) => {
  for (var i = 0; i < cities.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = cities[i];
    opt.value = cities[i];
    list.appendChild(opt);
  }
});
//loop through cities array
bookSubject();