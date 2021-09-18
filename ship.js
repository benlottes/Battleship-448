/**
* Creates a ship object and contains ship functions that help with getting size, team, head 
* of the ship. It has methods to check if a ship has been sunk and to register hits 
*/

class ship{
	
	/**
	* The constructor creatses and array for each ship and stores the size, team, rowHead and colHead
	* that are passed in 
	*
	* @param  size: takes in the size of the ship 
	* @param  team: the team number (1 or 2) of the them that the ship belongs to 
	* @param  rowHead: the row of head location of the ship 
	* @param  colHead: column of the head location of the ship 
	*
	* @return None 
	*/	
	constructor(size, team, rowHead, colHead){
		this.size = size;
		this.hits = new Array(size).fill(0);
		this.team = team;
		this.rowHead = rowHead;
		this.colHead = colHead;
	}
	
	/**
	* Getter to return the size of  the ship
	*
	* @return size  
	*/
	getSize(){
		return this.size;
	}
	
	/**
	* Getter for the team the ship belongs to 
	*
	* @return team
	*/
	getTeam(){
		return this.team;
	}
	
	/**
	* Getter for the for the head ship 
	*
	* @return rowHead and colHead 
	*/
	getHead(){
		return [parseInt(this.rowHead), parseInt(this.colHead)];
	}
	
	/**
	* Checks if the entire board has been sunk (returns 1-ship has been sunk or 0-ship not sunk)
	*
	* @return 0 or 1 
	*/
	isSunk(){
		for(let i = 0; i < this.size; i++){
			if(this.hits[i] == 0){
				return 0;//returns 0 is a ship has not been sunk 
			}
		}
		return 1;//returns 1 if the ship has been sunk 
	}
	/**
	* Registers the hit on the appropriate location on the ship - converts the appropriate
	* location on teh hits array to a 1 
	*
	* @return None 
	*/
	registerHit(distance){//locate the hit on the ship 
		this.hits[distance] = 1;
	}	
}