$(document).ready(function() {
	function applyFilters() {
		const languageFilter = $('#filterLanguage').val().trim().toLowerCase();
		const specialFilter = $('#filterSpecial').val().trim().toLowerCase();
		const searchTerm = $('#searchOperations').val().trim().toLowerCase();

		// Show all cards initially to reset visibility
		$('.operation-card').show();

		// Filter based on language, special, and search term
		$('.operation-card').each(function() {
			const languageData = $(this).data('language') ? $(this).data('language').toLowerCase() : '';
			const specialData = $(this).data('special') ? $(this).data('special').toLowerCase() : '';
			
			// Get all text content from the card for full-text search
			const cardText = $(this).text().toLowerCase();

			// Split by comma to handle multiple values in data attributes
			const languages = languageData.split(',').map(lang => lang.trim());
			const specials = specialData.split(',').map(spec => spec.trim());

			// Check if language filter matches
			const languageMatch = languageFilter === '' || languages.some(lang => lang === languageFilter);
			
			// Check if special filter matches
			const specialMatch = specialFilter === '' || specials.some(spec => spec === specialFilter);
			
			// Check if search term matches any text in the card
			const searchMatch = searchTerm === '' || cardText.includes(searchTerm);

			// Check if the card matches all filters
			if (!(languageMatch && specialMatch && searchMatch)) {
				$(this).hide();
			}
		});
	}

	// Apply filters on dropdown change
	$('#filterLanguage, #filterSpecial').on('change', function() {
		applyFilters();
	});

	// Apply filters on search input
	$('#searchOperations').on('keyup', function() {
		applyFilters();
	});

	// Reset filters button
	$('#resetFilters').click(function() {
		$('#filterLanguage').val('');
		$('#filterSpecial').val('');
		$('#searchOperations').val('');
		applyFilters();
	});

	// Initial application of filters on page load
	applyFilters();
});
