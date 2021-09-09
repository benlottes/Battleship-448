class board{
	constructor (){
		this.row=9;
		this.column=10;
		//this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
	}	
	attemptedShot(row,col){
		if(board[row][col]==0){
			board[row][col]=1;
			return true;
		}
		else{
			let boat = board[row][col];
			let [rowHead, colHead] = boat.getHead();
			let distance = Math.abs((rowHead-row)+(col-colHead));
			if(boat.hits[distance] != 1){
				boat.registerHit(distance);
				return true;
			}
		}
		return false;
	}
	placeShip(newShip, rowTail, colTail){
		[rowHead, colHead] = newShip.getHead;
		if(rowHead-rowTail == 0 && colHead-colTail == 0){
			this.board[rowHead][colHead] = newShip;
		}
		else if(rowHead-rowTail == 0){
			if(colHead-colTail < 0){
				for(let i = colHead; i < colTail; i++){
					this.board[rowHead][i] = newShip;
				}
			}
			else{
				for(let i = colHead; i > colTail; i--){
					this.board[rowHead][i] = newShip;
				}
			}
		}
		else if(colHead-colTail == 0){
			if(rowHead-rowTail < 0){
				for(let i = rowHead; i < rowTail; i--){
					this.board[i][colHead] = newShip;
				}
			}
			else{
				for(let i = rowHead; i > rowTail; i++){
					this.board[i][colHead] = newShip;
				}
			}
		}
	}
}
