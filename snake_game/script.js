const limitBody = document.getElementsByTagName("body")[0];

const snakeContainer = document.querySelector(".snake");
let snake = snakeContainer.querySelectorAll(".body");

const rateText = document.querySelector(".rate");
const gameOverText = document.querySelector(".game-over");
const pausedText = document.querySelector(".paused");

const ball = document.querySelector(".ball");

const buttonTop = document.querySelector(".up");
const buttonLeft = document.querySelector(".left");
const buttonRight = document.querySelector(".right");
const buttonBottom = document.querySelector(".down");

const buttonPause = document.querySelector(".pause");
const buttonReset = document.querySelector(".reset");


buttonTop.addEventListener("click", move.bind(null, "top"));
buttonLeft.addEventListener("click", move.bind(null, "left"));
buttonRight.addEventListener("click", move.bind(null, "right"));
buttonBottom.addEventListener("click", move.bind(null, "down"));

buttonPause.addEventListener("click", pauseGame);
buttonReset.addEventListener("click", resetGame);



document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            move("top");
            break;

        case "ArrowDown":
            move("down");
            break;

        case "ArrowLeft":
            move("left");
            break;

        case "ArrowRight":
            move("right");
            break;

        case "Space":
            pauseGame();
            break;

        case "Escape":
            resetGame();
            break;

        default: break;
    }
}, false);

const SPACE_BETWEEN = 12;
const SPEED = 50;

let isGameOver = false;
let isPaused = false;
let isFirstMove = true;
let isDirection = "";
let rate = 0;

function canMove(direction) {
    return !(direction === isDirection ||
        (isDirection === "left" && direction === "right") ||
        (isDirection === "right" && direction === "left") ||
        (isDirection === "top" && direction === "down") ||
        (isDirection === "down" && direction === "top"));
}

function move(direction) {
    if (!canMove(direction)) {
        return;
    }

    if (isFirstMove) {
        setBallToGame();
        isFirstMove = false;
    }

    isDirection = direction;

    if (direction === "left") {
        executeMove(moveSnakeToLeftOrRight, -SPACE_BETWEEN, direction);
    } else if (direction === "right") {
        executeMove(moveSnakeToLeftOrRight, SPACE_BETWEEN, direction);
    } else if (direction === "top") {
        executeMove(moveSnakeToTopOrBottom, -SPACE_BETWEEN, direction);
    } else {
        executeMove(moveSnakeToTopOrBottom, SPACE_BETWEEN, direction);
    }
}

async function executeMove(func, param, direction) {
    while (!isGameOver && !isPaused && direction === isDirection) {
        await sleep(SPEED);
        func(param);
    }
}

function moveSnakeToTopOrBottom(direction) {
    let minTop = snakeContainer.offsetTop + (snake[0].offsetTop + direction) + 5;
    let maxTop = snakeContainer.offsetTop - (snake[0].offsetTop + direction) - 10;

    if (minTop < 0 || maxTop < 0) {
        gameOver();
        return;
    }

    let newPositionTopBody = snake[0].style.top;
    let newPositionLeftBody = snake[0].style.left;

    snake[0].style.top = (snake[0].offsetTop + direction) + "px";;
    snake[0].style.left = newPositionLeftBody;

    if (checkIfSnakeAteHerself()) {
        gameOver();
        return;
    }

    checkIfSnakeAteBall();
    changeSnakeBodyPosition(newPositionLeftBody, newPositionTopBody);
}

function moveSnakeToLeftOrRight(direction) {
    let minleft = snakeContainer.offsetLeft + (snake[0].offsetLeft + direction) + 13;
    var maxLeft = snakeContainer.offsetLeft - (snake[0].offsetLeft + direction) - 2;

    if (minleft < 0 || maxLeft < 0) {
        gameOver();
        return;
    }

    let newPositionTopBody = snake[0].style.top;
    let newPositionLeftBody = snake[0].style.left;

    snake[0].style.top = newPositionTopBody;
    snake[0].style.left = (snake[0].offsetLeft + direction) + "px";


    if (checkIfSnakeAteHerself()) {
        gameOver();
        return;
    }

    checkIfSnakeAteBall();
    changeSnakeBodyPosition(newPositionLeftBody, newPositionTopBody);
}

function checkIfSnakeAteHerself() {
    snake = snakeContainer.querySelectorAll(".body");
    let snakeAteHerself = false;

    for (let i = 10; i < snake.length; i++) {
        if (checkIfSnakeAte(snake[i], false)) {
            snakeAteHerself = true;
            break;
        }
    }

    return snakeAteHerself;
}

function changeSnakeBodyPosition(newPositionLeftBody, newPositionTopBody) {
    snake = snakeContainer.querySelectorAll(".body");

    for (let i = 1; i < snake.length; i++) {
        let left = newPositionLeftBody;
        let top = newPositionTopBody;

        newPositionLeftBody = snake[i].style.left;
        newPositionTopBody = snake[i].style.top;

        snake[i].style.left = left;
        snake[i].style.top = top;
    }
}

function checkIfSnakeAteBall() {
    if (checkIfSnakeAte(ball, true)) {
        increaseSnake();
        changeRate();
        setBallToGame();
    }
}

function checkIfSnakeAte(peace, isBall) {
    snake = snakeContainer.querySelectorAll(".body");

    const peaceMinTop = peace.offsetTop;
    const peaceMaxTop = peaceMinTop + peace.offsetHeight;

    const peaceMinLeft = peace.offsetLeft;
    const peaceMaxLeft = peaceMinLeft + peace.offsetWidth;

    let snakeMinTop = snakeContainer.offsetTop + (snake[0].offsetTop);
    let snakeMaxTop = snakeMinTop + snake[0].offsetHeight;

    let snakeMinLeft = snakeContainer.offsetLeft + (snake[0].offsetLeft);
    let snakeMaxLeft = snakeMinLeft + snake[0].offsetWidth;

    if (!isBall) {
        snakeMinTop = (snake[0].offsetTop);
        snakeMaxTop = snakeMinTop + snake[0].offsetHeight;

        snakeMinLeft = (snake[0].offsetLeft);
        snakeMaxLeft = snakeMinLeft + snake[0].offsetWidth;
    }

    const isInverticalRange = (snakeMinLeft <= peaceMaxLeft && snakeMinLeft >= peaceMinLeft) ||
        (snakeMaxLeft <= peaceMaxLeft && snakeMaxLeft >= peaceMinLeft);

    const isInHorizontalRange = (snakeMinTop <= peaceMaxTop && snakeMinTop >= peaceMinTop) ||
        (snakeMaxTop <= peaceMaxTop && snakeMaxTop >= peaceMinTop);

    return (isInverticalRange && isInHorizontalRange);
}

async function increaseSnake() {
    const newBody = document.createElement("div");
    newBody.classList.add("body");
    snakeContainer.appendChild(newBody);

    snake[0].style.backgroundColor = "red";
    await sleep(70);
    snake[0].style.backgroundColor = "darkgreen";

    for (let i = 1; i < snake.length; i++) {
        snake[i].style.backgroundColor = "red";
        await sleep(70);
        snake[i].style.backgroundColor = "#34DF00";
    }

}

function gameOver() {
    isGameOver = true;

    snake = snakeContainer.querySelectorAll(".body");

    for (let i = snake.length - 1; i > 0; i--) {
        snakeContainer.removeChild(snake[i]);
    }

    ball.classList.add("display-none");
    gameOverText.classList.remove("display-none");
}

function pauseGame() {

    if (isGameOver) {
        return;
    }

    isPaused = !isPaused;

    if (isPaused) {
        pausedText.classList.remove("display-none");
    } else {
        pausedText.classList.add("display-none");
        const newDirection = isDirection;
        isDirection = "";
        move(newDirection);
    }
}

function resetGame() {
    location.reload();
}

function changeRate() {
    rate++;
    rateText.textContent = "Rate: " + rate;
}

function setBallToGame() {
    const limitTop = limitBody.offsetTop + limitBody.offsetHeight - 50;
    const limitLeft = limitBody.offsetLeft + limitBody.offsetWidth - 50;

    ball.classList.remove("display-none");
    ball.style.top = getRandomPosition(limitTop) + "px";
    ball.style.left = getRandomPosition(limitLeft) + "px";
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomPosition(max) {
    return Math.random() * (max - 50) + 50;
}