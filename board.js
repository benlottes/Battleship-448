class board{
	constructor (){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
	}	
	attemptedShot(row,col){
		if(board[row][col]==0){
			board[row][col]=1;
		}
		else{
			let boat = board[row][col];
			let [rowHead, colHead] = boat.getHead();
			let distance = Math.abs((rowHead-row)+(col-colHead));
			boat.registerHit(distance);
		}
	}		
}
