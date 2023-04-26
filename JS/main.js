/*----- constants -----*/
//no constants
/*----- state variables -----*/
/*----- cached elements  -----*/

const messageEl = document.querySelector('h3')
const playAgainBtn = document.querySelector('button')


let pits_1 = [4, 4, 4, 4, 4, 4];// row 1 - last idx represents player 1 store
let pits_2 = [4, 4, 4, 4, 4, 4]; // row 2 - last idx represents player 2 store
let store_1 = 0;
let store_2 = 0;
let turn = 1 // 1 || -1
const player = document.querySelector('.player');

// init()

// function init() {
//         turn = 1
//         winner = null
//         render()
// }
const pits = document.querySelectorAll('.pit');

function renderBoard() {
    for (let i = 0; i <= 5; i++) {
        pits[i].textContent = pits_1[i];
        pits[i+6].textContent = pits_2[i];
      }
}
renderBoard();


function pocketClick() {
    pits.forEach((pit, index) => {
        pit.addEventListener('click', function callMoveStones() {
          moveStones(index);
        });
      });
} 
pocketClick()
function moveStones(index) {
    if (turn === 1 && pits_1[index] === 0) {
        return;
    }
    if (turn === -1 && pits_2[index] === 0) {
        return;
    }

    let stones;
    let store;
    if (turn === 1) {
        stones = pits_1[index];
        console.log(stones);
        console.log(index);
        pits_1[index] = 0;
        store = store_1;
    } else if(turn === -1){
        stones = pits_2[index];
        pits_2[index] = 0;
        console.log(index);
        console.log(stones);
        store = store_2;
    }
    let i = index + 1;
    while (stones > 0) {
        if (turn === 1 && i === 6) {
            i = 0;
            store++;
        } else if (turn === -1 && i === 12) {
            i = 0;
            store++;
        }

        if (turn === 1) {
            pits_1[i]++;
        } else {
            pits_2[i]++;
        }

        stones--;
        i++;
    }
    if (turn === 1 && i - 1 === 6) {
        turn = 1;
      } else if (turn === -1 && i - 1 === 12) {
        turn = -1;
      } else {
        turn = (turn === 1) ? -1 : 1;
      }
    
      store_1 = store;
      store_2 = store;
    
      renderBoard();
    
      if (checkGameOver()) {
        endGame();
      } else {
        player.textContent = `Player ${turn}'s turn`;
      }
}
function checkGameOver() {
    let empty_1 = true;
    let empty_2 = true;
    for (let i = 0; i < 6; i++) {
      if (pits_1[i] !== 0) {
        empty_1 = false;
      }
      if (pits_2[i] !== 0) {
        empty_2 = false;
      }
    }
    if (empty_1 || empty_2) {
      return true;
    }
    return false;
}
function endGame() {
    let message;
    if (store_1 > store_2) {
      message = "Player 1 wins!";
    } else if (store_2 > store_1) {
      message = "Player 2 wins!";
    } else {
      message = "It's a tie!";
    }
    player.textContent = message;
    pits.forEach(pit => pit.removeEventListener('click', moveStones));
}
renderBoard();


