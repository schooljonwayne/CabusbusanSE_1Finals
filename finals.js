// 0 1 2
// 3 4 5
// 6 7 8
const winPatterns = [
 [0,3,6], [1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]
];
const boardClass = document.querySelector("#board");
const cellClass = document.querySelectorAll("#board .cell");
const resultText = document.querySelector("game-result-text")
const resultGame = document.getElementById("game-result")

var whoseTurn;

ticTacToe();

function ticTacToe(){
    boardClass.classList.remove("ex-turn", "circle-turn");

    for (let cell of cellClass){
        cell.classList.remove("ex", "circle");
        cell.addEventListener("click", clickCell, { once: true });
    }

    whoseTurn = Math.round (Math.random (0, 1)) == 1 ? "ex" : "circle";
    boardClass.classList.add(whoseTurn + "-turn");
}

function clickCell(){
    this.classList.add(whoseTurn);

    function gameStatus() {
        return winPatterns.some(winPatterns => {
            return winPatterns.every(c=>{
                if (cellClass[c].classList.contains(whoseTurn)){
                    return true;
             } else {
                 return false;
             }
            });
        }); 
    }
    
    function ifDraw () {
        return [...cellClass].every(c => {
        if (c.classList.contains ('ex') || c.classList.contains ("circle")) {
            return true;
        }
        return false;
        });
    }

    if (gameStatus()) {
        const restart = confirm(whoseTurn.toUpperCase() + " won the game!");
        if(restart) ticTacToe();
        resultText.innerText = `${whoseTurn} won!`;
        resultGame.classList.add('show');
    } else if (ifDraw()) {
        const restart = confirm("A Draw!");
        if(restart) ticTacToe();
        resultText.innerText = `Draw!`;
        resultGame.classList.add('show');
    } else {
    whoseTurn = whoseTurn == "ex" ? "circle": "ex";

    boardClass.classList.remove("circle-turn", "ex-turn");
    boardClass.classList.add(whoseTurn+"-turn");
    } 
}
