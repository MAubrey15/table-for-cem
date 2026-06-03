$(document).ready(function() {
	function applyFilters() {
		const specialFilter = $('#filterspecial').val().trim().toLowerCase();
		const languageFilter = $('#filterlanguage').val().trim().toLowerCase();

		// Show all cards initially to reset visibility
		$('.operation-card').show();

		// Filter based on special and language filters
		$('.operation-card').each(function() {
			const specialData = $(this).data('special').toLowerCase();
			const languageData = $(this).data('language').toLowerCase();

			// Split by comma to handle multiple values in data attributes
			const categories = specialData.split(',').map(cat => cat.trim());
			const languages = languageData.split(',').map(loc => loc.trim());

			// Check if filter matches any of the values
			const specialMatch = specialFilter === '' || categories.some(cat => cat === specialFilter);
			const languageMatch = languageFilter === '' || languages.some(loc => loc === languageFilter);

			// Check if the card matches the filters
			if (!(specialMatch && languageMatch)) {
				$(this).hide();
			}
		});
	}

	// Apply filters on dropdown change
	$('#filterspecial, #filterlanguage').on('change', function() {
		applyFilters();
	});

	// Reset filters button
	$('#resetFilters').click(function() {
		$('#filterspecial').val('');
		$('#filterlanguage').val('');
		applyFilters();
	});

	// Initial application of filters on page load
	applyFilters();
});
