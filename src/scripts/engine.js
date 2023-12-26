const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values:{
        timerId:null,
        gameVelocity:1000,
        hitSquare:0,
        countTimerDown: setInterval(timer,1000),
        result:0,
        currentTime:0
    },
}

function start(){
    state.view.lives.textContent = "X1"
    state.values.result = 0
    state.view.score.textContent = state.values.result
    var valor = prompt("Para nível fácil digite 1, médio 2, difícil qualquer outro")
    if(valor == 1){
        state.values.gameVelocity = 1000
        state.values.currentTime = 60
    }else if(valor == 2 ){
        state.values.gameVelocity = 750
        state.values.currentTime = 45
    }else{
        state.values.gameVelocity = 500
        state.values.currentTime = 30
    }
}

function playSound(archive){
    let audio = new Audio(`./src/audios/${archive}.m4a`)
    audio.play()
}

function timer(){
    state.view.timeLeft.textContent = state.values.currentTime
    state.values.currentTime--
    if(state.view.timeLeft.textContent==2){
        playSound("gameOver")
    }
    else if(state.view.timeLeft.textContent==1){
        state.view.lives.textContent = "X0"
    }
    else if(state.view.timeLeft.textContent<=0){
        alert(`Game over! Pontuação: ${state.values.result}.\nPressione OK para continuar`)
        start();
    }
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitSquare = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitSquare){
                state.values.result++;
                state.view.score.textContent = state.values.result
                state.values.hitSquare = null
                playSound("src_audios_hit")
            }
        })
    })
}

function init(){
    start();
    moveEnemy();
    addListenerHitBox();
}

init();