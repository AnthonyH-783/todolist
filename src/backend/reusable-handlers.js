import {parse, format} from "date-fns";
import { loadProjectDOM } from "./projectLoader";
import { Project } from "./project";
import { addTaskModal } from "./taskModal";
import { addTodoListModal } from "./todoModal.js";
import { Task } from "./task";
import { TaskDOM, ToDoListDOM, addSectionButton} from "./domGen";
import { ToDoList } from "./todo.js";


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
    // Creating Task Object
    const task = new Task(constructor);
    const task_dom = TaskDOM(task);
    // Selecting right container 
    const project_container = node.closest("#main-body");
    const is_bound = node.closest(".todo-container");
    // Adding task to right container
    if(!is_bound){
        addTaskInProject(project_container, task_dom);
    }
    else{
        const todo_container = is_bound.querySelector(".todo-body");
        addTaskInTodoList(todo_container, task_dom);
    }
    // Restoring add task button
    restoreSectionAddition(project_container);
    restoreTaskAddition(project_container);
    // Removing the form
    form.remove();
}

function addTaskInTodoList(todo_container, task_dom){
    const add_btn = todo_container.querySelector(".add-btn-lst");
    todo_container.insertBefore(task_dom, add_btn);
    

}

function addTaskInProject(project_container, task_dom){
    const add_btn = project_container.querySelector(".add-btn-lst");
    add_btn.after(task_dom);
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
    const node = event.target.closest(".add-btn-lst"); // Add task button
    if(!node || !node.closest(".add-btn-lst")) return;
    // Selecting right container 
    const is_bound = node.closest(".todo-container") !== null;
    const container = (is_bound) ? node.closest(".todo-container") : node.closest("#main-body");
    // Opening modal
    const modal = addTaskModal();
    container.appendChild(modal);
    // Hiding the add options
    const button = node.closest("button");
    button.classList.add("invisible");
    const main_container = node.closest("#main-body");
    disableTaskAddition(main_container);
    disableSectionAddition(main_container);
    
}

function cancelTaskModal(event){
    const node = event.target;
    const project_container = node.closest("#main-body");
    if(!node || !node.classList.contains("cancel-btn")) return;
    const modal = node.closest("form");
    restoreSectionAddition(project_container);
    restoreTaskAddition(project_container);
    modal.remove();
}



function openTodoListModal(add_section_btn){
    // Validating node selection
    if(!add_section_btn || !add_section_btn.classList.contains("add-section-container")) return;
    // Adding the modal after the add section button
    const input_form = addTodoListModal(add_section_btn);
    console.log(add_section_btn);
    add_section_btn.after(input_form);
    // Hiding the add options
    const container = add_section_btn.closest("#main-body");
    disableTaskAddition(container);
    disableSectionAddition(container);

}

function disableTaskAddition(container){

    const buttons = container.querySelectorAll(".add-btn-lst");
    buttons.forEach((button) => {
        button.classList.add("invisible");
    });

}
function disableSectionAddition(container){

    const buttons = container.querySelectorAll(".add-section-container");
    buttons.forEach((button) => {
        button.classList.add("invisible");
    });

}
function restoreTaskAddition(container){

    const buttons = container.querySelectorAll(".add-btn-lst");
    buttons.forEach((button) => {
        button.classList.remove("invisible");
    });


}
function restoreSectionAddition(container){
    const buttons = container.querySelectorAll(".add-section-container");
    buttons.forEach((button) => {
        button.classList.remove("invisible");
    });

}

function addTodoListOnClick(form, add_section_btn){
   // Any element within the add section button
   
    if(!add_section_btn || !add_section_btn.classList.contains("add-section-container")) return;
    console.log("here");
    const data = new FormData(form);
    const entries = Array.from(data.entries());
    const key = entries[0][0];
    const value = entries[0][1];
    // Creating todolist Object
    const constructor = {};
    constructor[key] = value;
    console.log(Object.keys(constructor));
    console.log(Object.values(constructor));
    // Restoring add buttons
    const container = add_section_btn.parentNode;
    container.removeChild(form);
    restoreTaskAddition(container);
    restoreSectionAddition(container);
    // Creating and appending dom element
    const list = new ToDoList(constructor);
    const list_dom = ToDoListDOM(list);
    console.log("I reached this point");
    console.log(list_dom);
    add_section_btn.after(list_dom);
    const new_add_section_btn = addSectionButton();
    list_dom.after(new_add_section_btn);



}

export{dateBtnOnClick, addTaskBtnOnClick, addProjectBtnOnClick, cancelNewProject, openTaskModal,
     cancelTaskModal, openTodoListModal, addTodoListOnClick};