const noteList = document.querySelector(".list");
const addNoteLi = document.querySelector(".add-note");
const addNoteButton = document.getElementById("btn-add-note");

let listLocalStorage = [];
let countList = -1;

fullNotes();
addNoteButton.addEventListener("click", createNote.bind(null, ""));

function fullNotes() {
    listLocalStorage = JSON.parse(localStorage.getItem("listLocalStorage"));

    if(listLocalStorage !== null){
        listLocalStorage.forEach(text => {
            createNote(text);
        });
    
    }
}

function createNote(text) {
    countList++;

    const newLi = document.createElement("li");
    const newTextArea = document.createElement("textarea");

    newTextArea.setAttribute("name", "comment");
    newTextArea.setAttribute("placeholder", "Write your note here!");
    newTextArea.addEventListener("change", changeTextAreaText.bind(newTextArea, countList));
    newTextArea.value = text;

    newLi.addEventListener("dblclick", deleteNote.bind(newLi, countList));
    newLi.appendChild(newTextArea);

    noteList.insertBefore(newLi, addNoteLi);
}


function deleteNote(position) {
    countList--;

    const li = this;
    noteList.removeChild(li);

    listLocalStorage.splice(position, 1);
    changeLocalStorage();
}

function changeTextAreaText(position) {
    const textareaValue = this.value;
    listLocalStorage[position] = textareaValue;
    changeLocalStorage();
}

function changeLocalStorage() {
    localStorage.setItem("listLocalStorage", JSON.stringify(listLocalStorage));
}