$(document).ready(function() {
	$('#open-instructions').on("click", function(e) {
		e.preventDefault();
		$('#instructions-pane').show();
	})

	$('#close-instructions').on("click", function(e) {
		e.preventDefault();
		$('#instructions-pane').hide();
	})

	$('#show-example').on("click", function(e) {
		e.preventDefault();
		playExample();
	})

	$('#reset-instructions').on("click", function(e) {
		e.preventDefault();
		$('#example').empty();
		$('#instructions-body p').show();

		$('#reset-instructions').hide()
		$('#instructions-title').text("How to Play")
		$('#show-example').show()
	})
});


var playExample = function(target) {

	$('#show-example').hide();
	$('#reset-instructions').show();
	$('#instructions-title').text("Rollover tiles for info...")

	exampleTarget = $( "#example" )
	
	$( "#instructions-body p" ).hide()
	
	ex1 = $('#ex-1')
	ex2 = $('#ex-2')
	ex3 = $('#ex-3')

	$( "<td id='ex-1' class='btn' style='display: none; height:10em; width: 10em; background-color: blue; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$("#ex-1").popover({trigger: 'hover', title: 'Round 1', content: "This is the first square so you don't need to do anything", placement: 'left'});
	$("#ex-1").popover('show');

	$( "<td id='ex-2' class='btn' style='display: none; height:10em; width: 10em; background-color: red; margin-right: .5em'></td>" ).appendTo(exampleTarget)
	$("#ex-2").popover({trigger: 'hover', title: 'Round 2', content: "This is the second and you still don't need to do anything", placement: 'bottom'});

	$( "<td id='ex-3' class='btn' style='display: none; height:10em; width: 10em; background-color: blue;'></td>" ).appendTo(exampleTarget)
	$("#ex-3").popover({trigger: 'hover', title: 'Round 3', content: "This is a 2-back color match!", placement: 'bottom'});

	$('#ex-1').fadeIn();

	setTimeout(function() {
		$('#ex-2').fadeIn()
	}, 1000);

	setTimeout(function() {
		$('#ex-3').fadeIn()
	}, 2000);
}