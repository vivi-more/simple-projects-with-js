const buttons = ["(", ")", "%", "CE",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"];

const visor = document.getElementById("visor");
const buttonsContainer = document.getElementById("buttons");

addButtons();

document.addEventListener("keydown", (event) => {
    if (buttons.includes(event.key)) {
        addTextToVisor(event.key);
    }

    if(event.keyCode === 13){
        showResultInVisor();
    }

    if(event.keyCode === 8){
        removeNumberFromVisor();
    }

}, false);

function onClickButton(event) {
    console.log(event);
}

function addButtons() {
    buttons.forEach((button) => {
        const newButton = document.createElement("button");
        newButton.textContent = button;
        // newButton.classList.add("");

        if (button === "=") {
            newButton.addEventListener("click", showResultInVisor);
            newButton.classList.add("equal");
        } else if (button === "CE") {
            newButton.addEventListener("click", clearVisor);
        } else {
            if (!isNaN(button) || button === ".") {
                newButton.classList.add("number");
            }
            newButton.addEventListener("click", addTextToVisor.bind(null, button));
        }

        buttonsContainer.appendChild(newButton);
    });
}

function addTextToVisor(text) {
    visor.value += text;
}

function clearVisor() {
    visor.value = "";
    visor.classList.remove("visor-error");
}

function removeNumberFromVisor() {
    visor.value = visor.value.slice(0, -1);
}

function showResultInVisor() {
    if (visor.value) {
        const result = calculator(visor.value);

        if (result !== false) {
            visor.value = result;
        } else {
            visor.value = "ERROR!";
            visor.classList.add("visor-error");
        }
    }
}

function calculator(fn) {
    try {
        return new Function('return ' + fn)();
    } catch (error) {
        return false;
    }
}
