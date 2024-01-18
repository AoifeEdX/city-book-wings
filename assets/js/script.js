// Add an event listener to the form for the 'submit' event
document.getElementById('flightSearchForm').addEventListener('submit', function (event) {
	event.preventDefault(); // Prevent the default form submission behavior

	// Read user inputs from the form
	var locationFrom = document.getElementById('locationFrom').value;
	var locationTo = document.getElementById('locationTo').value;
	var departureDate = document.getElementById('departureDate').value;

	// Log user entries to the console
	console.log('---- Flight search input: ----');
	console.log('From:', locationFrom);
	console.log('To:', locationTo);
	console.log('Date:', departureDate);
	console.log('---- Getting results (please wait...): ----');

	// Fetch exchange rate data
	//? API documentation: https://www.exchangerate-api.com/docs/pair-conversion-requests
	var exchangeRateAPIKey = 'a4e7dfed1a6162f81c023788';
	var exchangeRateURL = 'https://v6.exchangerate-api.com/v6/' + exchangeRateAPIKey + '/pair/USD/GBP';

	fetch(exchangeRateURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (exchangeRateData) {
			var exchangeRate = exchangeRateData.conversion_rate;

			//? API documentation: https://rapidapi.com/ntd119/api/booking-com13
			//? This next snippet of code is from the API site:
			const url = 'https://booking-com13.p.rapidapi.com/flights/one-way?location_from=' + encodeURIComponent(locationFrom) + '&location_to=' + encodeURIComponent(locationTo) + '&departure_date=' + departureDate + '&page=1&number_of_stops=NonstopFlights';

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': 'ccc9ddd496msh4060d25d12d754cp12e4a2jsn9b1f6f242732',
					'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
				}
			};

			// Fetch data from the flight API using the constructed URL and options
			fetch(url, options)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);
					updateSearchResults(data, exchangeRate);
				})
				.catch(function (error) {
					console.error(error);
				});
		})
		.catch(function (error) {
			console.error(error);
		});
});

// Function to update the search results on the webpage
function updateSearchResults(results, exchangeRate) {
	var resultsContainer = document.getElementById('searchResults'); // Get the container where results will be displayed

	if (results.status && results.data && results.data.flights) {
		var flights = results.data.flights.slice(0, 6); // Extract the first six flight results

		if (flights.length > 0) {
			// Sort the flights based on the price in ascending order
			flights.sort(function (a, b) {
				var priceA = a.travelerPrices[0].price.price.value;
				var priceB = b.travelerPrices[0].price.price.value;
				return priceA - priceB;
			});

			var resultList = document.createElement('div'); // Create a container for result cards
			resultList.className = 'row'; // Apply Bootstrap row class

			// Loop through each flight result and create a Bootstrap card for display
			flights.forEach(function (flight) {
				// Extract relevant information from the flight data
				var flightName = flight.bounds[0].segments[0].flightNumber;
				var airline = flight.bounds[0].segments[0].operatingCarrier.name;
				var airportFrom = flight.bounds[0].segments[0].origin.cityName;
				var airportTo = flight.bounds[0].segments[0].destination.cityName;
				var departureTime = new Date(flight.bounds[0].segments[0].departuredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
				var arrivalTime = new Date(flight.bounds[0].segments[0].arrivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

				var price = flight.travelerPrices[0].price.price.value;

				// Convert the price to a string
				var priceString = price.toString();

				// Insert a decimal point before the last two digits
				var modifiedPriceString = priceString.slice(0, -2) + '.' + priceString.slice(-2);

				// Convert the modified string back to a numeric format if needed
				var modifiedPrice = parseFloat(modifiedPriceString);

				// Now 'modifiedPrice' contains the value with a decimal point before the last two digits

				// Convert the price to GBP using the exchange rate
				var priceInGBP = (modifiedPrice * exchangeRate).toFixed(2);

				// Create a Bootstrap card for each flight result
				var card = document.createElement('div');
				card.className = 'card col-md-4'; // Apply Bootstrap card and column classes
				card.innerHTML =
					'<div class="card-body">' +
					'<h5 class="card-title">' + airline + ' - ' + flightName + '</h5>' +
					'<p class="card-text">From: ' + airportFrom + '<br>To: ' + airportTo + '<br>Departure Time: ' + departureTime + '<br>Arrival Time: ' + arrivalTime + '<br>Price: £' + priceInGBP + '</p>' +
					'<a href="#" class="btn btn-primary">Book Flight</a>' +
					'</div>';

				resultList.appendChild(card); // Append the card to the result container
			});

			resultsContainer.innerHTML = ''; // Clear previous results in the container
			resultsContainer.appendChild(resultList); // Append the new results to the container
		} else {
			resultsContainer.innerHTML = '<p>No flights found.</p>'; // Display a message if no flights are found
		}
	} else {
		resultsContainer.innerHTML = '<p>Error in fetching results.</p>'; // Display an error message if the API response is unexpected
	}
}
