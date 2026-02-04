import "../styles/dynamic.css";
import {Task} from "./task";
import {format } from "date-fns";
import {openTaskModal} from "./reusable-handlers";
import { openTodoListModal } from "./reusable-handlers";
import { addTodoListModal } from "./todoModal";

/**
 * Factories that generate commonly used HTML structures
 */

/**
 * Generates the DOM elements for a task
 * @param {Task} task 
 */
function TaskDOM(task){
    // Creating main container
    const container = document.createElement("div");
    // Creating drag indicator
    const drag_indicator = document.createElement("span");
    drag_indicator.classList.add("material-symbols-outlined", "drag", "hidden");
    drag_indicator.innerText = "drag_indicator";
    container.appendChild(drag_indicator);
    // Creating circle / checkcircle
    const circle = document.createElement("div");
    const checked_circle = document.createElement("div");
    const priority = "p" + task.priority;
    circle.classList.add("material-symbols-outlined", priority, "circle-container", "flex-row", "align-center", "justify-center");
    checked_circle.classList.add("material-symbols-outlined");
    circle.innerText = "circle";
    
    checked_circle.innerText = "check_circle";
    // Creating title, description, and due date
    const h3 = document.createElement("h3");
    h3.innerText = task.title;
    const description = document.createElement("p");
    description.innerText = task.description;
    const date = document.createElement("div");
    date.appendChild(getIcon("calendar_clock"));
    const span = document.createElement("span");
    const due_date = format(task.due, "MMM do y")
    span.innerText = due_date;
    date.classList.add("flex-row", "align-center");
    date.appendChild(span);
    // Creating paritionning divs
    const left_div = document.createElement("div");
    const right_div = document.createElement("div");
    // Populating internal divs
    // Info Column
    const info = document.createElement("div");
    info.appendChild(h3);
    info.appendChild(description);
    info.appendChild(date);
    info.classList.add("flex-col", "justify-center", "align-baseline");
    // Constructing left div
    left_div.appendChild(circle);
    left_div.appendChild(info);
    // Constructing right div
    right_div.appendChild(getIcon("edit"));
    right_div.appendChild(getIcon("more_horiz"));
    // Adding left and right to container
    container.appendChild(left_div);
    container.appendChild(right_div);

    // Adding styles to container and internal divs
    container.classList.add("task-container");
    left_div.classList.add("flex-row", "row-gap");
    right_div.classList.add("flex-row", "row-gap", "hidden", "edit-task");

    return container;

}

function getIcon(name){
    const span = document.createElement("span");
    span.classList.add("material-symbols-outlined");
    span.innerText = name;
    return span;
}

function mapPriorToColor(priority){

    switch(priority){
        case "p1":
            return "red";
        case "p2":
            return "orange";
        case "p3":
            return "blue";
        case "p4":
            return "gray";
        default:
            return "gray";
    }
}

function setTaskPrior(circle, priority){

    circle.classList.remove("p1", "p2", "p3", "p4");
    circle.classList.add(priority);

}

function createProjectTitle(name){
    const header = document.createElement("h1");
    header.innerText = name;
    header.classList.add("project-header");
    return header;
}

function ToDoListDOM(list){
    // Creating main containers
    const container = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    // Working on header
    const chevron = getIcon("keyboard_arrow_down");
    chevron.classList.add("chevron-down");
    const header_text = document.createElement("span");
    header_text.innerText = list.title;
    // Creating options icon
    const options = getIcon("more_horiz");
    // Constructing header
    header.appendChild(chevron);
    header.appendChild(header_text);
    header.appendChild(options);
    header.classList.add("todo-header");
    // Constructing body
    for(const obj of list.tasks){
        // Iterating through array of tasks
        const title = obj.title;
        const description = obj.description
        const priority = obj.priority;
        const due = obj.due;
        const task = new Task({title,description, priority, due});
        console.log(task.title);
        const task_dom = TaskDOM(task);
        body.appendChild(task_dom);
    }
    const add_button = createAddTaskButton();
    body.appendChild(add_button);
    body.classList.add("todo-body");

    // Constructing container
    container.appendChild(header);
    container.appendChild(body);
    container.classList.add("todo-container");


    return container;




}

function createTodolistTitle(name){

}

function createAddTaskButton(){
    const button = document.createElement("button");
    button.classList.add("add-btn-lst");
    const icon = getIcon("add_2");
    icon.style.color = "#d33322";
    button.appendChild(icon);
    const text = document.createElement("span");
    text.innerText = "Add Task";
    text.style.color = "gray";
    button.appendChild(text);

    button.addEventListener("click", openTaskModal);

    return button;

}

function addSectionButton(){
    const add_section_btn = document.createElement("div");
    add_section_btn.className ="add-section-container";
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    span.innerText = "Add Section";
    h3.appendChild(span);
    span.classList.add("add-section-span");
    h3.classList.add("add-section-h3");
    add_section_btn.appendChild(h3);
    add_section_btn.addEventListener("click", (evt)    => {
        openTodoListModal(add_section_btn); // Event listener handles dynamic content
    });
    return add_section_btn;
}

export {TaskDOM, ToDoListDOM, createProjectTitle, createAddTaskButton, addSectionButton, getIcon};
