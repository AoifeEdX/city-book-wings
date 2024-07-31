// Create an array of city objects with city names and corresponding airport codes
var cities = [
	{ name: "Berlin, Germany", code: "BER" },
	{ name: "Chennai (Madras), India", code: "MAA" },
	{ name: "Dublin, Ireland", code: "DUB" },
	{ name: "London, United Kingdom", code: "LHR" },
	{ name: "Los Angeles, USA, California", code: "LAX" },
	{ name: "Paris, France", code: "CDG" },
	{ name: "Rome, Italy", code: "FCO" },
	{ name: "Shanghai, China", code: "PVG" },
	{ name: "Stockholm, Sweden", code: "ARN" },
	{ name: "Tokyo, Japan", code: "HND" },
];

// Function to populate dropdown
function populateDropdown(selectId, defaultOptionIndex) {
	var selectElement = document.getElementById(selectId);

	cities.forEach(function (city, index) {
		var option = document.createElement("option");
		option.value = city.code;
		option.text = city.name;
		selectElement.add(option);

		if (index === defaultOptionIndex) {
			option.selected = true;
		}
	});
}

// Populate the "From" dropdown
populateDropdown("locationFrom", 3);

// Populate the "To" dropdown 
populateDropdown("locationTo", 5);
