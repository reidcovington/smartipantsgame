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


var playExample = function(target) {
	exampleTarget = $( "#example" )
	ex1 = $('#ex-1')
	ex2 = $('#ex-2')
	ex3 = $('#ex-3')

	$( "#instructions-body p" ).hide()
	$('#show-example').attr('disabled', true);

	$( "<td id='ex-1' class='btn' style='display: none; height:10em; width: 10em; background-color: blue; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$( "<td id='ex-2' class='btn' style='display: none; height:10em; width: 10em; background-color: red; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$( "<td id='ex-3' class='btn' style='display: none; height:10em; width: 10em; background-color: blue;'></td>" ).appendTo(exampleTarget)

	$('#ex-1').fadeIn();

	setTimeout(function() {
		$('#ex-2').fadeIn()
	}, 1000);

	setTimeout(function() {
		$('#ex-3').fadeIn()
	}, 2000);

}