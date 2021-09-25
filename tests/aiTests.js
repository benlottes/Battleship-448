class AITests
{
    // TODO: Assumes an AI class
    testEasyAI() {
        console.log("Easy AI tests:");
        console.log(`Full test: ${}`, (easyFullTest() ? "PASSED" : "FAILED"));

        let randomAIPlaceScore = easyRandomTest(); 
        console.log(`Random test: ${} with random score of ${}`, (randomAIPlaceScore > 0 ? "PASSED" : "FAILED"), randomAIPlaceScore);
    }

    testMediumAI() {
        // Tests: See if we give it a ship spot if it can sink it in X turns with X being ship size
        let aiBoard = new board(6);
        
        let mediumAI = new AI("medium");

        // TODO: This needs to be implemented
        let ships = mediumAI.placeShips();
 
        let currentHit = null;

        // We want to fire until we hit a square
        do
        {
            currentHit = mediumAI.fire(aiBoard);  
        } while(currentHit != 'H');

        let lastFiredSpot = mediumAI.getLastFire();
        let firedShip = aiBoard[lastFiredSpot[0]][lastFiredSpot[1]];

        // At this point, we want to make sure this ship size is larger than two, so we'll check for that
        if(firedShip.getSize() <= 2)
        {
            // Then we'll just run the test again, so we'll recurse
            return this.testMediumAI();
        }

        for(let i = 0; i < 4; i++)
        {
            // Fire again
            currentHit = mediumAI.fire(aiBoard);

            // If we hit, break from the loop
            if(currentHit == 'H')
            {
                break;
            }
        }

        // If we get through the for loop and we did not hit anything, the test failed
        if(currentHit == 'M')
        {
            return false;
        }

        // If it makes it all the way then our AI did it right, and we should be able to then keep going for the size of the ship to sink it
        // We will fire two less than the ship size since we already fired on two of the squared
        for(var i = 0; i < firedShip.getSize() - 2; i++)
        {
            mediumAI.fire(aiBoard);
        }

        // At this point the ship should be sunk, if it's not then the AI doesn't work properly
        return firedShip.isSunk(); 
    }

    easyFullTest() {
        // For an easy AI, first we need to establish a game
        // Make a new board for the player and the AI 
        aiBoard = new board(6);

        // // TODO: This function needs to be added
        // Makes a new AI object
        easyAI = new AI("easy");

        // TODO: This function needs to be added
        easyAI.placeShips();

        // We don't care about the player's turn, but what we do care about is how the AI places ships
        // The first test I have is that we call the AI fire function for as many squares as there are on the board
        // If all the squares are full, then we at least know it's doing that right
        for(let i = 0; i < 90; i++) {
            easyAI.fire(aiBboard);
        }

        // Bool for full result
        let full = true;

        // Now loop through and see if they're all hit
        for(let y = 0; y < 9; y++) {
            for(let x = 0; i < 10; x++) {
                if(aiBoard[y][x] instanceof ship) {
                    let boat = aiBoard[y][x];

                    // TODO: This function needs to be added
                    // AND full with itself so once it's false it can't be true again
                    full = full && boat.getHit(y, x);
                }
                else {
                    // 0 means empty square, so check for that if it's not a ship
                    full = full && aiBoard[y][x] == 0;
                }
            }
        }

        return full;
    }

    easyRandomTest() {
        let easyAi = new AI("easy");
        let aiOneBoard = new board(6);
        let aiTwoBoard = new board(6);

        for(let i = 0; i < 90; i++) {
            easyAI.fire(aiOneBoard); // TODO: Implement this function
            easyAI.fire(aiTwoBoard); // TODO: Implement this function
        }

        return randomBoardTest(aiOneBoard, aiTwoBoard);
    }

    randomBoardTest(boardOne, boardTwo) {
        randomScore = 0;

        for(var y = 0; y < 9; y++) {
            for(var x = 0; x < 10; x++) {
                if(boardOne[y][x] != boardTwo[y][x]) {
                    randScore++;
                }
            }
        }

        // Divide by 90 because it's the size of the board
        return randomScore / 90;
    }

    startAIGame(aiLevel) {
        
    }
}
