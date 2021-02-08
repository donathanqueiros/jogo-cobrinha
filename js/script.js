let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let snake = [];
let score = 0;
let maxscore = 0;
let jogo;

snake[0] = {
    x: 10,
    y: 10
}

let direction = "right";

let food = {
    x: 0,
    y: 0
}

function posFood() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    for (i = 0; i < snake.length; i++) {
        if (snake[i].x == x && snake[i].y == y) {
            return posFood();
        }
    }

    food.x = x;
    food.y = y;


}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 20, 20);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, 1, 1);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, 1, 1);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function attScore() {
    score++;
    document.getElementById("score").innerHTML = score;

}



function iniciarJogo() {

    if (snake[0].x == 20) snake[0].x = 0;
    if (snake[0].x == -1) snake[0].x = 19;
    if (snake[0].y == 20) snake[0].y = 0;
    if (snake[0].y == -1) snake[0].y = 19;

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += 1;
    if (direction == "left") snakeX -= 1;
    if (direction == "down") snakeY += 1;
    if (direction == "up") snakeY -= 1;


    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        posFood();
        attScore();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {

            alert('Game Over :(');
            pararJogo();
            restart();
        }
    }

}

criarBG();
posFood();

function start(botao) {
    botao.disabled = true;
    startJogo();

}

function restart() {
    criarBG();
    snake = [];
    snake[0] = {
        x: 10,
        y: 10
    };


    var restart = document.getElementById("restart");
    if (score > maxscore) {
        document.getElementById("max-score").innerHTML = score;
        maxscore = score;
    }

    score = 0;
    document.getElementById("score").innerHTML = score;

    restart.disabled = false;

}

function startJogo() {
    jogo = setInterval(iniciarJogo, 100);
}

function pararJogo() {
    clearInterval(jogo);
} 
