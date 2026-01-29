import {getIcon} from "./domGen.js"
function addTaskModal(){
    // Creating main container and separting it into upper and lower
    const container = document.createElement("form");
    const upper = document.createElement("div");
    const lower = document.createElement("div");
    // Adding classes to container
    container.classList.add("flex-col");
    upper.classList.add("flex-col", "align-baseline", "gray-border-bottom");
    lower.classList.add("flex-row", "space-between");
    // Populating upper div
    const title = document.createElement("input");
    title.placeholder = "Task Title";
    const description = document.createElement("input");
    description.placeholder = "description";
    const attributes = document.createElement("input");

    // Adding styles to upper div
    title.classList.add("new-task-title");
}

function getTaskAttrDiv(){
    const container = document.createElement("span");
    const date_btn = document.createElement("button");
    const priority_btn = document.createElement("button");
    const date_picker = document.createElement("input");
    date_picker.type = "datetime-local";
    const priority_picker = document.createElement("input");
    priority_picker.type = "radio";
    // Button content (icon + text)
    const date_icon = getIcon("event");
    const flag_icon = getIcon("flag");
    const date = document.createElement("span");
    const priority = document.createElement("span");
    date.innerHTML = "Date";
    priority.innerHTML = "Priority";
    date_btn.appendChild(date_icon);
    date_btn.appendChild(date);
    priority_btn.appendChild(flag_icon);
    priority_btn.appendChild(priority);

    // Adding classes
    container.classList.add("flex-row", "row-gap");
    date_btn.classList.add("flex-row", "row-gap", "date-btn");
    priority_btn.classList.add("flex-row", "row-gap");
    // Adding input pickers
    const date_input = createDateInput();
    const radio_input = createRadioInputPrior();

    // Adding to container
    container.appendChild(date_input);
    container.appendChild(date_btn);
    container.appendChild(radio_input);
    container.appendChild(priority_btn);

    return container;
}
function createRadioInputPrior(){
    const container = document.createElement("div");
    const rd1 = document.createElement("input");
    const rd2 = document.createElement("input");
    const rd3 = document.createElement("input");
    const rd4 = document.createElement("input");
    rd1.type = "radio";
    rd2.type = "radio";
    rd3.type = "radio";
    rd4.type = "radio";
    rd1.name = "priority";
    rd2.name = "priority";
    rd3.name = "priority";
    rd4.name = "priority";
    rd1.value = "p1";
    rd2.value = "p2";
    rd3.value = "p3";
    rd4.value = "p4";
    container.appendChild(rd1);
    container.appendChild(rd2);
    container.appendChild(rd3);
    container.appendChild(rd4);

    container.classList.add("hidden");

    return container; 
}
function createDateInput(){
    const date_input = document.createElement("input");
    date_input.type = "datetime-local";
    date_input.name = "due";
    date_input.classList.add("hidden");
    return date_input;
}

function getDateModal(){

}

function addTaskEventListeners(modal){

}
