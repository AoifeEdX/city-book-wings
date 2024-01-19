const cityName = document.getElementById("searchBook").value;

function getbooks() {
  const queryURL = `http://openlibrary.org/search.json?subject=${cityName}`

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


// bookSubject()
//a form input that allows the user to input a subject(city)
//when button is clicked
// onclick="getbooks()"

//using for loop, create array to store first few book results
//create 4 placeholder slots in cards for books in html file
//return index 0,1,2,3
// author_name (sometimes an array)
//first_publish_year
//number_of_pages_median
//subject (an array)

// for (let data = 0; data < 20; data++) {
//   const element = array[data];
// }