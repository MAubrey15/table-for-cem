$(document).ready(function() {

	const gradeOrder = ["JK", "SK", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

	// Helper function to parse grade ranges and check if selected grade is in range
	function gradeInRange(selectedGrade, rangeText) {
		if (!rangeText || selectedGrade === '') return true; // If no grade data or no selection, include card

		// Clean text like "JK-Grade 12" → "JK-12"
		rangeText = rangeText.replace(/Grade/g, "").replace(/\s/g, "");

		// Split by dash to get start and end
		let parts = rangeText.split("-");
		let start = parts[0];
		let end = parts[1] || parts[0]; // If only one grade, use it as both start and end

		const selectedIndex = gradeOrder.indexOf(selectedGrade);
		const startIndex = gradeOrder.indexOf(start);
		const endIndex = gradeOrder.indexOf(end);

		// If any grade is invalid, don't filter
		if (selectedIndex === -1 || startIndex === -1 || endIndex === -1) {
			return true;
		}

		return selectedIndex >= startIndex && selectedIndex <= endIndex;
	}

	function applyFilters() {
		const languageFilter = $('#filterLanguage').val().trim().toLowerCase();
		const specialFilter = $('#filterSpecial').val().trim().toLowerCase();
		const searchTerm = $('#searchOperations').val().trim().toLowerCase();
		const gradeFilter = $('#filterGrade').val();

		// Show all cards initially to reset visibility
		$('.operation-card').show();

		// Filter based on all criteria
		$('.operation-card').each(function() {
			const languageData = $(this).data('language') ? $(this).data('language').toLowerCase() : '';
			const specialData = $(this).data('special') ? $(this).data('special').toLowerCase() : '';
			const gradeData = $(this).data('grades');
			
			const cardText = $(this).text().toLowerCase();

			const languages = languageData.split(',').map(lang => lang.trim());
			const specials = specialData.split(',').map(spec => spec.trim());

			const languageMatch = languageFilter === '' || languages.some(lang => lang === languageFilter);
			const specialMatch = specialFilter === '' || specials.some(spec => spec === specialFilter);
			const searchMatch = searchTerm === '' || cardText.includes(searchTerm);
			const gradeMatch = gradeInRange(gradeFilter, gradeData);

			if (!(languageMatch && specialMatch && searchMatch && gradeMatch)) {
				$(this).hide();
			}
		});
	}

	// Apply filters on dropdown change
	$('#filterLanguage, #filterSpecial, #filterGrade').on('change', function() {
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
		$('#filterGrade').val('');
		$('#searchOperations').val('');
		applyFilters();
	});

	// Initial application of filters on page load
	applyFilters();
});
