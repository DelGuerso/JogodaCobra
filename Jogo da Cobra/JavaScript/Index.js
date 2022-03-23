const musicaDeFundo = new Audio("/music/pressurepluslayers.wav");
const musicaKO = new Audio("/music/daynniteoutro.wav");
const somMover = new Audio("/music/move.mp3");
const musicaComer = new Audio("/music/what.wav");

var direcao = { x: 0, y: 1 };
var fruta = { x: Math.floor(Math.random() * 18), y: Math.floor(Math.random() * 18) }
var cobrinha = [{ x: 5, y: 5 }];
var pontos = 0;

var ultimaVezAtualizada = 0;
var velocidade = 10;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / velocidade) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;
    atualizaGame();
}

function verificaColisao() {
    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;
        }
    }
    if (cobrinha[0].x >= 18 || cobrinha[0].x < 0 || cobrinha[0].y >= 18 || cobrinha[0].y < 0) {
        return true;
    }
    return false;
}
function verificaComeuFrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        musicaComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + " PONTOS";
        var newX = cobrinha[0].x + direcao.x
        var newY = cobrinha[0].y + direcao.y
        cobrinha.unshift({ x: newX, y: newY })
        fruta.x = Math.floor(Math.random() * 16)
        fruta.y = Math.floor(Math.random() * 16)
        velocidade = velocidade + 0.5;
    }
}
function atualizaGame() {
    musicaKO.pause();
    musicaDeFundo.play();

    var colidiu = verificaColisao();
    if (colidiu == true) {
        musicaDeFundo.pause();
        musicaKO.play();
        alert("K.O.");
        cobrinha = [{ x: 5, y: 5 }];
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }
    verificaComeuFrutinha();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var cobrinhaParte = document.createElement('div');
        cobrinhaParte.style.gridRowStart = cobrinha[i].y;
        cobrinhaParte.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            cobrinhaParte.classList.add("head");
        } else {
            cobrinhaParte.classList.add("snake");
        }
        board.appendChild(cobrinhaParte);
    }
    var food = document.createElement("div");
    food.style.gridColumnStart = fruta.x;
    food.style.gridRowStart = fruta.y;
    food.classList.add("fruta");
    board.appendChild(food);
}

function direcionaCobra(e) {
    somMover.play();

    switch (e.code) {
        case "KeyW":
            direcao.y = -1
            direcao.x = 0;
            break;
        case "KeyA":
            direcao.x = -1
            direcao.y = 0;
            break;
        case "KeyS":
            direcao.x = 0
            direcao.y = 1;
            break;
        case "KeyD":
            direcao.x = 1
            direcao.y = 0;
            break;
        case "Numpad9":
            direcao.x = 1;
            direcao.y = -1;
            break;
        case "Numpad7":
            direcao.x = -1;
            direcao.y = -1;
            break;
        case "Numpad3":
            direcao.x = 1;
            direcao.y = 1;
            break;
        case "Numpad1":
            direcao.x = -1;
            direcao.y = 1;
            break;
        case "KeyQ":
            direcao.x = 0;
            direcao.y = 0;
            break;
        case "NumpadAdd":
            velocidade++;
            break;
        case "NumpadSubtract":
            velocidade--;
            break;
        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            musicaDeFundo.play();
            break;
    }
}

window.addEventListener("keydown", (e) => direcionaCobra(e));


principal();