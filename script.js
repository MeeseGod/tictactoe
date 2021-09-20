// Tic Tac Toe


// *** Things to keep in mind ***
    // Try tucking everything away inside of a module or factory. 

    // You’re going to store the gameboard as an array inside of a Gameboard object,
        // you’re probably going to want an object to control the flow of the game itself.
        // if you only ever need ONE of something (gameBoard, displayController), use a module. 

    // Your players are also going to be stored in objects
        // If you need multiples of something (players!), create them with factories.

// *** Steps ***

    //  write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

    // Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. 
        // Don’t forget the logic that keeps players from playing in spots that are already taken!

    // Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

    // Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

    // Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    // const Player = (name, level) => {
    //     let health = level * 2;
    //     const getLevel = () => level;
    //     const getName  = () => name;
    //     const die = () => {
    //       // uh oh
    //     };
    //     const damage = x => {
    //       health -= x;
    //       if (health <= 0) {
    //         die();
    //       }
    //     };
    //     const attack = enemy => {
    //       if (level < enemy.getLevel()) {
    //         damage(1);
    //         console.log(`${enemy.getName()} has damaged ${name}`);
    //       }
    //       if (level >= enemy.getLevel()) {
    //         enemy.damage(1);
    //         console.log(`${name} has damaged ${enemy.getName()}`);
    //       }
    //     };
    //     return {attack, damage, getLevel, getName}
    //   };

const gameboard = (() => {
    const test = (a) => a;

    let positionStates = ["", "", "", "", "", "", "", "", ""];
    
    return {test, positionStates};
})();

const gameplay = (() => {
    // Private variables & functions
    const createPlayer = (name) => {
        let player = {};
        player.name = name;
        return (player);
    }

    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let player1 = createPlayer("Me");

    let currentTurn = 'X';

    // function that changes state of currentTurn CORRECTLy
    const changeCurrentTurn = () => {
        currentTurn === 'X' ? currentTurn = 'O' : currentTurn = 'X';
    }
    
    // Public Variables & functions

    document.addEventListener("click", function(e){
        const getElement = e.target;
        getElement.id.includes('position') ? setPositionSymbol(getElement) : "";
    })

    const setPositionSymbol = (x) => {
        if(x.textContent === ''){
            x.textContent = currentTurn;
            displayBoard.updateBoard();
            changeCurrentTurn();
        }
    }

    return {winConditions, player1, currentTurn};
})();

const displayBoard = (() => {
    const getBoardPositions = document.querySelectorAll(".position");
    
    const updateBoard = () => {
        for(let i = 0; i <= getBoardPositions.length; i++){
            if(gameboard.positionStates[i]){getBoardPositions[i].textContent = gameboard.positionStates[i]};
        }
    }
    
    return{getBoardPositions, updateBoard};
})();


console.log(gameboard.test("f"));
console.log(gameboard.positionStates[1]);
console.log (`Length: ${gameboard.positionStates.length}`);
console.log(typeof(gameboard));
console.log(gameplay.winConditions);
console.log(gameplay.player1);
console.log(displayBoard.getBoardPositions);
displayBoard.updateBoard();