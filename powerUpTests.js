class PowerUpTest
{
    //Need to implement the powerUpShot() function
    constructor(shipCount){
        powerUpBoard = new board(shipCount);
        //Need to have this place ships too
    }
    squaresAreHit(row, col) {
        powerUpBoard.powerUpShot(row, col);
        if(this.powerUpBoard[row][col]==1) 
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+2]==1)
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+4]==1)
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+6]==1) 
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+8]==1) 
        {
            return false;
        }
        else 
        {
            return true;
        }
    }
    rejectsInvalidInput(row, col)
    {
        output = powerUpBoard.powerUpShot(row, col);
        if((col>=2)||(col<0))
        {
            if(output=='I')
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else if((row<0)||(row>=9))
        {
            if(output=='I')
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }


}
