const MainGame = document.querySelector("#main-game")
const btns = Array.from(MainGame.querySelectorAll("button")) 
const display = document.querySelector("#inner-display")
const restartBtn = document.querySelector("#btn")

let Gameboard = {
    "gameboard": ["","", "" ,"","", "","","", ""  ],
    "finished" : function() {
        if (Gameboard.gameboard[0] != ""  && Gameboard.gameboard[0] == Gameboard.gameboard[1] && Gameboard.gameboard[0] == Gameboard.gameboard[2]) {
            Gameboard.winner = Gameboard.gameboard[0]
            return true
        } else if (Gameboard.gameboard[3] != ""  && Gameboard.gameboard[3] == Gameboard.gameboard[4] && Gameboard.gameboard[3] == Gameboard.gameboard[5]) {
            Gameboard.winner = Gameboard.gameboard[3]
            return true
        } else if (Gameboard.gameboard[6] != ""  && Gameboard.gameboard[6] == Gameboard.gameboard[7] && Gameboard.gameboard[6] == Gameboard.gameboard[8]) {
            Gameboard.winner = Gameboard.gameboard[6]
            return true
        } else if (Gameboard.gameboard[0] != ""  && Gameboard.gameboard[0] == Gameboard.gameboard[3] && Gameboard.gameboard[0] == Gameboard.gameboard[6]) {
            Gameboard.winner = Gameboard.gameboard[0]
            return true
        } else if (Gameboard.gameboard[1] != ""  && Gameboard.gameboard[1] == Gameboard.gameboard[4] && Gameboard.gameboard[1] == Gameboard.gameboard[7]) {
            Gameboard.winner = Gameboard.gameboard[1]
            return true
        }else if ( Gameboard.gameboard[2] != ""  && Gameboard.gameboard[2] == Gameboard.gameboard[5] && Gameboard.gameboard[2] == Gameboard.gameboard[8]) {
            Gameboard.winner = Gameboard.gameboard[2]
            return true
        } else if (Gameboard.gameboard[0] != ""  && Gameboard.gameboard[0] == Gameboard.gameboard[4] && Gameboard.gameboard[0] == Gameboard.gameboard[8]) {
            Gameboard.winner = Gameboard.gameboard[0]
            return true
        } else if (Gameboard.gameboard[2] != ""  && Gameboard.gameboard[2] == Gameboard.gameboard[4] && Gameboard.gameboard[2] == Gameboard.gameboard[6]) {
            Gameboard.winner = Gameboard.gameboard[2]
            return true
        } else if (btns.every(btn => {
            if (btn.dataset.empty == "false") {
                return true
            }
        })) {
            Gameboard.tie = true
            return true
        } else {
            return false
        }
        
    },
    "winner" :undefined ,
    "tie" : false,
}

function Game(e){
    if (Gameboard.finished() == false) {
        const btn = e.target
        const index = btn.dataset.index
        const {previousPlayer} =MainGame.dataset
        const {empty} = btn.dataset
        if (empty == "true") {
            if (previousPlayer == undefined || previousPlayer == "O") {
                btn.innerText = "X"
                Gameboard.gameboard[index] = "X"
                btn.style.color ="black"
                display.innerText = "player 'O' turn"
            } else {
                btn.innerText = "O"
                Gameboard.gameboard[index] = "O"
                btn.style.color = "#4b4b4b"
                display.innerText = "player 'X' turn"
            }
        }
        btn.dataset.empty = (btn.innerText == "")
        MainGame.dataset.previousPlayer = btn.innerText
        if (Gameboard.finished()) {
            if (Gameboard.tie) {
                display.innerText = "Tie Game!"
                display.style.color = "red"
            } else {
                display.innerText = `${Gameboard.winner} won the game!`
                display.style.color =" red"
            }
        }
    }
    
}
btns.forEach(btn =>{
    btn.addEventListener("click", Game)
})


restartBtn.addEventListener("click", restart)


function restart(){
    for(let i = 0; i < 9; i++) {
        const btn = document.querySelector(`button[data-index='${i}']`)
        btn.dataset.empty = "true"
        btn.innerText = ""
        Gameboard.gameboard[i] = ""
    } 
    Gameboard.winner = undefined
    Gameboard.tie = false
    delete MainGame.dataset.previousPlayer
    display.innerHTML = "player 'X' turn"
    display.style.color ="black"
}




