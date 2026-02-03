import { addTodoListOnClick } from "./reusable-handlers";

function addTodoListModal(){
    // Creating main container and separating it into upper and lower
    const form = document.createElement("form");
    form.classList.add("flex-col","row-gap")
    // Creating input
    const input = document.createElement("input");
    input.required = true;
    input.name = "title";
    input.placeholder = "Name this section";
    input.classList.add("section-input", "pd-bot-1rem");


    // Creating buttons
    const lower = document.createElement("div");
    const button_container = document.createElement("div");
    const cancel_btn = document.createElement("button");
    const submit_btn = document.createElement("button");
    cancel_btn.innerHTML = "Cancel";
    submit_btn.innerHTML = "Add section";
    button_container.appendChild(submit_btn);
    button_container.appendChild(cancel_btn);
    lower.appendChild(button_container);

    // Styling lower div
    lower.classList.add("flex-row", "justify-baseline", "align-center");
    button_container.classList.add("flex-row", "justify-baseline", "row-gap", "align-center");
    submit_btn.classList.add("submit-task");
    cancel_btn.classList.add("cancel-btn");

    // Joining containers
    form.appendChild(input);
    form.appendChild(lower);

    // Adding event listeners
    form.addEventListener("click", addTodoListOnClick);

    return form;


}

export {addTodoListModal};