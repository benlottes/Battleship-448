class PowerUpTest
{
    //Need to implement the powerUpShot() function to set hit squares equal to 1, return 'M' if there are no hits,
    //'H' if there are one or more hits, and 'I' if there are any invalid shots. If a shot is fired on an already 
    //fired at space, the shot will be accepted.
    constructor(shipCount){
        powerUpBoard = new board(shipCount);
    }
    squaresAreHit(row, col) {
        this.powerUpBoard.powerUpShot(row, col);
        if(this.powerUpBoard[row][col]!=1) 
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+2]!=1)
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+4]!=1)
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+6]!=1) 
        {
            return false;
        }
        else if(this.powerUpBoard[row][col+8]!=1) 
        {
            return false;
        }
        else 
        {
            return true;
        }
    }
    nonTargetedShotsAreNotHit(row, col)
    {
        for(var r=0; r<=8; r++)
        {
            for(var c=0; c<=9; c++)
            {
                this.powerUpBoard[r][c]=0;
            }
        }
        this.powerUpBoard.powerUpShot(row, col);
        for(var r=0; r<=8; r++)
        {
            for(var c=0; c<=9; c++)
            {
                if((r==row)&&(c==col))
                {

                }
                else if((r==row)&&(c==col+2))
                {

                }
                else if((r==row)&&(c==col+4))
                {

                }
                else if((r==row)&&(c==col+6))
                {
                    
                }
                else if((r==row)&&(c==col+8))
                {
                    
                }
                else if(this.powerUpBoard[r][c]!=0)
                {
                    return false;
                }
                else
                {

                }
            }
        }
        return true;
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
        else
        {
            return true;
        }
    }
}