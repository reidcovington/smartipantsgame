$(document).ready(function() {
	$('#open-instructions').on("click", function(e) {
		e.preventDefault();
		$('#instructions-pane').show();
	})

	$('#close-instructions').on("click", function(e) {
		e.preventDefault();
		$('#instructions-pane').hide();
	})
});