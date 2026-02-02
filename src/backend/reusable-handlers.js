import {parse, format} from "date-fns";
import { loadProjectDOM } from "./projectLoader";
import { Project } from "./project";
import { addTaskModal } from "./taskModal";
import { Task } from "./task";
import { TaskDOM } from "./domGen";


function dateBtnOnClick(event) {
    // Any element within the date button
    const node = event.target.closest(".date-btn");
    if (!node) return;
    const date_picker = node.previousElementSibling;
    // Apply data changes when data picker changes values
    // Event listener is needed because of asyncronous behavior of date picker
    if (!date_picker.dataset.bound) {
        date_picker.addEventListener("change", () => {
            const date = parse(date_picker.value, "yyyy-MM-dd'T'HH:mm", new Date());
            const formated = format(date, "yyyy MMM dd, h:mm aaaa");
            node.textContent = formated;
            node.dataset.value = date;
        });
        date_picker.dataset.bound = "true";
    }
    // Show date picker
    date_picker.showPicker();
}

function addTaskBtnOnClick(event){
    // Any element within the add task button
    event.preventDefault();
    const node = event.target.closest(".submit-task");
    if(!node) return;
    const form = node.closest("form");
    const data = new FormData(form);
    const entries = data.entries();
    // Creating Task Object
    const constructor = {};
    for(const pair of entries){
        const key = pair[0];
        let value = pair[1];
        value = (key === "priority") ? parseInt(value) : value;
        constructor[key] = value;
    }
    const task = new Task(constructor);
    // Selecting right container 
    const is_bound = node.closest(".todo-container") !== null;
    const container = (is_bound) ? node.closest("todo-container") : node.closest("#main-body");
    console.log(container);
    // Adding Task DOM and removing modal
    container.removeChild(form);
    const task_dom = TaskDOM(task);
    container.appendChild(task_dom);

}

function addProjectBtnOnClick(event){
    // Validation
    const button = event.target;
    if(!button || button.id !== "add-project") return;
    // Selecting the dialog and the form
    const dialog = document.querySelector("dialog");
    const form = dialog.querySelector("form");
    // Adding a listener for form submission
    if(!form.dataset.bound){
        form.addEventListener("submit", () => {
            const data = new FormData(form);
            const entries = Array.from(data.entries());
            const title = entries[0][1];
            const project = new Project({title});
            form.reset();
            const container = button.closest("body").querySelector("#main-body");
            loadProjectDOM(project, container);

        });
        form.dataset.bound = true;
    }
    // Show modal after listener has been set
    dialog.showModal();
    
}

function cancelNewProject(event){
    const node = event.target;
    if(!node || (!node.classList.contains("cancel-btn") && node.id !== "close-project-modal")) return;
    console.log("project cancelled");
    const dialog = document.querySelector("dialog");
    const form = dialog.querySelector("form");
    form.reset();
    dialog.close();
}

function openTaskModal(event){
    const node = event.target;
    if(!node || !node.closest(".add-btn-lst")) return;
    // Selecting right container 
    const is_bound = node.closest(".todo-container") !== null;
    const container = (is_bound) ? node.closest("todo-container") : node.closest("#main-body");
    // Opening modal
    const modal = addTaskModal();
    container.appendChild(modal);
}

function cancelTaskModal(event){
    const node = event.target;
    if(!node || !node.classList.contains("cancel-btn")) return;
    const modal = node.closest("form");
    modal.remove();
}

export{dateBtnOnClick, addTaskBtnOnClick, addProjectBtnOnClick, cancelNewProject, openTaskModal, cancelTaskModal};