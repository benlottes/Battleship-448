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
		let board;//check which the players turn 
		if(currentTurn==1)
		{
			board = p1Board.attemptedShot();//add the parameter for row n col from the board
			if (board=='H'){
			//print that there was a hit
				if (p1Board.allSunk()){
					//print current player won
					break;
				}				
			}
			else if (board=='M'){
				//print there was a miss			
				switchTurn();
				continue;
			}
			else if (board=='I'){
				//continue hitting 
			}
		}
		else if (currentTurn==2)
		{
			board = p2Board.attemptedShot();//add the parameter for row n col 
			if (board=='H'){
			//print that there was a hit
				if (p2Board.allSunk()){
					//print current player won
					break;
				}				
			}
			else if (board=='M'){
				//print there was a miss			
				switchTurn();
				continue;
			}
			else if (board=='I'){
				//continue hitting 
			}
		}		
		switchTurn();
	}
	
}

document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	console.log("Canvas and Context Loaded");

	let count = 1;
	let row = 0;
	let col = 0;
	let possibleTails;
	// iterate through each cell in gridLeft by row and number them
    $(".gridLeft .cell").each(function(){
        $(this).attr("id", count);
		$(this).attr("clicked", false);

		if((count%10) == 0){
			$(this).attr("row", Math.floor(count / 10));
			$(this).attr("col", 10);
		}
		else{
			$(this).attr("row", Math.floor(count / 10) + 1);
			$(this).attr("col", count % 10);
		}
		
        count++;
		/*
		let placeHead = true;
		let placeTail = false;
		$(this).click(function(){
			//	if(placeHead != true && placeTail != true){
			//		//shoot
			//	}
			//	else if(placeHead == true){
			//		highlight space to show head location
			//	} else {
			//		highlight viable tail locations
			//	} 			
			/*
			console.log($(this).attr("row"))
			console.log($(this).attr("col"))
			*
		});
		*/
	});

	count = 1;
	row = 0;
	col = 0;
	// iterate through each cell in gridRight by row and number them
	$(".gridRight .cell").each(function(){
		
        $(this).attr("id", count);
        if((count%10) == 0){
			$(this).attr("row", Math.floor(count / 10));
			$(this).attr("col", 10);
		}
		else{
			$(this).attr("row", Math.floor(count / 10) + 1);
			$(this).attr("col", count % 10);
		}
		
        count++;
	});
	
	
	// ask user for number of ships to be played with
	let shipCount = window.prompt("How many ships do you want to play with? (minimum: 1 | maximum: 6"); // need to add checks to make sure an integer between 1 and 6 is passed in
	while (true)
	{
		if (shipCount<=6 &&shipCount>=1){
		break;}
		else {
			shipCount = window.prompt("Try Again! \n How many ships do you want to play with? (minimum: 1 | maximum: 6");}
	}
	
	// logic for placing ships
	let boolChooseHead = true
	let headRow;
	let headCol;
	let tailRow;
	let tailCol;
	let testShip;
	let testBoard;
	
	// get location for head of ship
	window.alert("Choose a head location");
	
	// this updates with new clicks but find a way to update color with click
	$(".gridLeft .cell").click(function(){
		headRow = $(this).attr("row");
		headCol = $(this).attr("col");
		
		testShip = new ship(3, 1, headRow, headCol);
		testBoard = new board(shipCount);
	});
		
	
	let color = {1: "grey", 2: "transparent", 3: "red"};
	let loc = [];
	let chooseHead = true;
	let chooseTail = false;
	let i = 1;
	$(".gridLeft .cell").click(function(){
		
		//allow user to change mind
		$(".gridLeft .cell").css("background-color", "transparent"); //clear previously chosen position
		
		if($(this).attr("clicked") == true)
			$(this).attr("clicked", false);
			i = 1;
		
		
		// highlight selected head location in grey
		$(this).css("background-color", color[i]);
		$(this).attr("clicked", true);
		
		
		// if any cell has been clicked, make other cells unable to be highlighted
		for(let m=0; m<89; m++){
			if(!document.querySelector("true")){
				i = 2;
				break;
			}
			else
				i = 1;
		}
		
		// get possible tail locations
		possibleTails = testBoard.getViableTail(testShip);
		
		//highlight possible tail locations
		for(let i = 0; i < possibleTails.length; i++){
			let tempRow = possibleTails[i][0];
			let tempCol = possibleTails[i][1];
			$('.cell[ row = ' + tempRow + '][ col = ' + tempCol + ']').css("background-color", "rgb(255, 100, 100)");
		}
					
		$(".gridLeft .cell").off("click");
	});
	
	
	$(".gridRight .cell").click(function(){
		
		for(let i = 0; i < possibleTails.length; i++){
			if(possibleTails[i][0] == $(this).attr("row") && possibleTails[i][1] == $(this).attr("col")){
				tailRow = $(this).attr("row");
				tailCol = $(this).attr("col");
				
				$(".cell").css("background-color", "transparent");
			}
		}
		$(".gridRight .cell").off("click");
		
	
		// put ship on grid
		for(let i=0; i < testShip.getSize(); i++){ 
			$('.gridLeft .cell[ row = ' + headRow + '][ col = ' + headCol + ']').css("background-color", "grey");
			$('.gridLeft .cell[ row = ' + tailRow + '][ col = ' + tailCol + ']').css("background-color", "grey");
			
			//fill in space in between
			if(headRow == tailRow && headCol < tailCol){ //horizontal ship where headCol < tailCol
				for(let i=1; i<3 - 1; i++){
					let tempCol = (+headCol + +i);
					$('.gridLeft .cell[ row = ' + headRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
				}
			}
			else if(headRow == tailRow && headCol > tailCol){ //horizontal ship where headCol > tailCol
				for(let i=1; i<3 - 1; i++){
					let tempCol = (+tailCol + +i);
					$('.gridLeft .cell[ row = ' + headRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
				}
			}
			else if(headRow < tailRow && headCol == tailCol){ //vertical ship where headRow < tailRow
				for(let i=1; i<3 - 1; i++){
					let tempRow = (+headRow + +i);
					$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + headCol + ']').css("background-color", "grey");
				}
			}
			else if(headRow > tailRow && headCol == tailCol){ //vertical ship where headRow > tailRow
				for(let i=1; i<3 - 1; i++){
					let tempRow = (+tailRow + +i);
					$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + headCol + ']').css("background-color", "grey");
				}
			}
		}
			
	});

})