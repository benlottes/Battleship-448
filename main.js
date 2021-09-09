document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	console.log("Canvas and Context Loaded");

	let count = 0;

	/*iterate through each cell in gridLeft by row and number them*/
    $(".gridLeft .cell").each(function(){
        $(this).attr("id", count);
        count++;

		$(this).click(function(){
			console.log($(this).attr("id"))
		});
	});
	count = 0;
	/*iterate through each cell in gridRight by row and number them*/
	$(".gridRight .cell").each(function(){
        $(this).attr("id", count);
        count++;

		$(this).click(function(){
			console.log($(this).attr("id"))
		});
	});
})