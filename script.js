$(document).ready(function() {
	function applyFilters() {
		const categoryFilter = $('#filterCategory').val().trim().toLowerCase();
		const locationFilter = $('#filterLocation').val().trim().toLowerCase();

		// Show all cards initially to reset visibility
		$('.operation-card').show();

		// Filter based on category and location filters
		$('.operation-card').each(function() {
			const category = $(this).data('category').toLowerCase();
			const location = $(this).data('location').toLowerCase();

			const categoryMatch = categoryFilter === '' || category.includes(categoryFilter);
			const locationMatch = locationFilter === '' || location.includes(locationFilter);

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
