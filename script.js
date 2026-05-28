$(document).ready(function() {
	function applyFilters() {
		const categoryFilter = $('#filterCategory').val().trim().toLowerCase();
		const locationFilter = $('#filterLocation').val().trim().toLowerCase();

		// Show all rows initially to reset visibility
		$('#myTable5 tbody tr').show();

		// Filter based on category and location filters
		$('#myTable5 tbody tr').each(function() {
			const category = $(this).data('category').toLowerCase();
			const location = $(this).data('location').toLowerCase();

			const categoryMatch = categoryFilter === '' || category.includes(categoryFilter);
			const locationMatch = locationFilter === '' || location.includes(locationFilter);

			// Check if the row matches the filters
			if (!(categoryMatch && locationMatch)) {
				$(this).hide();
			}
		});
	}

	// Event listener for form submission
	$('#filterForm').submit(function(e) {
		e.preventDefault();
		applyFilters();
	});

	// Reset filters button
	$('#resetFilters').click(function() {
		$('#filterCategory').val('');
		$('#filterLocation').val('');
		applyFilters();
	});

	// Sorting by Location
	$('#sortLocation').click(function() {
		const rows = $('#myTable5 tbody tr').get();

		rows.sort(function(rowA, rowB) {
			const locationA = $(rowA).find('td[data-label="Location"]').text().trim().toLowerCase();
			const locationB = $(rowB).find('td[data-label="Location"]').text().trim().toLowerCase();

			return locationA.localeCompare(locationB);
		});

		$('#myTable5 tbody').empty().append(rows);
	});

	// Sorting by Category
	$('#sortCategory').click(function() {
		const rows = $('#myTable5 tbody tr').get();

		rows.sort(function(rowA, rowB) {
			const categoryA = $(rowA).find('td[data-label="Category"]').text().trim().toLowerCase();
			const categoryB = $(rowB).find('td[data-label="Category"]').text().trim().toLowerCase();

			return categoryA.localeCompare(categoryB);
		});

		$('#myTable5 tbody').empty().append(rows);
	});

	// Initial application of filters on page load
	applyFilters();
});
