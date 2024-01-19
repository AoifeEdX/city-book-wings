function getbooks() {
  //const queryURL = `http://openlibrary.org/search.json?q=london`

  const queryURL = `http://openlibrary.org/subjects/london.json?q=london`;
  // /subjects/love.json
// parse in city under 'subject' parameter
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
//bookSubject()

// bookSubject()
//a form input that allows the user to input a subject(city)
//when button is clicked
// onclick="getbooks()"

//using for loop, create array to store first few book results
//create 4 placeholder slots in cards for books in html file