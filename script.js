$(document).ready(function() {
	function applyFilters() {
		const categoryFilter = $('#filterCategory').val().trim().toLowerCase();
		const locationFilter = $('#filterLocation').val().trim().toLowerCase();

		// Show all cards initially to reset visibility
		$('.operation-card').show();

		// Filter based on category and location filters
		$('.operation-card').each(function() {
			const categoryData = $(this).data('category').toLowerCase();
			const locationData = $(this).data('location').toLowerCase();

			// Split by comma to handle multiple values in data attributes
			const categories = categoryData.split(',').map(cat => cat.trim());
			const locations = locationData.split(',').map(loc => loc.trim());

			// Check if filter matches any of the values
			const categoryMatch = categoryFilter === '' || categories.some(cat => cat === categoryFilter);
			const locationMatch = locationFilter === '' || locations.some(loc => loc === locationFilter);

			// Check if the card matches the filters
			if (!(categoryMatch && locationMatch)) {
				$(this).hide();
			}
		});
	}

	// Apply filters on dropdown change
	$('#filterCategory, #filterLocation').on('change', function() {
		applyFilters();
	});

	// Reset filters button
	$('#resetFilters').click(function() {
		$('#filterCategory').val('');
		$('#filterLocation').val('');
		applyFilters();
	});

	// Initial application of filters on page load
	applyFilters();
});
