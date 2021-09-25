class PowerUpTest
{
    //Need to implement the powerUpShot() function
    constructor(shipCount){
        powerUpBoard = new board(shipCount);
        //Need to have this place ships too
    }
    squaresAreHit(row, col) {
        powerUpBoard.powerUpShot(row, col);
        if((board.attemptedShot(row, col)=='H')||(board.attemptedShot(row, col)=='M')) 
        {
            test = true;
        }
        else
        {
            return false;
        }
        if((board.attemptedShot(row, col+2)=='H')||(board.attemptedShot(row, col+2)=='M')) 
        {
            test = true;
        }
        else
        {
            return false;
        }
        if((board.attemptedShot(row, col+4)=='H')||(board.attemptedShot(row, col+4)=='M')) 
        {
            test = true;
        }
        else
        {
            return false;
        }
        if((board.attemptedShot(row, col+6)=='H')||(board.attemptedShot(row, col+6)=='M')) 
        {
            test = true;
        }
        else
        {
            return false;
        }
        if((board.attemptedShot(row, col+8)=='H')||(board.attemptedShot(row, col+8)=='M')) 
        {
            test = true;
        }
        else
        {
            return false;
        }
        return test;
    }
    rejectsInvalidInput(row, col)
    {
        output = powerUpBoard.powerUpShot(row, col);
        if(col>=2)
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
    //Ran out of time on the following methods. I need to figure out how to tell whether a square has been fired
    //at yet or not, then I will be able to finish these
    allowsShotsOnMissSquares(row, col)
    {
        powerUpBoard.powerUpShot(row, col);
        /*if(square is a miss for any of the 5 shots)
        {
            if(all squares are still a miss)
            {
                return true; 
            }
            else {return false;}
        }*/
    }

    allowsShotsOnHitSquares(row, col)
    {
        /*if(square is a hit for any of the 5 shots)
        {
            if(all squares are still a hit)
            {
                return true;
            }
            else {return false;}
        }*/
    }
}
