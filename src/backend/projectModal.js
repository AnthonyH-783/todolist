import { getIcon } from "./domGen";

function addProjectModal(){
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    form.method = "dialog";

    const upper = document.createElement("div");
    const middle = document.createElement("div");
    const bottom = document.createElement("div");

    // Working on dialog title
    const title = document.createElement("h3");
    title.innerHTML = "Add Project";
    const cross = getIcon("close");
    cross.id = "close-project-modal";
    upper.appendChild(title);
    upper.appendChild(cross);
    upper.classList.add("flex-row", "space-between");

    // Working on middle input
    const label = document.createElement("label");
    
    const input = document.createElement("input");
    input.name = "name";
    input.placeholder = "Project Name";
    middle.appendChild(label);
    middle.appendChild(input);
    middle.classList.add("flex-col");

    // Working on bottom buttons
    const container = document.createElement("div");
    const cancel = document.createElement("button");
    cancel.innerHTML = "Cancel";
    cancel.classList.add("cancel-btn");
    const submit = document.createElement("button");
    submit.innerHTML = "Add Project";
    submit.classList.add("submit-task");
    container.appendChild(cancel);
    container.appendChild(submit);
    bottom.appendChild(container);
    bottom.classList.add("flex-row", "justify-end", "align-center", "row-gap");


    // Constructing the form
    form.appendChild(upper);
    form.appendChild(middle);
    form.appendChild(bottom);
    form.classList.add("flex-col", "pd-1rem");

    dialog.appendChild(form);
    return dialog;
}

export {addProjectModal};