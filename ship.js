class ship{
	//size - int; team - 1 or 2; headLocation - (rowHead, colHead);hits-locations in the array where the ship has been hit 
	constructor(size, team, rowHead, colHead){
		this.size = size;
		this.hits = new Array(size).fill(0);
		this.team = team;
		this.rowHead = rowHead;
		this.colHead = colHead;
	}
	getSize(){//getter for the size 
		return this.size;
	}
	getTeam(){//getter for the team 
		return this.team;
	}
	getHead(){//getter for the head 
		return [this.rowHead, this.colHead];
	}
	
	isSunk(){//edited the sunk function to return 1 or 0 but left the other function just in case
		for(let i = 0; i < size; i++){
			if(hits[i] == 0){
				return 0;//returns 0 is a ship has not been sunk 
			}
		}
		return 1;//returns 1 if the ship has been sunk 
	}
	registerHit(distance){//locate the hit on the ship 
		this.hits[distance] = 1;
	}
	
	
}