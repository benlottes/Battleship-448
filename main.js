class ship(size, team){
	//size - int; team - 1 or 2; headLocation - (int, int)
	constructor(size, team, rowHead, colHead){
		this.size = size;
		this.hits = [0]*size;
		this.team = team;
		this.rowHead = rowHead;
		this.colHead = colHead;
	}
	function getSize(){
		return this.size;
	}
	function getTeam(){
		return this.team;
	}
	function getHead(){
		return [rowHead, colHead];
	}
	function isSunk(){
		for(let i = 0; i < size; i++){
			if(hits[i] == 0){
				return false;
			}
		}
		return true;
	}
	function registerHit(distance){
		this.hits[hitLocation] = 1;
	}
}

class board (){
	constructor (){
		this.row=9;
		this.column=10;
		this.board=new Array(this.row).fill().map(() => (new Array(this.column).fill().map(() => 0)));
	}	
	function attemptedShot(row,col){
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






























document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	windowBuilder = new BuildWindow(canvas, canvas.getContext('2d'));
	console.log("Canvas and Context Loaded");
})
