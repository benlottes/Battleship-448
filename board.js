class board{
	constructor (shipCount){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
		this.shipArray=new Array (shipCount);
		
	}	
	attemptedShot(row,col){
		if(this.board[row][col]==0){//empty spot - valid shot 
			this.board[row][col]=1;
			return true;
		}
		else{//if a boat is hit - valid shot 
			let boat = this.board[row][col];
			let [rowHead, colHead] = boat.getHead();
			let distance = Math.abs((rowHead-row)+(col-colHead));
			if(boat.hits[distance] != 1){
				boat.registerHit(distance);
				return true;
			}
		}
		return false;//not a valid shot 
	}
	placeShip(newShip, rowTail, colTail){
		let [rowHead, colHead] = newShip.getHead()		
		shipArray.push(newShip);
		
		if(rowHead-rowTail == 0 && colHead-colTail == 0){
			this.board[rowHead][colHead] = newShip;
		}
		else if(rowHead-rowTail == 0){
			if(colHead-colTail < 0){
				for(let i = colHead; i <= colTail; i++){
					this.board[rowHead][i] = newShip;
				}
			}
			else{
				for(let i = colHead; i >= colTail; i--){
					this.board[rowHead][i] = newShip;
				}
			}
		}
		else if(colHead-colTail == 0){
			if(rowHead-rowTail < 0){
				for(let i = rowHead; i <= rowTail; i++){
					this.board[i][colHead] = newShip;
				}
			}
			else{
				for(let i = rowHead; i >= rowTail; i--){
					this.board[i][colHead] = newShip;
				}
			}
		}
	}
	//Needs testing to make sure it rejects tails with stuff in between
	getViableTail(ship){
		let [rowHead, colHead] = ship.getHead();
		let viableTails = [];
		let viable = true;
		for(let i = 0; i < ship.getSize()-1; i++){
			if(rowHead+i > this.row || this.board[rowHead+i][colHead] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead+(ship.getSize()-1),colHead]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize()-1; i++){
			if(rowHead-i < 0 || this.board[rowHead-i][colHead] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead-(ship.getSize()-1),colHead]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize()-1; i++){
			if(colHead+i > this.column || this.board[rowHead][colHead+i] != 0){
				viable = false;
				break;
			}
		}
		if(viable == true){
			viableTails.push([rowHead,colHead+(ship.getSize()-1)]);
		}
		viable = true;
		for(let i = 0; i < ship.getSize()-1; i++){
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
	
		
	allSunk()
	{
		let counter=0;
		for(let i=0;i<=shipCount;i++)
		{
			counter=counter+shipArray[i].isSunk();
		}
		if(counter==shipCount)
		{
			return true;
		}
		else {
			return false;
		}
		
	}
	
}
