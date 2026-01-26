import "../styles/dynamic.css";
import {Task} from "./task";
import {format } from "date-fns";

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
    circle.classList.add("material-symbols-outlined", task.priority, "circle-container", "flex-row", "align-center", "justify-center");
    checked_circle.classList.add("material-symbols-outlined");
    circle.innerText = "circle";
    
    checked_circle.innerText = "check_circle";
    // Creating title, description, and due date
    const h3 = document.createElement("h3");
    h3.innerText = task.info;
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

function toDoListDOM(list){
    // Creating main containers
    const container = document.createElement("div");
    const header = document.createElement("div");
    const body = document.createElement("div");
    // Working on header
    const chevron = getIcon("chevron_right");
    chevron.classList.add("chevron-right");
    const header_text = document.createElement("span");
    header_text.innerText = list.name;
    // Creating options icon
    const options = getIcon("more-horiz");
    

}

function createTodolistTitle(name){

}

function createAddTaskButton(){

}

export {TaskDOM};
