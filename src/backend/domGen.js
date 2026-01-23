import "../styles/dynamic.css";
import {Task} from "./task";

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
    drag_indicator.classList.add("material-symbols-outlined", "drag");
    drag_indicator.innerText = "drag_indicator";
    // Creating circle / checkcircle
    const circle = document.createElement("span");
    const checked_circle = document.createElement("span");
    circle.classList.add("material-symbols-outlined");
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
    span.innerText = task.due;
    date.appendChild(span);
    // Creating paritionning divs
    const left_div = document.createElement("div");
    const right_div = document.createElement("div");
    // Populating internal divs
    const info = document.createElement("div");
    info.appendChild(h3);
    info.appendChild(description);
    info.appendChild(date);
    left_div.appendChild(circle);
    left_div.appendChild(info);
    right_div.appendChild(getIcon("edit"));
    right_div.appendChild(getIcon("more_horiz"));

    container.appendChild(left_div);
    container.appendChild(right_div);

    // Adding styles
    container.classList.add("task-container");
    left_div.classList.add("flex-row", "row-gap");
    right_div.classList.add("flex-row", "row-gap");

    return container;

}

function getIcon(name){
    const span = document.createElement("span");
    span.classList.add("material-symbols-outlined");
    span.innerText = name;
    return span;
}

export {TaskDOM};
