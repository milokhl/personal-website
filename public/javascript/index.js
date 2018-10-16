/**
 * @brief Increment the number of visits to the browser's current URL.
 */
function LogVisit() {
	var thisUrl = window.location.pathname;

	// Default to 'homepage' when the blank URL is loaded.
	if (thisUrl == '/') {
		thisUrl = '/homepage';
	}

	const refPath = "https://personal-website-1c1a9.firebaseio.com/visits" + thisUrl;
	var thisUrlRef = new Firebase(refPath);

	// Use a transaction to ensure that increments are protected.
  thisUrlRef.transaction(function(data) {
  	if (data) {
  		data.count++;
  	} else {
  		data = {"count": 1};
  	}
  	return data;
  });
}

// Increment the visit count for the current page.
LogVisit();
