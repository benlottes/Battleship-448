let currentTurn = 1;
let hasShot = true;
let LshipsPlaced = false;
let RshipsPlaced = false;
let placeHead;
let placeTail;
let hasPowerUp = 0;
let currentPowerUp = 0;
//let powerUp = false;
/** 
*When this function is called it first checks what value currentTurn holds, either 1 or 2 for player one and player two. 
*Then the function sets the Boolean value hasShot to false because each turn switch will require the player to shoot again.
*Finally, the function changes the value of currentTurn to indicate a turn switch.  
*@param none 
*@return none 
*/ 
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
/** 
*hideShips takes in current player turn as a parameter then checks if player one or player two is 
*currently up. If it is player-one’s turn then player-two’s ships must be hidden for the incoming shot 
*made by player one. So, hideShips checks each cell to see of player-two's board for any grey colored 
*cells. If a cell is grey, or a cell with a ship object, then it will be set to transparent to effectively hide the 
*ships while maintaining the hits and misses. If the current player's turn is equal to 2 it will hide player-one's ships. 
*@param turn this parameter is the current players turn, p1 or p2 
*@return none 
*/ 
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
});

let p1Board;
let p2Board;
let Lships;
let Rships;
/** 
*endGame() takes winner to display the winner of the game. When endGame() is called it first disables 
*any further click events to register. After that, restoreShips() is called on the current player’s turn
*so each player can see the opponents ship placements. Next, both the start-game and end-game buttons are
*disables to prevent further blacking out of the screen. Finally, a window alert is called to display the 
*winner of the game for both players to see.
*@param winner this parameter is the first player who sinks all the ships, p1 or p2 
*@return None 
*/ 
function endGame(winner){
	$(".gridLeft .cell").off("click");
	$(".gridRight .cell").off("click");
	restoreShips(currentTurn);
	window.alert(winner + " won the game!");
	$('#startTurn').prop('disabled', true);
	$('#endTurn').prop('disabled', true);
}
/** 
*restoreShips takes in current player turn as a parameter then checks if player one or player two is currently up. 
*If it is player-one’s turn, then their ships should be restored. So, restoreShips checks each 
*cell for a ship object using instanceof, and if a ship object is found, then that cell will be colored back to 
*grey. However, if a cell is colored red to indicate a hit ship object, then the cell will remain red. 
*If the turn is equal to two it will restore player-two's ship.  
*@param turn this parameter is the current players turn, p1 or p2. 
*@return None
*/ 
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

startGame() 

/**
*startGame takes in the user input shipCount to initialize the number of ships that will need to be 
*placed by each player. Next, startGame() disables both the start turn and end turn buttons to avoid a 
*turn switch before all ships have been placed by the player. After that, the click event is called and if 
*current turn is 1, then player one can click a cell to choose a head location of the first ship. If the 
*placement is valid then a new ship object is created to be inserted into the cell. After the cell detects a 
*ship object it is colored gray. If the ship object is greater than length 1, then the user will be prompted 
*to click any of the possible tail locations to orient the ship. A check is put in place that disallows the 
*user to click any other cells until a viable tail is selected. After a head and tail location are selected the 
*entire space between them is colored gray to indicate the location of the player's ship. If there are no 
*more ships to be placed by player one, then end turn can be pressed and the next player can begin the 
*same process of placing ships. After all ships by both players are placed, player-one's shooting phase 
*begins and a shotRow and shotColum on player-two’s board can be selected by player one. 
*attemptedShot() is called and if shotRow and shotColumn have a ship object stored in that location 
*then a hit is declared, and the cell is colored red. If a hit is declared, then allSunk() is called to check 
*if the player has sunk all the opponent's ships and won the game. If no winner is decided yet, then the 
*next player begins the same process of clicking on a shotRow and shotColumn.  If there is no ship 
*object in that location then the shot is declared as a miss and the cell is colored blue. 
*@param shipCount, this is a user given value to determine the desired number of ships to play with 
*@return none 
*/ 
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
					possibleShip = new ship(LnumShips, 1, parseInt(LheadRow), parseInt(LheadCol));
					
					if(p1Board.getViableTail(possibleShip).length != 0){
						Lships.push(possibleShip);
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
				hasPowerUp = 1;
				currentPowerUp = 2;
				if(hasPowerUp && currentPowerUp)
				{
					switch (currentPowerUp)
					{
						case 0:
							break;
						case 1:
							p1Board.attemptTornado(shotRow, shotCol);
						case 2:
							p1Board.multiShot(shotRow, shotCol);

					}
				}
				else
				{
					outcome = p1Board.attemptedShot(shotRow, shotCol);
					if(outcome == 'H'){
						$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(255, 0, 0)");
						$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nH");
						hasShot = true;
						
						if(p1Board.board[shotRow][shotCol] instanceof ship && p1Board.board[shotRow][shotCol].isSunk()){
							$("#mode").text("You sunk your opponents 1x" + p1Board.board[shotRow][shotCol].getSize() + " battleship!");
						}
						$('#endTurn').prop('disabled', false);
						if(p1Board.allSunk()){
							console.log("p2 wins!");
							//P2 wins!
							endGame("Player 2");
						}
					} else if (outcome == 'M'){
						$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(0, 0, 255)");
						$('.gridLeft .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nM");
						hasShot = true;
						$('#endTurn').prop('disabled', false);
					}
				}
			}
		if(currentTurn == 1 && hasShot && LnumShips-1 == shipCount){
			$('#endTurn').prop('disabled', false);
		}
	});
	 $(".gridRight .cell").click(function(){
		if(currentTurn == 2 && RnumShips <= shipCount){
			if(RchooseHead){
				RheadRow = $(this).attr("row");
				RheadCol = $(this).attr("col");
				if(!(p2Board.board[RheadRow][RheadCol] instanceof ship)){
					possibleShip = new ship(RnumShips, 1, parseInt(RheadRow), parseInt(RheadCol));
					
					if(p2Board.getViableTail(possibleShip).length != 0){
						Rships.push(possibleShip);
						hasShot = true;
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
					hasPowerUp = 1;
					currentPowerUp = 2;
					if(hasPowerUp && currentPowerUp)
					{
						switch (currentPowerUp)
						{
							case 0:
								break;
							case 1:
								p2Board.attemptTornado(shotRow, shotCol);
							case 2:
								p2Board.multiShot(shotRow, shotCol);

						}
					}
					else
					{
						outcome = p2Board.attemptedShot(shotRow, shotCol);
						if(outcome == 'H'){
							$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(255, 0, 0)");
							$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nH");
							//hasShot = true;
							
							if(p2Board.board[shotRow][shotCol] instanceof ship && p2Board.board[shotRow][shotCol].isSunk()){
								$("#mode").text("You sunk your opponents 1x" + p2Board.board[shotRow][shotCol].getSize() + " battleship!");
							}
							$('#endTurn').prop('disabled', false);
							if(p2Board.allSunk()){
								console.log("p1 wins!");
								//P1 wins!
								endGame("Player 1");
							}
						} else if (outcome == 'M'){
							$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').css("background-color", "rgb(0, 0, 255)");
							$('.gridRight .cell[ row = ' + shotRow + '][ col = ' + shotCol + ']').text("\nM");
							//hasShot = true;
							$('#endTurn').prop('disabled', false);
						}
					}
					hasShot = true;
				}
			if(currentTurn == 2 && hasShot && RnumShips-1 == shipCount){
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
			$('#startTurn').prop('disabled', false);
			LchooseHead = false;
			LchooseTail = false;
			LshipsPlaced = true;
		}
		if(RnumShips-1 == shipCount){
			$('#startTurn').prop('disabled', false);
			RshipsPlaced = true;
			RchooseHead = false;
			RchooseTail = false;
		}
			restoreShips(currentTurn);
	});
}