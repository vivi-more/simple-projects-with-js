const addButton = document.getElementById("add-item-button");
const addInput = document.getElementById("add-item-input");

const checkedList = document.getElementById("checked-list");
const uncheckedList = document.getElementById("unchecked-list");

const itemExemple = document.getElementById("li-exemple");

const alerts = document.querySelector(".alerts");
const emptyTextAlert = alerts.querySelector(".text-empty");
const duplicateTextAlert = alerts.querySelector(".text-exist");

function getOnChangingLi(li) {
    return li.querySelector(".li-on-changing");;
}

function getNormalLi(li) {
    return li.querySelector(".li-normal")
}

function getLabel(li) {
    return getNormalLi(li).querySelector("label");
}

function getCheckbox(li) {
    return getNormalLi(li).querySelector("[type='checkbox']");
}

function getInput(li) {
    return getOnChangingLi(li).querySelector("input");
}

addButton.addEventListener("click", addListNewItem);
addInput.addEventListener("keydown", onEnterClickInAddInput);

function onEnterClickInAddInput(event) {
    if (event.keyCode === 13) {
        addListNewItem();
    }
}

function createListItem(text) {
    const timestamp = Date.now();

    let li = itemExemple.cloneNode(true);

    li.setAttribute("key", timestamp);
    li.setAttribute("id", "checked-" + timestamp);

    let label = getLabel(li);

    label.textContent = text;
    label.addEventListener("click", changeItemToEdit.bind(null, li));

    let input = getInput(li);

    input.setAttribute("value", text);
    input.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            console.log("HEY")
            changeItem.bind(null, li, "change")();
        }
    })

    let checkbox = getCheckbox(li);
    checkbox.addEventListener("change", onChangeCheckBox.bind(null, li, checkbox));

    uncheckedList.insertBefore(li, uncheckedList.firstChild);
}

function changeItemToEdit(li) {
    getNormalLi(li).classList.add("display-none");
    getOnChangingLi(li).classList.remove("display-none");

    getOnChangingLi(li).querySelector("[name='cancel']").addEventListener("click", changeItem.bind(null, li, "cancel"));
    getOnChangingLi(li).querySelector("[name='change']").addEventListener("click", changeItem.bind(null, li, "change"));
}

function onChangeCheckBox(li, checkbox) {
    let label = getLabel(li);

    if (checkbox.checked) {
        uncheckedList.removeChild(li);
        checkedList.insertBefore(li, checkedList.firstChild);
        label.classList.add("checked");
    } else {
        checkedList.removeChild(li);
        uncheckedList.insertBefore(li, uncheckedList.firstChild);
        label.classList.remove("checked");
    }
}

function changeItem(li, type) {
    getNormalLi(li).classList.remove("display-none");
    getOnChangingLi(li).classList.add("display-none");

    let label = getLabel(li);
    let input = getInput(li);

    if (label.textContent === input.value){
        // do nothing
    } else if (type == "change" && isNewTextValid(input.value)) {
        label.textContent = input.value;
    } else if (type == "cancel") {
        input.value = label.textContent;
    }
}

function addListNewItem() {
    const text = addInput.value;

    if (isNewTextValid(text)) {
        createListItem(text);
    }

    addInput.value = "";
}


function isNewTextValid(text) {

    if (!text) {
        alertText(emptyTextAlert);
        return false;
    }

    let taskExist = thisTaskExist(text);

    if (taskExist) {
        alertText(duplicateTextAlert);
        return false;
    }

    return true;
}

function alertText(alert) {
    alerts.classList.remove("display-none");
    alert.classList.remove("display-none");

    setTimeout(function () {
        alerts.classList.add("display-none");
        alert.classList.add("display-none");
    }, 3000);
}

function thisTaskExist(text) {
    let taskExist = false;
    const items1 = checkedList.querySelectorAll("li");
    const items2 = uncheckedList.querySelectorAll("li");
    const items = [...items1, ...items2];

    for (const item of items) {
        taskExist = item.querySelector("label").textContent === text;
        if (taskExist) { break; }
    }

    return taskExist;
}



