import {getIcon} from "./domGen.js"
import { dateBtnOnClick, priorBtnOnClick } from "./reusable-listeners.js";


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
    const attributes = getTaskAttrDiv();

    upper.appendChild(title);
    upper.appendChild(description);
    upper.appendChild(attributes);

    // Populating lower div


    // Adding styles to upper div
    title.classList.add("new-task-title");
}

function getTaskAttrDiv(){
    const container = document.createElement("span");
    const date_btn = document.createElement("button");
    const date_picker = document.createElement("input");
    date_picker.type = "date";
    date_picker.value = "2018-06-12T19:30";
    const priority_picker = document.createElement("input");
    priority_picker.type = "radio";
    // Button content (icon + text)
    const date_icon = getIcon("event");
    const date = document.createElement("span");
    date.innerHTML = "Date";
    date_btn.appendChild(date_icon);
    date_btn.appendChild(date);


    // Adding classes
    container.classList.add("flex-row", "row-gap");
    date_btn.classList.add("flex-row", "row-gap", "align-center", "date-btn");
    // Adding input pickers
    const date_input = createDateInput();
    const prior_select = createSelectPrior();

    // Adding to container
    container.appendChild(date_input);
    container.appendChild(date_btn);
    container.appendChild(prior_select);

    container.addEventListener("click",dateBtnOnClick);
    container.addEventListener("click", priorBtnOnClick);

    return container;
}
function createSelectPrior() {

    const select = document.createElement("select");
    select.name = "priority";

    const priorities = {
    1: { label: "Priority 1", flag: "🔴", color: "red" },
    2: { label: "Priority 2", flag: "🟠", color: "orange" },
    3: { label: "Priority 3", flag: "🔵", color: "blue" },
    4: { label: "Priority 4", flag: "⚪", color: "gray" }
};

    const option = document.createElement("option");
    option.disabled = true;
    option.selected = true;
    option.textContent = "🚩 Priority";
    select.appendChild(option);
    for (const priority in priorities) {
        const flag = priorities[priority].flag;
        const label = priorities[priority].label;

        const option = document.createElement("option");
        option.innerText = flag + " " + label;
        select.appendChild(option);
       
    }


    return select;
}

function createDateInput(){
    const date_input = document.createElement("input");
    date_input.type = "datetime-local";
    date_input.name = "due";
    date_input.classList.add("hidden");
    return date_input;
}

function getTaskSubmissionDiv(){
    const container = document.createElement("div");
    const select = createTaskDestinationSelect();

}

function createTaskDestinationSelect(){

}

function getDateModal(){

}

function addTaskEventListeners(modal){

}

export {getTaskAttrDiv};
