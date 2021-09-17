class board{
	constructor (shipCount){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
		this.shipArray=[];
		
	}	
	attemptedShot(row,col){
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
	//Needs testing to make sure it rejects tails with stuff in between
	getViableTail(ship){
		let [rowHead, colHead] = ship.getHead();
		let viableTails = [];
		let viable = true;
		let size = ship.getSize();
		/*
		console.log("rh: "+ rowHead);
		console.log("ch: "+ colHead);
		*/
		
		//viableTails.push([rowHead, parseInt(colHead) + ship.getSize()-1]);
		//viableTails.push([rowHead, colHead-ship.getSize()+1]);
		//viableTails.push([rowHead-ship.getSize()+1, colHead]);
		//viableTails.push([parseInt(rowHead)+ship.getSize()-1, colHead]);
		/*
		if( (rowHead+ship.getSize()-1) >this.row 		 ||
			(rowHead-ship.getSize()+1) < 	   0		 ||
			(colHead+ship.getSize()-1) > this.column	 ||
			(colHead-ship.getSize()+1) < 	   0			){
			viable = false;
		}
		else{
			viableTails.push([rowHead, colHead+ship.getSize()-1]);
			viableTails.push([rowHead, colHead-ship.getSize()+1]);
			viableTails.push([rowHead-ship.getSize()+1, colHead]);
			viableTails.push([rowHead+ship.getSize()-1, colHead]);
		}
	
		if(viable == true){
			viableTails.push([rowHead+(ship.getSize()-1),colHead]);
		}
		*/
		
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
	
	//checks if all ships have been sunk 	
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
