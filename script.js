const gameboard = (() => {
    const checkPositions = () => {
        gameplay._roundCounter = gameplay._roundCounter + 1;
        for(let i = 0; i < gameplay.winConditions.length; i++){
            let winConditionMatches = 0;
            for(let j = 0; j <= gameplay.winConditions[i].length - 1; j++){
                if(gameplay._currentTurn.position.includes(gameplay.winConditions[i][j])){
                    winConditionMatches = winConditionMatches + 1;
                    if(winConditionMatches == 3){
                        gameplay.declareWinner(gameplay._currentTurn);
                        return true
                    }
                };
            };
        };
        if(gameplay._roundCounter == 9){gameplay.declareTie()};
        display.displayGameStatus();
    };
    return {checkPositions};
})();

const gameplay = (() => {

    let _roundCounter = 0;
    let _player1 = null;
    let _player2 = null;
    let _currentTurn = null;
    let _gameState = "Playing";

    const createPlayer = (name, type, symbol, position) => {
        let player = {};
        player.name = name;
        player.type = type;
        player.symbol = symbol;
        player.position = position;
        return (player);
    };

    const winConditions = [
        "012",
        "036",
        "048",
        "147",
        "246",
        "258",
        "345",
        "678"
    ];

    const determineEnemySymbol = () => {
        if(gameplay._player1){
            if(gameplay._player1.symbol == 'X'){
                return 'O';
            };
            return 'X';
        };
    };

    const determineStartingOrder = () => {
        if(gameplay._player1.symbol == "X"){
            gameplay._currentTurn = gameplay._player1;
        }
        else{
            gameplay._currentTurn = gameplay._player2;
        };
    };

    const changeTurn = () => {
        if(gameplay._currentTurn == gameplay._player1){
            gameplay._currentTurn = gameplay._player2;
        }
        else{
            gameplay._currentTurn = gameplay._player1;
        };

        if(gameplay._currentTurn.type === 'AI' && gameplay._gameState == 'Playing'){
            aiMove();
        }
        display.displayGameStatus();
    };

    const declareWinner = (winner) => {
        gameplay._gameState = `${winner.name} wins`;
    };

    const declareTie = () => {
        gameplay._gameState = `Tie`;
    };

    const startGame = () => {
        gameplay._player1 = createPlayer(document.getElementById("playerName").value, 'Player', document.querySelector('input[name="playerSymbol"]:checked').value, "")
        gameplay._player2 = createPlayer(document.getElementById("enemyName").value, document.querySelector('input[name="enemyChoice"]:checked').value, determineEnemySymbol(), "");
        display.displayBoard();
        gameplay._gameState = `Playing`;
        determineStartingOrder();
        display.resetBoardDisplay();
        display.displayGameStatus();
        if(gameplay._currentTurn.type == 'AI' &&gameplay._currentTurn.symbol == 'X'){aiMove()};
    };

    const setInitialValues = () => {
        gameplay._player1 = null;
        gameplay._player2 = null;
        gameplay._currentTurn = null;
        gameplay._gameState = "Playing";
        gameplay._roundCounter = 0;
    };

    const resetGame = () => {
        gameplay._player1.position = '';
        gameplay._player2.position = '';
        gameplay._roundCounter = 0;
        gameplay._gameState = 'Playing';
            if(gameplay._player1.symbol == 'X'){
                gameplay._currentTurn = gameplay._player1;
            }
            else if(gameplay._player2.symbol == 'X'){
                gameplay._currentTurn = gameplay._player2;
            };
            if(gameplay._currentTurn.type == 'AI'){aiMove()};
            display.displayGameStatus();
    };

    const aiMove = () => {
        let getPositions = document.querySelectorAll(".position");
        let freePositions = []
        for(let i = 0; i < getPositions.length; i++){
            if(getPositions[i].textContent == ''){
                freePositions.push(getPositions[i].id);
            };
        };
        randomFreePosition = freePositions[Math.floor(Math.random() * freePositions.length)];
        document.getElementById(randomFreePosition).textContent = gameplay._currentTurn.symbol;
        gameplay._currentTurn.position = gameplay._currentTurn.position + randomFreePosition.replace("position", "");
        gameboard.checkPositions();
        gameplay.changeTurn();
    };
    
    document.getElementById("startGame").addEventListener("click", startGame);

    document.addEventListener("click", function(e){
        const getElement = e.target;
        getElement.id.includes('position') ? display.setPositionSymbol(getElement) : "";
    });

     return {changeTurn, winConditions, declareWinner, declareTie, setInitialValues,  _roundCounter, startGame, resetGame, aiMove};
})();

const display = (() => {
    const setPositionSymbol = (x) => {
        if(x.textContent === '' && gameplay._gameState == "Playing"){
            x.textContent = gameplay._currentTurn.symbol;
            gameplay._currentTurn.position = gameplay._currentTurn.position + x.id.replace("position", "");
            gameboard.checkPositions();
            gameplay.changeTurn();
        };
    };

    const displayBoard = () => {
        document.getElementById("gridContainer").style.display = "flex";
        document.getElementById("gameUpdates").style.display = "flex";
        document.getElementById("boardControls").style.display = "flex";
        document.getElementById("startingMenu").style.display = "none";
    };

    const displayMainMenu = () => {
        document.getElementById("gridContainer").style.display = "none";
        document.getElementById("gameUpdates").style.display = "none";
        document.getElementById("boardControls").style.display = "none";
        document.getElementById("startingMenu").style.display = "flex";
        gameplay.setInitialValues();
    };

    const resetBoardDisplay = () => {
        let targetBoardPositions = document.getElementsByClassName("position");
        for(let i = 0; i < targetBoardPositions.length; i ++){
            targetBoardPositions[i].textContent = "";
        };
        gameplay.resetGame();
    };

    const displayGameStatus = () =>{
        let targetGameUpdates = document.getElementById("gameUpdates");
        if(gameplay._gameState == 'Playing'){
            targetGameUpdates.textContent = `${gameplay._currentTurn.name}'s Turn`;
        }
        else if(gameplay._gameState == 'Player 1 wins'){
            targetGameUpdates.textContent = `${gameplay._player1.name} Wins!`;
        }
        else if(gameplay._gameState == 'Player 2 wins'){
            targetGameUpdates.textContent = `${gameplay._player2.name} Wins!`;
        }
        else{
            targetGameUpdates.textContent = "Tie!";
        };
    };
    
    document.getElementById("resetBoard").addEventListener("click", resetBoardDisplay);

    document.getElementById("newGame").addEventListener("click", displayMainMenu);

    return{setPositionSymbol, displayBoard, displayMainMenu, resetBoardDisplay, displayGameStatus};
})();