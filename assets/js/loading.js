// Show loading icon when "Search" button is clicked...

// Function to show the loading spinner for a specified duration
function loadingIcon() {
	var loading = document.getElementById("loading");
	
	// Display the loading spinner
	loading.classList.remove("d-none");

	// Hide the loading spinner after 5 seconds (5000 milliseconds)
	setTimeout(function () {
			loading.classList.add("d-none");
	}, 8000);
}
