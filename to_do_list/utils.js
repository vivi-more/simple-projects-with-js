export function isNewTextValid(text, list) {

    if (!text) {
        return false;
    }

    let taskExist = thisTaskExist(text, list);

    if (taskExist) {
        return false;
    }

    return true;
}

function thisTaskExist(text, list) {
    const items = checkedList.querySelectorAll("li");

    let taskExist = false;

    for (const item of items) {
        taskExist = item.querySelector("label").textContent === text;
        if (taskExist) { break; }
    }

    return taskExist;
}