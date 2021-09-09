class ship{
	//size - int; team - 1 or 2; headLocation - (int, int)
	constructor(size, team, rowHead, colHead){
		this.size = size;
		this.hits = [0]*size;
		this.team = team;
		this.rowHead = rowHead;
		this.colHead = colHead;
		this.counter = 0;
	}
	getSize(){
		return this.size;
	}
	getTeam(){
		return this.team;
	}
	getHead(){
		return [this.rowHead, this.colHead];
	}
	
	isSunk(){//edited the sunk function to return 1 or 0 but left the other function just in case
		for(let i = 0; i < size; i++){
			if(hits[i] == 0){
				return 0;
			}
		}
		return 1;
	}
	/*isSunk(){
		for(let i = 0; i < size; i++){
			if(hits[i] == 0){
				return false;
			}
		}
		return true;
	}*/
	registerHit(distance){
		this.hits[hitLocation] = 1;
	}
	
	allSunk(){
		//declare a member variable "counter"
		counter=counter+isSunk();
		if (counter==numberOfBoats){
			return true;//all ships sunk 
		}
		else{
			return false;//some shipps still remain
		}
	}
}