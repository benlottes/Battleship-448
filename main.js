let currentTurn = 1;
let placeHead;
let placeTail;

//Need to block out screen and let them click for next turn and switch visible boats
function switchTurn(){
	if(currentTurn == 1){
		currentTurn = 2;
	}else{
		currentTurn = 1;
	}
}
//player clicks location, checkviabletails() is used to highlight options 
//tail is clicked, placeShip() to place it, then move on to next ship.
//function placeShips(board){
	//for(let i = 1; i <= board.shipArray.length(); i++){
		//placeHead = true;
		
//	}
//}

function playGame(shipCount){
	let p1Board = new board(shipCount);
	let p2Board = new board(shipCount);
	
	placeShips(p1Board);
	switchTurn();
	placeShips(p2Board);
	switchTurn();
	
	let cont = true;
	while(cont == true){
		//Take a shot, make sure its the right Array (put in attemptedShot)
		//track team somehow so the valid board changes
		//attemptedShot() if true move on, otherwise 
		//keep letting them shoot until they hit something valid
		//check isSunk(), and notify for miss, hit or sink
		//check allSunk() and if so winner
		//switchTurn()
	}
	
}

document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	console.log("Canvas and Context Loaded");

	let count = 0;
	let row = 0;
	let col = 0;
	// iterate through each cell in gridLeft by row and number them
    $(".gridLeft .cell").each(function(){
        $(this).attr("id", count);
        count++;
		if(col == 9){
			col = 0;
			row++;
		}
		$(this).attr("row", row);
		$(this).attr("col", col);
		col++;
		
		$(this).click(function(){
		//	if(placeHead != true && placeTail != true){
		//		//shoot
		//	}
		//	else if(placeHead == true){
				
		//	} else {
				
		//	}
			
			console.log($(this).attr("row"))
			console.log($(this).attr("col"))
		});
	});

	count = 0;
	row = 0;
	col = 0;
	// iterate through each cell in gridRight by row and number them
	$(".gridRight .cell").each(function(){
        $(this).attr("id", count);
        count++;
		if(col == 9){
			col = 0;
			row++;
		}
		$(this).attr("row", row);
		$(this).attr("col", col);
		col++;
		
		$(this).click(function(){
			console.log($(this).attr("row"))
			console.log($(this).attr("col"))
		});
	});

	// ask user for number of ships to be played with
	
	let shipCount = window.prompt("How many ships do you want to play with? (minimum: 1 | maximum: 6"); // need to add checks to make sure an integer between 1 and 6 is passed in
	while (true)
	{
		//let shipCount = window.prompt("How many ships do you want to play with? (minimum: 1 | maximum: 6");
		if (shipCount<=6 &&shipCount>=1){
		break;}
		else {
			shipCount = window.prompt("Try Again! \n How many ships do you want to play with? (minimum: 1 | maximum: 6");}
	}
	
})