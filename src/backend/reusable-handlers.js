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
    const data = new FormData(form);
    const entries = Array.from(data.entries());
    const key = entries[0][0];
    const value = entries[0][1];
    // Creating todolist Object
    const constructor = {};
    constructor[key] = value;
    // Restoring add buttons
    const container = add_section_btn.parentNode;
    container.removeChild(form);
    restoreTaskAddition(container);
    restoreSectionAddition(container);
    // Creating and appending dom element
    const list = new ToDoList(constructor);
    const list_dom = ToDoListDOM(list);
    add_section_btn.after(list_dom);
    const new_add_section_btn = addSectionButton();
    list_dom.after(new_add_section_btn);
}

function deleteTask(event){
    const node = event.target.closest(".delete");
    if(!node || !node.closest(".task-container")) return;
    const task = node.closest(".task-container");
    task.remove();
}

function deleteTodoList(event){
    const node = event.target.closest(".delete");
    if(!node || node.closest(".task-container")) return;
    const todo_lst = node.closest(".todo-container");
    const add_section_btn = todo_lst.nextSibling;
    add_section_btn.remove();
    todo_lst.remove();
}

function fillFormWithOldData(task_container, form){
    // Gathering old data
    const title = task_container.querySelector("h3").innerText;
    const description = task_container.querySelector("p").innerText;
    const due = task_container.querySelector("span[data-due]").dataset.due;
    const priority = task_container.querySelector("div[data-priority]").dataset.priority;
    // Filling editing form
    const title_input = form.querySelector("input.task-title");
    const description_input = form.querySelector("input.task-description");
    const date_btn = form.querySelector("button.date-btn");
    const priority_input = form.querySelector("select[name=priority]");
    const date_input = form.querySelector("input[type=datetime-local]");

    title_input.value = title;
    description_input.value = description;
    date_input.value = due;
    date_btn.innerText = due;
    priority_input.value = priority;

    form.querySelector(".submit-task").innerHTML = "Edit task";
    
}

function convertTaskFormForEditing(task_container, form){
    // Removing Task Addition
    const submit_btn = form.querySelector(".submit-task");
    const cancel_btn = form.querySelector(".cancel-btn");
    form.removeEventListener("click", addTaskBtnOnClick);
    form.removeEventListener("click", cancelTaskModal);
    submit_btn.addEventListener("click", (evt) => {
        // Changing the data based on current form values
        evt.preventDefault();
        const data = new FormData(form);
        updateTask(task_container, data);
        // Making the task visible again
        task_container.classList.remove("hidden");
        form.remove();
        // Re-enabling dom modifications
        restoreTaskAddition(task_container.closest("#main-body"));
        restoreSectionAddition(task_container.closest("#main-body"));

    });
    cancel_btn.addEventListener("click", () => {
        task_container.classList.remove("hidden");
        form.remove();
        // Re-enabling dom modifications
        restoreTaskAddition(task_container.closest("#main-body"));
        restoreSectionAddition(task_container.closest("#main-body"));
    })
}
function updateTask(task_container, data){
    // Retrieving Task dom elements
    const title = task_container.querySelector("h3");
    const description = task_container.querySelector("p");
    const due = task_container.querySelector("span[data-due]");
    const priority = task_container.querySelector("div[data-priority]");
    
    title.innerText = data.get("title");
    description.innerText = data.get("description");
    due.dataset.due = data.get("due");
    due.innerHTML = format(data.get("due"), "yyyy MMM dd");
    // Updating Priority
    priority.dataset.priority = data.get("priority");
    const map = {"1": "p1", "2": "p2", "3": "p3", "4": "p4"};
    priority.classList.remove("p1", "p2", "p3", "p4");
    priority.classList.add(map[data.get("priority")]);



}

function editTask(event){
    // Edit Button Validation
    const node = event.target.closest(".edit");
    const task_container = event.target.closest(".task-container");
    if(!node || !node.closest(".task-container")) return;
    // Opening Form and filling it with current data
    const form = addTaskModal();
    fillFormWithOldData(task_container, form);
    task_container.after(form);
    // Hiding task container being edited
    task_container.classList.add("hidden");
    // Disabling other dom modifications
    disableTaskAddition(node.closest("#main-body"));
    disableSectionAddition(node.closest("#main-body"));
    // Adding editing event listeners to form
    convertTaskFormForEditing(task_container, form);
}

function editTodoTitle(event){
    // Validation of editing todo title
    const node = event.target.closest(".edit");
    if(!node || node.closest("task-container")) return;
    // Opening input for editing
    const header = node.closest(".todo-header");
    const title = header.querySelector(".todo-title");
    const add_section_btn = header.closest(".todo-container").previousElementSibling;
    console.log(add_section_btn);
    const form = addTodoListModal(add_section_btn);
    const input = form.querySelector("input");
    fillCurrentListTitle(title, input);
    // Hiding current todo list  
    header.classList.add("hidden");
    header.after(form);
    // Blocking dom modifications
    disableTaskAddition(header.closest("#main-body"));
    disableSectionAddition(header.closest("#main-body"));
    // Adding event listeners for editing
    tweakTodoFormForEditing(header, form);
}
function fillCurrentListTitle(header, input){
    // Getting current todo list title
    const title = header.innerHTML;
    // Copying title into input
    input.value = title;
}
function tweakTodoFormForEditing(header, form){
    const submit = form.querySelector(".submit-task");
    const cancel = form.querySelector(".cancel-btn");
    submit.removeEventListener("click", form.submitHandler);
    submit.innerText = "Edit Title";
    submit.addEventListener("click", (evt) => {
        evt.preventDefault();
        const input = form.querySelector("input");
        const value = input.value;
        header.querySelector(".todo-title").innerText = value;
        header.classList.remove("hidden");
        form.remove();
        // Re-enabling dom modifications
        restoreTaskAddition(header.closest("#main-body"));
        restoreSectionAddition(header.closest("#main-body"));
    });
    cancel.removeEventListener("click", cancelTaskModal);
    cancel.addEventListener("click", (evt) => {
        evt.preventDefault();
        header.classList.remove("hidden");
        form.remove();
        // Re-enabling dom modifications
        restoreTaskAddition(header.closest("#main-body"));
        restoreSectionAddition(header.closest("#main-body"));
    })


}

export{dateBtnOnClick, addTaskBtnOnClick, addProjectBtnOnClick, cancelNewProject, openTaskModal,
       cancelTaskModal, openTodoListModal, addTodoListOnClick, deleteTask, deleteTodoList,
       editTask, editTodoTitle};