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
	exampleTarget = $( '#instructions-body' )
	exampleTarget.empty();
 
	$( "<td id='ex-1' class='btn' style='height:10em; width: 10em; background-color: blue; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$( "<td id='ex-2' class='btn' style='height:10em; width: 10em; background-color: red; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$( "<td id='ex-3' class='btn' style='height:10em; width: 10em; background-color: blue;'></td>" ).appendTo(exampleTarget)
}