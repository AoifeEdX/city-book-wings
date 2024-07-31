async function getFlights() {
	// Clear previous search results
	var flightResults = document.getElementById("flightResults");
	flightResults.innerHTML = "";

	// Read user inputs from the form
	var locationFrom = document.getElementById("locationFrom").value;
	var locationTo = document.getElementById("locationTo").value;
	var departureDate = document.getElementById("departureDate").value;

	// Fetch exchange rate data
	var exchangeRateAPIKey = "a4e7dfed1a6162f81c023788";
	var exchangeRateURL =
		"https://v6.exchangerate-api.com/v6/" +
		exchangeRateAPIKey +
		"/pair/USD/GBP";

	try {
		let exchangeRateResponse = await fetch(exchangeRateURL);
		let exchangeRateData = await exchangeRateResponse.json();
		var exchangeRate = exchangeRateData.conversion_rate;

		const url = "https://booking-com18.p.rapidapi.com/flights/search-oneway?fromId=" +
			encodeURIComponent(locationFrom) +
			"&toId=" +
			encodeURIComponent(locationTo) +
			"&departureDate=" +
			departureDate +
			"&cabinClass=ECONOMY&numberOfStops=nonstop_flights";

		const options = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': 'dd014921fcmsh17ab84c0ce0fae4p134d06jsn6210368d353d',
				'x-rapidapi-host': 'booking-com18.p.rapidapi.com'
			}
		};

		try {
			let response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			let data = await response.json();
			updateflightResults(data, exchangeRate);
		} catch (error) {
			console.error('Error fetching flight data:', error);
			flightResults.innerHTML =
				'<p class="fs-4 my-3 text-danger text-center">Error fetching flight data.</p>';
		}

	} catch (error) {
		console.error('Error fetching exchange rate data:', error);
		flightResults.innerHTML =
			'<p class="fs-4 my-3 text-danger text-center">Error fetching exchange rate data.</p>';
	}
}

// Function to update the search results on the webpage
function updateflightResults(results, exchangeRate) {
	var flightResults = document.getElementById("flightResults");
	var containerDiv = document.createElement("div");
	containerDiv.innerHTML =
		'<h2 class="my-5 py-5 text-center">Find flights to your travel destination...</h2>';

	if (results.status && results.data && results.data.flights) {
		var flights = results.data.flights.slice(0, 8);

		if (flights.length > 0) {
			flightResults.innerHTML = "";

			var rowDiv = document.createElement("div");
			rowDiv.className = "row";

			flights.sort(function (a, b) {
				var priceA = a.travelerPrices[0].price.price.value;
				var priceB = b.travelerPrices[0].price.price.value;
				return priceA - priceB;
			});

			flights.forEach(function (flight) {
				var flightName = flight.bounds[0].segments[0].flightNumber;
				var airline = flight.bounds[0].segments[0].operatingCarrier.name;
				var airportFrom = flight.bounds[0].segments[0].origin.name;
				var airportTo = flight.bounds[0].segments[0].destination.name;
				var departureTime = new Date(
					flight.bounds[0].segments[0].departuredAt
				).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
				var arrivalTime = new Date(
					flight.bounds[0].segments[0].arrivedAt
				).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

				var price = flight.travelerPrices[0].price.price.value;
				var priceString = price.toString();
				var modifiedPriceString =
					priceString.slice(0, -2) + "." + priceString.slice(-2);
				var modifiedPrice = parseFloat(modifiedPriceString);
				var priceInGBP = (modifiedPrice * exchangeRate).toFixed(2);
				var sharableURL = flight.shareableUrl;

				var cardHtml =
					'<div class="col-md-3 mb-3">' +
					'<div class="card h-100">' +
					'<div class="card-body d-flex flex-column">' +
					'<h5 class="card-title">' +
					airline +
					" - " +
					flightName +
					"</h5>" +
					'<p class="card-text"><strong>From:</strong> ' +
					airportFrom +
					"<br><strong>To:</strong> " +
					airportTo +
					"<br><strong>Departure Time:</strong> " +
					departureTime +
					"<br><strong>Arrival Time:</strong> " +
					arrivalTime +
					"<br><strong>Price:</strong> £" +
					priceInGBP +
					"</p>" +
					'<a href="' + sharableURL + '" class="btn button_slide slide_down mt-auto" target="_blank"><i class="fa fa-plane"></i> Book Flight</a>' +
					'<button class="btn button_slide slide_save mt-3" onclick="saveFlightToLocalStorage(\'' + flightName + '\', \'' + airline + '\', \'' + airportFrom + '\', \'' + airportTo + '\', \'' + departureTime + '\', \'' + arrivalTime + '\', \'' + priceInGBP + '\', \'' + sharableURL + '\')"><i class="fas fa-save"></i> Save</button>' + // Add the Save button
					"</div>" +
					"</div>" +
					"</div>";

				rowDiv.innerHTML += cardHtml;
			});

			containerDiv.appendChild(rowDiv);
			flightResults.appendChild(containerDiv);
		} else {
			flightResults.innerHTML =
				'<p class="fs-4 my-3 text-danger text-center">No flights found.</p>';
		}
		// If there is an error, show an error message on the webpage
	} else {
		flightResults.innerHTML =
			'<p class="fs-4 my-3 text-danger text-center">Error loading data.</p>';
	}
}

// Function to save flight information to local storage
function saveFlightToLocalStorage(flightName, airline, airportFrom, airportTo, departureTime, arrivalTime, price, sharableURL) {
	// Retrieve existing saved flights from local storage or initialize an empty array
	var savedFlights = JSON.parse(localStorage.getItem('savedFlights')) || [];

	// Add the new flight information to the array
	savedFlights.push({
		flightName: flightName,
		airline: airline,
		airportFrom: airportFrom,
		airportTo: airportTo,
		departureTime: departureTime,
		arrivalTime: arrivalTime,
		price: price,
		sharableURL: sharableURL
	});

	// Save the updated array back to local storage
	localStorage.setItem('savedFlights', JSON.stringify(savedFlights));
}
