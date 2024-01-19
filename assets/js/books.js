// Search books when "Search" button is clicked...
function getbooks() {
	var bookResultsContainer = document.getElementById("bookResults");

	// Clear previous results
	bookResultsContainer.innerHTML = "";

	// Fetch data
	fetch("http://openlibrary.org/search.json?q=" + document.getElementById("locationTo").value)
		.then(function (a) {
			return a.json();
		})
		.then(function (response) {

			// Use slice to get the first 8 books
			var books = response.docs.slice(0, 8);

			// Build and display the cards in one row
			var rowDiv = document.createElement("div");
			rowDiv.className = "row";

			books.forEach(function (book, index) {
				var title = book.title || "Unknown Title";
				var author = book.author_name && book.author_name[0] || "Unknown Author";
				var isbn = book.isbn && book.isbn[0] || "No ISBN";

				// Check if the book has cover images
				if (book.cover_i) {
					// Use Open Library's cover image
					var coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
				} else {
					// Use Picsum placeholder image
					var placeholderImageUrl = `https://picsum.photos/200/300?seed=${index}`;
					var coverImageUrl = placeholderImageUrl; // Use Picsum if no Open Library cover
				}

				var cardHtml =
					'<div class="col-md-3 mb-3">' +
					'<div class="card">' +
					`<img src="${coverImageUrl}" class="card-img-top" alt="Book Cover">` +
					'<div class="card-body">' +
					'<h5 class="card-title">' + title + '</h5>' +
					'<p class="card-text">Author: ' + author + '</p>' +
					`<a href="https://openlibrary.org/isbn/${isbn}" target="_blank" class="btn btn-primary">Read</a>` +
					'</div>' +
					'</div>' +
					'</div>';

				rowDiv.innerHTML += cardHtml;
			});

			bookResultsContainer.appendChild(rowDiv);
		})
		.catch(function (error) {
			console.error("Error fetching data:", error);
			bookResultsContainer.innerHTML = '<p class="fs-4 my-3 text-danger">Error loading data. Check console for details.</p>';
		});
}