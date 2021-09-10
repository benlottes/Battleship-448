document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	console.log("Canvas and Context Loaded");

	let count = 0;

	// iterate through each cell in gridLeft by row and number them
    $(".gridLeft .cell").each(function(){
        $(this).attr("id", count);
        count++;

		$(this).click(function(){
			console.log($(this).attr("id"))
		});
	});

	count = 0;
	// iterate through each cell in gridRight by row and number them
	$(".gridRight .cell").each(function(){
        $(this).attr("id", count);
        count++;

		$(this).click(function(){
			console.log($(this).attr("id"))
		});
	});

	// ask user for number of ships to be played with
	let shipCount = window.prompt("How many ships do you want to play with? (minimum: 1 | maximum: 6"); // need to add checks to make sure an integer between 1 and 6 is passed in
})