import PubSub from "pubsub-js";
import "./styles/main-page.css";
import {Task} from "./backend/task.js";
import { ToDoList } from "./backend/todo.js"; 
import { Project } from "./backend/project.js";
import { TaskDOM, ToDoListDOM } from "./backend/domGen.js";
import { compareAsc, format } from "date-fns";
import { taskMouseEnter, taskMouseLeave, circleOnClick, onChevronClick,
} from "./backend/handlers.js";
import { addTaskModal} from "./backend/modals.js";
import "./styles/dynamic.css";
import { load } from "./backend/projectLoader.js";



(async function ScreenController(){

    // Getting all initial DOM Selections
    const main = document.getElementById("main-body");
    const nav = document.querySelector("nav");
    const nav_body = nav.querySelector("#nav-body");
    const project_tabs = nav.querySelector("#projects");
    const main_header = document.getElementById("main-header");
    const url_node = main_header.querySelector("div>p");

    // Initializing Required Data Structures
    const json = await import("./json/proj-001.json");
    const lists = json.lists;
    const todo = lists[0];
    const tododom = ToDoListDOM(todo);
    const test = addTaskModal();
    main.appendChild(tododom);
    
    
    
    


    // Rendering DOM given current data structures



    // Adding Event Listeners
    main.addEventListener("click", circleOnClick);
    main.addEventListener('mouseover', taskMouseEnter);
    main.addEventListener('click', taskMouseEnter);
    main.addEventListener("mouseout", taskMouseLeave);
    main.addEventListener("click", onChevronClick);

    


})();

function initializeProjects(){
    const projects = new Array();
    
}