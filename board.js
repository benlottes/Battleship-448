class board{
	constructor (){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
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
			return false;
		}
	}		
}
