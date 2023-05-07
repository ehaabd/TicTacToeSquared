let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let boxesMini = Array.from(document.getElementsByClassName('boxMini'));

//X corresponds to blue
//O corresponds to yellow
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(false);
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
    restartBtn.addEventListener('click', restart)
}

//Error with logic gate determining if player has won - needs to be recreated in multiple parts, including the involvement of Y

function boxMiniClicked(e){
    const id = e.target.id;

    if(id>(9*playableBox-1) && id<(9*playableBox+9)){
        if(!spacesMini[id]){
            spacesMini[id] = currentPlayer;
            e.target.innerText = currentPlayer;
    
            if(playerHasWonMini()){
                if(spaces[playableBox]==X_TEXT||spaces[playableBox]==O_TEXT){
                    console.log('you should never run');
                    spaces[playableBox] = 'Y';
                    boxes[playableBox].style.backgroundColor='#00ff00';
                }else if(currentPlayer == X_TEXT){
                    console.log('why are you running');
                    spaces[playableBox] = X_TEXT;
                    boxes[playableBox].style.backgroundColor = '#1582ca';
                }else{
                    console.log('you should run');
                    spaces[playableBox] = O_TEXT;
                    boxes[playableBox].style.backgroundColor = '#8f8a29';
                }      
            }

            playableBox = (id%9);
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        }
    } 
}

function playerHasWonMini(){
    for(const condition of winningCombos){
        let a = condition[0], b = condition[1], c = condition[2];

        if(((spacesMini[a+(playableBox*9)] !== null) && (spacesMini[a+(playableBox*9)] == spacesMini[b+(playableBox*9)] && spacesMini[a+(playableBox*9)] == spacesMini[c+(playableBox*9)]))){
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

function restart() {
    spaces.fill(null);
    spacesMini.fill(null);

    boxes.forEach( box => {
        box.style.backgroundColor = '';
    })

    boxesMini.forEach( boxMini=> {
        boxMini.innerText = '';
    })

    playableBox = 4;

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame()





























































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
