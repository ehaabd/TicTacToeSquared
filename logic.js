let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let boxesMini = Array.from(document.getElementsByClassName('boxMini'));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let spacesMini = Array(81).fill(null);
let playableBox = 4;

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const startGame = () => {
    boxesMini.forEach(boxMini => boxMini.addEventListener('click', boxMiniClicked));
}

//Next playable box = position % 9
//Calculate board array and winning positions based on (e - (e % 9))/9
//Can only select on tiles in playable boxes

function boxMiniClicked(e){
    const id = e.target.id;
    console.log(id);

    if(!spacesMini[id]){
        spacesMini = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !== false){
            console.log('good job. u beat the game ig.');
            
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

function playerHasWonMini() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if(spacesMini[a] && (spacesMini[a] == spacesMini[b] && spacesMini[a] == spacesMini[c])) {
            return true;
        }
    }
    return false;
}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c];
        }
    }
    return false;
}































































let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        
    }
}




restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()
