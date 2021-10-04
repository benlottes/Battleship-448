class board{
	/**
	*Creates a ship object containing 9 rows, 10 columns, a 2d array to act as our board, and an array to contain
	*all of our ships that we put on the board
	*The 2D array is initilized to all 0s. When a miss is detected it is a 1, and the ships are added as ship objects.
	*@constructor
	*@param shipCount An integer describing how many ships each player is playing with.
	*@return None
	*/
	constructor (shipCount){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
		this.shipArray=[];
		
	}
	/**
	*The function verifies that the position is a legal move and then returns a value depending on
	*what it hit. 
	*@param row An integer describing the row index the player clicked shot at.
	*@param col An integer describing the column index the player clicked shot at.
	*@return a 'M' when the player misses, a 'H' when the player hits a ship, and an 'I' otherwise.
	*/
	attemptedShot(row,col){
		//$('.gridLeft .cell[ row = 2][ col = 2]').css("background-color", "rgb(0, 0, 255)");
		if(this.board[row][col] == 0){//empty spot - valid shot 
			this.board[row][col]=1;//if shot takes place replace zero with 1
			return 'M';
		}
		else if(this.board[row][col] instanceof ship){//if a boat is hit - valid shot 
			let boat = this.board[row][col];
			let [rowHead, colHead] = boat.getHead();
			let distance = Math.abs((rowHead-row)+(col-colHead));
			if(boat.hits[distance] != 1){
				boat.registerHit(distance);
				return 'H';
			}	
		}
		return 'I';//not a valid shot 
	}

	multiShot(row, col){
		var outCome; 
		for(var i=0; i<=8; i+=2)
		{
			outCome = this.attemptedShot(row, col+i);
			if(outCome == 'H')
			{
				if(currentTurn == 1)
				{
					$('.gridRight .cell[ row = ' + row + '][ col = ' + (col+i) + ']').css("background-color", "rgb(255, 0, 0)");
					$('.gridRight .cell[ row = ' + row + '][ col = ' + (col+i) + ']').text("\nH");
				}
				else if(currentTurn == 2)
				{
					$('.gridLeft .cell[ row = ' + row + '][ col = ' + (col+i) + ']').css("background-color", "rgb(255, 0, 0)");
					$('.gridLeft .cell[ row = ' + row + '][ col = ' + (col+i) + ']').text("\nH");
				}

				if(this.board[row][col+i] instanceof ship && this.board[row][col+i].isSunk()){
					$("#mode").text("You sunk your opponents 1x" + this.board[row][col+i].getSize() + " battleship!");
				}
				$('#endTurn').prop('disabled', false);
				if(this.allSunk()){
					console.log("p2 wins!");
					//P2 wins!
					endGame("Player 2");
				}
			} 
			else if (outCome == 'M')
			{
				if(currentTurn == 1)
				{
					$('.gridRight .cell[ row = ' + row + '][ col = ' + (col+i) + ']').css("background-color", "rgb(0, 0, 255)");
					$('.gridRight .cell[ row = ' + row + '][ col = ' + (col+i) + ']').text("\nM");
				}
				else if(currentTurn == 2)
				{
					$('.gridLeft .cell[ row = ' + row + '][ col = ' + (col+i) + ']').css("background-color", "rgb(0, 0, 255)");
					$('.gridLeft .cell[ row = ' + row + '][ col = ' + (col+i) + ']').text("\nM");
				}
				$('#endTurn').prop('disabled', false);
			}
		}
	}
	/**
	*The placeShip function is provided a ship, and an index in the array for the tail position
	*The function then uses the newShip's head location to iterate through the board and add
	*an instance of the ship in each of the indices from the head location to the tail location.
	*@param newShip A ship object to be placed onto the board
	*@param rowTail An integer representing the row index of the tail
	*@param colTail An integer representing the column index of the tail
	*@return None
	*/
	placeShip(newShip, rowTail, colTail){
		let [rowHead, colHead] = newShip.getHead()		
		this.shipArray.push(newShip);//adds the ship in the main array 
		
		if(rowHead-rowTail == 0 && colHead-colTail == 0){
			this.board[rowHead][colHead] = newShip;//if its a 1x1 ship
		}
		else if(rowHead-rowTail == 0){// vertical ship 
			if(colHead-colTail < 0){//going down
				for(let i = colHead; i <= colTail; i++){
					this.board[rowHead][i] = newShip;
				}
			}
			else{//going down 
				for(let i = colHead; i >= colTail; i--){
					this.board[rowHead][i] = newShip;
				}
			}
		}
		else if(colHead-colTail == 0){//horizontal ship  
			if(rowHead-rowTail < 0){//going right 
				for(let i = rowHead; i <= rowTail; i++){
					this.board[i][colHead] = newShip;
				}
			}
			else{//going down 
				for(let i = rowHead; i >= rowTail; i--){
					this.board[i][colHead] = newShip;
				}
			}
		}
	}
	/**
	*The getViable tail function is provided a ship, which has a head location, and this function finds the indices of
	*possible tail locations by iterating in each direction from the head location, breaking if it hits a border or a ship.
	*@param ship A ship object used to locate the possible tail locations for
	*@return An array of indecies in form [int: row, int:col]
	*/
	getViableTail(ship){
		let [rowHead, colHead] = ship.getHead();
		let viableTails = [];
		let viable = true;
		let size = ship.getSize();

		for(let i = 0; i < ship.getSize(); i++){
			if(rowHead+i >= this.row || this.board[rowHead+i][colHead] != 0){	
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead+(ship.getSize()-1),colHead]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize(); i++){
			if(rowHead-i < 0 || this.board[rowHead-i][colHead] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead-(ship.getSize()-1),colHead]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize(); i++){
			if(colHead+i >= this.column || this.board[rowHead][colHead+i] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead,colHead+(ship.getSize()-1)]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize(); i++){
			if(colHead-i < 0 || this.board[rowHead][colHead-i] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead,colHead-(ship.getSize()-1)]);
		}
		return viableTails;
	}
	/**
	*allSunk() iterates through the shipArray, calling the ship function isSunk() on each ship, then checking if all of the ships have been sunk.
	*@param None
	*@return A boolean, true if all of the ships in shipArray have been sunk, false otherwise.
	*/
	allSunk()
	{
		let count = 0;
		for(let i = 0; i < this.shipArray.length; i++){
			count = count + this.shipArray[i].isSunk();
		}
		if(count == this.shipArray.length){
			return true;
		}
		return false;
	}
	
}
/*var myboard = new board(2);
var myShip = new ship(3, 1, 1, 1);
myboard.placeShip(myShip, 1, 3);
console.log(myboard.multiShot(1, 1));*/
