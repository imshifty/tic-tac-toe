"use strict"

const Player = (sign) => {
    const getSign = () => sign;

    return { getSign }
}

const gameBoard = (() => {
    const board = new Array(9).fill("");
    const getBoard = () => board
    const getBoardItem = (index) => board[index]
    const setBoardItem = (value, index) => {
        board[index] = value;
    }
    const reset = () => {
        for (let i = 0; i < board.length; i++)
        {
            board[i] = "";
        }
    }
    return { getBoard, getBoardItem, setBoardItem, reset }
})();


const playGame = (() => {
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let playerXTurn = true;
    let roundCounter = 1;
    let gameOver = false;
    const WINNING_COMBINATION = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const playRound = (index) => {
        gameBoard.setBoardItem(getPlayerSign(), index);

        if (checkForDraw()) {
            displayController.setMessage("Draw");
            reset();
            gameOver = true;
        }

        if (checkForWin()){
            displayController.setMessage(`Player ${getPlayerSign()} Wins!`)
            reset();
            gameOver = true;
        }
        
        roundCounter++;
        swapTurn();
        if (!gameOver) {
            displayController.setMessage(`Player ${getPlayerSign()}'s Turn`)
        }
    }

    const checkForDraw = () => roundCounter === 9 ? true : false;
    
    const checkForWin = () => {
        return WINNING_COMBINATION.some(combination => {
            return combination.every(index => {
                return gameBoard.getBoardItem(index) === getPlayerSign();
            })
        })
    }

    const getGameOver = () => gameOver;

    const getPlayerSign = () => playerXTurn ? playerOne.getSign() : playerTwo.getSign();

    const reset = () => {
        roundCounter = 1;
        playerXTurn = true;
        gameOver = false;
    }

    const swapTurn = () => playerXTurn = !playerXTurn;

    return { getGameOver, getPlayerSign, playRound, reset }
})();

const displayController = (() => {

    const restartBtn = document.querySelector(".restartButton")
    const gridItems = document.querySelectorAll("#grid")
    const message = document.querySelector(".message")

    restartBtn.addEventListener("click", (e) => {
        gameBoard.reset();
        playGame.reset();
        setMessage(`Player X's Turn`);
        display();
    })

    gridItems.forEach( (grid) => {
        grid.addEventListener("click", (grid) => {
            if (playGame.getGameOver() || gameBoard.getBoardItem(grid.target.dataset.number - 1) != "") return;
            playGame.playRound(grid.target.dataset.number - 1);
            display();
        })
    })

    const setMessage = (msg) => {
        message.innerText = msg;
    }

    const display = () => {
        for (let i = 0; i < gameBoard.getBoard().length; i++)
        {
            gridItems[i].innerText = gameBoard.getBoardItem(i);
        }
    }
    
    return { setMessage }

})();











