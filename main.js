let currentTurn = 1;
let hasShot = true;
let LshipsPlaced = false;
let RshipsPlaced = false;
let placeHead;
let placeTail;

//Need to block out screen and let them click for next turn and switch visible boats
function switchTurn(){
	if(currentTurn == 1){
		hasShot = false;
		currentTurn = 2;
		$("#turn").text("Current Turn: Player 2");
	}else{
		hasShot = false;
		currentTurn = 1;
		$("#turn").text("Current Turn: Player 1");
	}
}

function hideShips(turn){
	if(turn == 1){
		$(".gridLeft .cell").each(function(){
			if( $(this).css("background-color") == "rgb(128, 128, 128)"){ // if cell is grey, make it transparent
				$(this).css("background-color", "transparent");
			}
		});
	}
	else{
		$(".gridRight .cell").each(function(){
			if( $(this).css("background-color") == "rgb(128, 128, 128)"){ // if cell is grey, make it transparent
				$(this).css("background-color", "transparent");
			}
		});
	}	
}

document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	console.log("Canvas and Context Loaded");

	let count = 1;
	let row = 0;
	let col = 0;
	let LpossibleTails;
	let RpossibleTails;
	// iterate through each cell in gridLeft by row and number them
    $(".gridLeft .cell").each(function(){
        $(this).attr("id", count);
		$(this).attr("clicked", false);

		if((count%10) == 0){
			$(this).attr("row", (Math.floor(count / 10))-1);
			$(this).attr("col", 10-1);
		}
		else{
			$(this).attr("row", Math.floor(count / 10));
			$(this).attr("col", (count % 10)-1);
		}
		
        count++;
	});

	count = 1;
	row = 0;
	col = 0;
	// iterate through each cell in gridRight by row and number them
	$(".gridRight .cell").each(function(){
		
        $(this).attr("id", count);
        if((count%10) == 0){
			$(this).attr("row", (Math.floor(count / 10))-1);
			$(this).attr("col", 10-1);
		}
		else{
			$(this).attr("row", Math.floor(count / 10));
			$(this).attr("col", (count % 10)-1);
		}
		
        count++;
	
		});
	// ask user for number of ships to be played with
 	shipCount = window.prompt("How many ships do you want to play with? (minimum: 1 | maximum: 6"); // need to add checks to make sure an integer between 1 and 6 is passed in
	while (true)
	{
		if (shipCount<=6 &&shipCount>=1){
			break;
		}
		else {
			shipCount = window.prompt("Try Again! \n How many ships do you want to play with? (minimum: 1 | maximum: 6");

		}
	} 
	p1Board = new board(shipCount);
	p2Board = new board(shipCount);
	startGame(shipCount);
	
	//$(".gridRight .cell").click(function(){
	//});
})
let p1Board;
let p2Board;
let Lships;
let Rships;

function endGame(winner){
	$(".gridLeft .cell").off("click");
	$(".gridRight .cell").off("click");
	restoreShips(currentTurn);
	window.alert(winner + " won the game!");
}

function restoreShips(turn){
	if(turn == 1){
		$(".gridRight .cell").each(function(){
			let row = parseInt($(this).attr('row'));
			let col = parseInt($(this).attr('col'));
			if(p2Board.board[row][col] instanceof ship && ($(this).css("background-color") != "rgb(255, 0, 0)")){ // if cell is ship and not a hit set to grey
				$(this).css("background-color", "grey");
			}
		});
	}
	else{
		$(".gridLeft .cell").each(function(){
			let row = parseInt($(this).attr('row'));
			let col = parseInt($(this).attr('col'));
		    if(p1Board.board[row][col] instanceof ship && ($(this).css("background-color") != "rgb(255, 0, 0)")){ // if cell is ship and not a hit set to grey
				$(this).css("background-color", "grey");
			}
		});
	}	
}

let RnumShips = 1;
let LnumShips = 1;

function startGame(shipCount){
// logic for placing ships
	let LboolChooseHead = true
	let LheadRow;
	let LheadCol;
	let LtailRow;
	let LtailCol;
	let RboolChooseHead = true
	let RheadRow;
	let RheadCol;
	let RtailRow;
	let RtailCol;

	
	
	// this updates with new clicks but find a way to update color with click
	/* $(".gridLeft .cell").click(function(){

	});
		 */
	
	let color = {1: "grey", 2: "transparent", 3: "red"};
	let LchooseHead = true;
	let LchooseTail = false;
	let RchooseHead = true;
	let RchooseTail = false;
	Lships = [];
	Rships = [];
	let LcolorIndex = 1;
	let RcolorIndex = 1;
	
	$('#startTurn').prop('disabled', true);
	$('#endTurn').prop('disabled', true);
	
	$(".gridLeft .cell").click(function(){
		if(currentTurn == 1 && LnumShips <= shipCount){
			if(LchooseHead){
				LheadRow = $(this).attr("row");
				LheadCol = $(this).attr("col");
				if(!(p1Board.board[LheadRow][LheadCol] instanceof ship)){
					Lships.push(new ship(LnumShips, 1, parseInt(LheadRow), parseInt(LheadCol)));
					
					if(p1Board.getViableTail(Lships[LnumShips-1]).length != 0){
					
						if($(this).attr("clicked") == true)
							$(this).attr("clicked", false);
							LcolorIndex = 1; 
									
						// highlight selected head location in grey
						$(this).css("background-color", color[LcolorIndex]);
						$(this).attr("clicked", true);
						
						
						// if any cell has been clicked, make other cells unable to be highlighted
						for(let m=0; m<89; m++){
							if(!document.querySelector("true")){
								LcolorIndex = 2;
								break;
							}
							else
								LcolorIndex = 1;
						}
						
						// get possible tail locations
						LpossibleTails = p1Board.getViableTail(Lships[LnumShips-1]);
						//highlight possible tail locations
						if(Lships[LnumShips-1].getSize() > 1){
							for(let i = 0; i < LpossibleTails.length; i++){
								let tempRow = LpossibleTails[i][0];
								let tempCol = LpossibleTails[i][1];
								$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + tempCol + ']').css("background-color", "rgb(255, 100, 100)");
							}
							LchooseTail = true;
							LchooseHead = false;
						}else{
							p1Board.placeShip(Lships[LnumShips-1], LheadRow, LheadCol);
							LnumShips++;
						}
					}
				}
				}else if(LchooseTail){
					let isTail = false;
					for(let i = 0; i < LpossibleTails.length; i++){
						if(LpossibleTails[i][0] == $(this).attr("row") && LpossibleTails[i][1] == $(this).attr("col")){
							LtailRow = $(this).attr("row");
							LtailCol = $(this).attr("col");
							isTail = true;
							for(let i = 0; i < LpossibleTails.length; i++){
								let tempRow = LpossibleTails[i][0];
								let tempCol = LpossibleTails[i][1];
								$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + tempCol + ']').css("background-color", "transparent");
							}
							//$(".cell").css("background-color", "transparent");
						}
					}
					if(isTail){
						// put ship on grid
						for(let i=0; i < LnumShips-1; i++){ 
							$('.gridLeft .cell[ row = ' + LheadRow + '][ col = ' + LheadCol + ']').css("background-color", "grey");
							$('.gridLeft .cell[ row = ' + LtailRow + '][ col = ' + LtailCol + ']').css("background-color", "grey");
							
							//fill in space in between
							if(LheadRow == LtailRow && LheadCol < LtailCol){ //horizontal ship where headCol < tailCol
								for(let i=1; i< LnumShips-1; i++){
									let tempCol = (+LheadCol + +i);
									$('.gridLeft .cell[ row = ' + LheadRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
								}
							}
							else if(LheadRow == LtailRow && LheadCol > LtailCol){ //horizontal ship where headCol > tailCol
								for(let i=1; i< LnumShips-1; i++){
									let tempCol = (+LtailCol + +i);
									$('.gridLeft .cell[ row = ' + LheadRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
								}
							}
							else if(LheadRow < LtailRow && LheadCol == LtailCol){ //vertical ship where headRow < tailRow
								for(let i=1; i< LnumShips-1; i++){
									let tempRow = (+LheadRow + +i);
									$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + LheadCol + ']').css("background-color", "grey");
								}
							}
							else if(LheadRow > LtailRow && LheadCol == LtailCol){ //vertical ship where headRow > tailRow
								for(let i=1; i< LnumShips-1; i++){
									let tempRow = (+LtailRow + +i);
									$('.gridLeft .cell[ row = ' + tempRow + '][ col = ' + LheadCol + ']').css("background-color", "grey");
								}
							}
						}
						//check if more boats to place after this, if not choose tail choose head need to be false
						p1Board.placeShip(Lships[LnumShips-1], LtailRow, LtailCol);
						LchooseHead = true;
						LchooseTail = false;
						LnumShips++;
					}
				} 
			} else if (currentTurn == 2 && !hasShot && RshipsPlaced) {
				shotRow = parseInt($(this).attr("row"));
				shotCol = parseInt($(this).attr("col"));
				outcome = p1Board.attemptedShot(shotRow, shotCol);
				if(outcome == 'H'){
					$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(255, 0, 0)");
					$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nH");
					hasShot = true;
					
					if(p1Board.board[shotRow][shotCol] instanceof ship && p1Board.board[shotRow][shotCol].isSunk()){
						$("#mode").text("You sunk your opponents 1x" + p1Board.board[shotRow][shotCol].getSize() + " battleship!");
					}
					
					if(p1Board.allSunk()){
						console.log("p2 wins!");
						//P2 wins!
						endGame("Player 2");
					}
				} else if (outcome == 'M'){
					$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(0, 0, 255)");
					$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nM");
					hasShot = true;
				}
				$('#startTurn').prop('disabled', false);
				$('#endTurn').prop('disabled', false);
			}
			if(LnumShips-1 == shipCount){
				$('#startTurn').prop('disabled', false);
				$('#endTurn').prop('disabled', false);
			}
	});
	 $(".gridRight .cell").click(function(){
		if(currentTurn == 2 && RnumShips <= shipCount){
			if(RchooseHead){
				RheadRow = $(this).attr("row");
				RheadCol = $(this).attr("col");
				if(!(p2Board.board[RheadRow][RheadCol] instanceof ship)){
					Rships.push(new ship(RnumShips, 1, parseInt(RheadRow), parseInt(RheadCol)));
					
					if(p2Board.getViableTail(Rships[RnumShips-1]).length != 0){
					
						if($(this).attr("clicked") == true)
							$(this).attr("clicked", false);
							RcolorIndex = 1; 
									
						// highlight selected head location in grey
						$(this).css("background-color", color[RcolorIndex]);
						$(this).attr("clicked", true);
						
						
						// if any cell has been clicked, make other cells unable to be highlighted
						for(let m=0; m<89; m++){
							if(!document.querySelector("true")){
								RcolorIndex = 2;
								break;
							}
							else
								RcolorIndex = 1;
						}
						
						// get possible tail locations
						RpossibleTails = p2Board.getViableTail(Rships[RnumShips-1]);
						//highlight possible tail locations
						if(Rships[RnumShips-1].getSize() > 1){
							for(let i = 0; i < RpossibleTails.length; i++){
								let tempRow = RpossibleTails[i][0];
								let tempCol = RpossibleTails[i][1];
								$('.gridRight .cell[ row = ' + tempRow + '][ col = ' + tempCol + ']').css("background-color", "rgb(255, 100, 100)");
							}
							RchooseTail = true;
							RchooseHead = false;
						}else{
							p2Board.placeShip(Rships[RnumShips-1], RheadRow, RheadCol);
							RnumShips++;
						}
						
					}
				}
				}else if(RchooseTail){
					let isTail = false;
					for(let i = 0; i < RpossibleTails.length; i++){
						if(RpossibleTails[i][0] == $(this).attr("row") && RpossibleTails[i][1] == $(this).attr("col")){
							RtailRow = $(this).attr("row");
							RtailCol = $(this).attr("col");
							isTail = true;
							for(let i = 0; i < RpossibleTails.length; i++){
								let tempRow = RpossibleTails[i][0];
								let tempCol = RpossibleTails[i][1];
								$('.gridRight .cell[ row = ' + tempRow + '][ col = ' + tempCol + ']').css("background-color", "transparent");
							}
							//$(".cell").css("background-color", "transparent");
						}
					}
					if(isTail){
						// put ship on grid
						for(let i=0; i < RnumShips-1; i++){ 
							$('.gridRight .cell[ row = ' + RheadRow + '][ col = ' + RheadCol + ']').css("background-color", "grey");
							$('.gridRight .cell[ row = ' + RtailRow + '][ col = ' + RtailCol + ']').css("background-color", "grey");
							
							//fill in space in between
							if(RheadRow == RtailRow && RheadCol < RtailCol){ //horizontal ship where headCol < tailCol
								for(let i=1; i<RnumShips-1; i++){
									let tempCol = (+RheadCol + +i);
									$('.gridRight .cell[ row = ' + RheadRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
								}
							}
							else if(RheadRow == RtailRow && RheadCol > RtailCol){ //horizontal ship where headCol > tailCol
								for(let i=1; i< RnumShips-1; i++){
									let tempCol = (+RtailCol + +i);
									$('.gridRight .cell[ row = ' + RheadRow + '][ col = ' + tempCol + ']').css("background-color", "grey");
								}
							}
							else if(RheadRow < RtailRow && RheadCol == RtailCol){ //vertical ship where headRow < tailRow
								for(let i=1; i<RnumShips-1; i++){
									let tempRow = (+RheadRow + +i);
									$('.gridRight .cell[ row = ' + tempRow + '][ col = ' + RheadCol + ']').css("background-color", "grey");
								}
							}
							else if(RheadRow > RtailRow && RheadCol == RtailCol){ //vertical ship where headRow > tailRow
								for(let i=1; i<RnumShips-1; i++){
									let tempRow = (+RtailRow + +i);
									$('.gridRight .cell[ row = ' + tempRow + '][ col = ' + RheadCol + ']').css("background-color", "grey");
								}
							}
						}
						//check if more boats to place after this, if not choose tail choose head need to be false
						p2Board.placeShip(Rships[RnumShips-1], RtailRow, RtailCol);
						RchooseHead = true;
						RchooseTail = false;
						RnumShips++;
					}
				}
			} else if ((currentTurn == 1 && !hasShot) && LshipsPlaced) {
					shotRow = parseInt($(this).attr("row"));
					shotCol = parseInt($(this).attr("col"));
					outcome = p2Board.attemptedShot(shotRow, shotCol);
					if(outcome == 'H'){
						$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(255, 0, 0)");
						$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nH");
						hasShot = true;
						
						if(p2Board.board[shotRow][shotCol] instanceof ship && p2Board.board[shotRow][shotCol].isSunk()){
							$("#mode").text("You sunk your opponents 1x" + p2Board.board[shotRow][shotCol].getSize() + " battleship!");
						}
						
						if(p2Board.allSunk()){
							console.log("p1 wins!");
							//P1 wins!
							endGame("Player 1");
						}
					} else if (outcome == 'M'){
						$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(0, 0, 255)");
						$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nM");
						hasShot = true;
					}
					$('#startTurn').prop('disabled', false);
					$('#endTurn').prop('disabled', false);
				}
			if(RnumShips-1 == shipCount){
				$('#startTurn').prop('disabled', false);
				$('#endTurn').prop('disabled', false);
		}
	}); 
	$("#startTurn").click(function(){
		hideShips(currentTurn);
		switchTurn();
		$('#startTurn').prop('disabled', true);
		$('#endTurn').prop('disabled', true);
		
		if (RshipsPlaced && LshipsPlaced)
			$("#mode").text("Shoot"); // change game mode to shoot
	});
	$("#endTurn").click(function(){
		if(LnumShips-1 == shipCount){
			LchooseHead = false;
			LchooseTail = false;
			LshipsPlaced = true;
		}
		if(RnumShips-1 == shipCount){
			RshipsPlaced = true;
			RchooseHead = false;
			RchooseTail = false;
		}
			restoreShips(currentTurn);
	});
}