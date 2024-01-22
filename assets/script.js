// script.js

const apiKey = "ccc9ddd496msh4060d25d12d754cp12e4a2jsn9b1f6f242732";
const apiUrl = "https://booking-com13.p.rapidapi.com/flights/return?";

const citySearch = async () => {
    const flightOrigin = document.getElementById("flightOrigin").value;
    const flightDestination =
        document.getElementById("flightDestination").value;
    const departureDate = document.getElementById("departureDate").value;
    const returnDate = document.getElementById("returnDate").value;

    const url = `${apiUrl}location_from=${flightOrigin}&location_to=${flightDestination}&departure_date=${departureDate}&return_date=${returnDate}&page=1&country_flag=us`;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "ccc9ddd496msh4060d25d12d754cp12e4a2jsn9b1f6f242732",
            "X-RapidAPI-Host": "booking-com13.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        // Log delineated results to the console
        console.log("-------- API Results Start --------");
        console.log(result);
        console.log("-------- API Results End ----------");
    } catch (error) {
        console.error(error);
    }
};

// Function to display results
const displayResults = (results) => {
    // Get the result container element
    const resultsContainer = document.getElementById("searchResults");

    // Update the content with the fetched results
    resultsContainer.innerHTML = results;
};

//Books

// function getBooks() {
//     const queryURL = `http://openlibrary.org/search.json?subject=${flightDestination}`;

//     // Parse in city under 'subject' parameter
//     fetch(queryURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// }
// getBooks();

// const authorName = "";
// const pageCount = "";
// const publicationYear = "";

//using for loop, create array to store first few book results
//create 4 placeholder slots in cards for books in html file
//return index 0,1,2,3
//target: author_name (sometimes an array)
//first_publish_year
//number_of_pages_median
//subject (an array)

// for (let data = 0; data < 20; data++) {
//   const element = array[data];
// }
