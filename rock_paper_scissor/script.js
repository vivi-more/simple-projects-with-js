const rock = document.getElementById("rock-choice");
const paper = document.getElementById("paper-choice");
const scissor = document.getElementById("scissor-choice");

const btnPlay = document.querySelector("button");

const choiceImg = document.getElementById("chosen");
const computerChoice = document.querySelector(".rotate-front");

const rotate = document.querySelector(".rotate");

const wonText = document.querySelector(".won");
const loseText = document.querySelector(".lose");
const tiedText = document.querySelector(".tied");

const choices = [rock, paper, scissor];

rock.addEventListener("click", start);
paper.addEventListener("click", start);
scissor.addEventListener("click", start);
btnPlay.addEventListener("click", play);


function start() {
    removeComputerChoiceChildren();
    computerChoice.textContent = "?";

    changeChoice.bind(this)();
    resetTexts();
}

function resetTexts(){
    wonText.classList.add("display-none");
    loseText.classList.add("display-none");
    tiedText.classList.add("display-none");
}

function changeChoice() {
    const img = this.querySelector("img");
    choiceImg.src = img.src;
    choiceImg.alt = img.alt;
    choiceImg.title = img.title;
}

function play() {
    resetTexts();
    
    load();

    setTimeout(() => {

        removeComputerChoiceChildren();
        const randomImg = chooseRandomImage();
        const newImg = document.createElement("img");

        newImg.alt = randomImg.alt;
        newImg.src = randomImg.src;
        newImg.title = randomImg.title;

        computerChoice.appendChild(newImg);

        showWonOrLose();

    }, 500);

}

function showWonOrLose() {
    const userImg = choiceImg;
    const computerImg = computerChoice.querySelector("img");

    console.log(computerImg.title);

    if (userImg.title === computerImg.title) {
        tiedText.classList.remove("display-none");
    } else if (
        (userImg.title === "rock-choice" && computerImg.title === "paper-choice") ||
        (userImg.title === "paper-choice" && computerImg.title === "scissor-choice") ||
        (userImg.title === "scissor-choice" && computerImg.title === "rock-choice")) {

        loseText.classList.remove("display-none");

    } else if (
        (userImg.title === "rock-choice" && computerImg.title === "scissor-choice") ||
        (userImg.title === "paper-choice" && computerImg.title === "rock-choice") ||
        (userImg.title === "scissor-choice" && computerImg.title === "paper-choice")) {
        wonText.classList.remove("display-none");
    }
}

function removeComputerChoiceChildren() {
    computerChoice.removeChild(computerChoice.firstChild);
}

function chooseRandomImage() {
    const chosen = Math.floor(Math.random() * 3);
    return choices[chosen].querySelector("img");
}

function load() {
    rotate.classList.add("flip");

    setTimeout(() => {
        rotate.classList.remove("flip");
    }, 500);
}