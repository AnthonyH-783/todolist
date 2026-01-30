import {getIcon} from "./domGen.js"
import { dateBtnOnClick } from "./reusable-handlers.js";


function addTaskModal(){
    // Creating main container and separting it into upper and lower
    const form = document.createElement("form");
    const upper = document.createElement("div");
    const lower = document.createElement("div");
    // Adding flex col display
    form.classList.add("flex-col", "add-task");

    // Populating upper div
    const info_div = createTaskInfoDiv();
    upper.appendChild(info_div);

    // Populating lower div
    const submit_section = getTaskSubmissionDiv();
    lower.appendChild(submit_section);

    // Forming container
    form.appendChild(upper);
    form.appendChild(lower);

    return form;

}

function createTaskInfoDiv(){
    const container = document.createElement("div");
    const title = document.createElement("input");
    title.name = "task_title";
    title.placeholder = "Task Title";
    title.required = true;
    title.classList.add("task-title");
    const description = document.createElement("input");
    description.name = "description";
    description.placeholder = "Description";
    description.classList.add("task-description", "pd-top-05rem", "pd-bot-05rem");
    const attributes = getTaskAttrDiv();

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(attributes);
    container.classList.add("flex-col", "align-baseline", "gray-border-bottom", "pd-bot-1rem");

    return container;


}

function getTaskAttrDiv(){
    const container = document.createElement("span");
    const date_btn = document.createElement("button");
    date_btn.type = "button";
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
    date_btn.classList.add("flex-row", "row-gap", "align-center", "date-btn");
    // Adding input pickers
    const date_input = createDateInput();
    const prior_select = createSelectPrior();

    // Adding to container
    container.appendChild(date_input);
    container.appendChild(date_btn);
    container.appendChild(prior_select);
    container.classList.add("flex-row", "justify-baseline", "row-gap", "task-attr");

    container.addEventListener("click",dateBtnOnClick);
   

    return container;
}
function createSelectPrior() {

    const select = document.createElement("select");
    select.required = true;
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
        option.value = label;
        select.appendChild(option);
       
    }


    return select;
}

function createDateInput(){
    const date_input = document.createElement("input");
    date_input.required = true;
    date_input.type = "datetime-local";
    date_input.name = "due";
    date_input.classList.add("hidden");
    return date_input;
}

function getTaskSubmissionDiv(){
    const container = document.createElement("div");
    const select = createTaskDestinationSelect();
    const buttons = document.createElement("div");
    // Populating the buttons div
    const cancel = document.createElement("button");
    cancel.innerHTML = "Cancel";
    const submit = document.createElement("button");
    submit.innerHTML = "Add task";
    buttons.appendChild(cancel);
    buttons.appendChild(submit);
    // Populating contains with select and buttons divs
    container.appendChild(select);
    container.appendChild(buttons);
    // Adding styles
    container.classList.add("flex-row", "space-between", "align-center", "pd-top-1rem");
    buttons.classList.add("flex-row", "align-center", "justify-center", "row-gap");
    cancel.classList.add("cancel-btn");
    submit.classList.add("submit-task");

    return container;

}

function createTaskDestinationSelect(){
    const select = document.createElement("select");
    select.name = "destination";
    const option = document.createElement("option");
    option.innerText = "Inbox";
    option.value = "inbox";
    select.appendChild(option);
    select.classList.add("destination-select");
    return select;

}

function getDateModal(){

}

function addTaskEventListeners(modal){

}

export {getTaskAttrDiv, addTaskModal};
