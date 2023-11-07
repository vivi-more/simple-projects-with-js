const timerText = document.querySelector(".numbers");
const buttonStart = document.querySelector(".start");
const buttonStop = document.querySelector(".stop");
const buttonReset = document.querySelector(".reset");

let hours = 0;
let minutes = 0;
let seconds = 0;
let tens = 0;
let Interval;

let a;
let b;

buttonStart.addEventListener("click", start);
buttonStop.addEventListener("click", stop);
buttonReset.addEventListener("click", reset);

function addHours() {
    hours++;
}

function addMinutes() {
    if (minutes >= 59) {
        minutes = 0;
        addHours();
    } else {
        minutes++;
    }
}

function addSeconds() {
    if (seconds >= 59) {
        seconds = 0;
        addMinutes();
    } else {
        seconds++;
    }
}

function addTens() {
    if (tens >= 99) {
        tens = 0;
        addSeconds();
    } else {
        tens++;
    }

    setText();
}

function setText() {
    timerText.textContent = transformText(hours) + ":" + transformText(minutes) +
        ":" + transformText(seconds) + ":" + transformText(tens);
}

function start() {
    clearInterval(Interval);
    Interval = setInterval(addTens, 10);
}

function stop() {
    clearInterval(Interval);
}

function reset() {
    hours = minutes = seconds = tens = 0;
    setText();
}

function transformText(number) {
    return number < 10 ? '0' + number : number;
}