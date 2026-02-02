import PubSub from "pubsub-js";
import "./styles/main-page.css";
import {Task} from "./backend/task.js";
import { ToDoList } from "./backend/todo.js"; 
import { Project } from "./backend/project.js";
import { TaskDOM, ToDoListDOM } from "./backend/domGen.js";
import { compareAsc, format } from "date-fns";
import { taskMouseEnter, taskMouseLeave, circleOnClick, onChevronClick,
} from "./backend/handlers.js";
import { addTaskModal} from "./backend/taskModal.js";
import "./styles/dynamic.css";
import { load } from "./backend/projectLoader.js";
import { addProjectModal } from "./backend/projectModal.js";
import { addProjectBtnOnClick, cancelNewProject } from "./backend/reusable-handlers.js";
import { loadSavedProjects } from "./backend/projectLoader.js";




(async function ScreenController(){

    // Getting all initial DOM Selections
    const main = document.getElementById("main-body");
    const nav = document.querySelector("nav");
    const nav_body = nav.querySelector("#nav-body");
    const project_tabs = nav.querySelector("#projects");
    const add_prjt_btn = project_tabs.querySelector("#add-project");
    const main_header = document.getElementById("main-header");
    const url_node = main_header.querySelector("div>p");
    const test = addProjectModal();
    main.appendChild(test);
    const dialog = document.querySelector("dialog");
    const form = dialog.querySelector("form");

    // Initializing Required Data Structures
    const projects = [];
    const saved_projects = loadSavedProjects();
    projects.concat(saved_projects);
    
    
    
    


    // Rendering DOM given current data structures



    // Adding Event Listeners
    main.addEventListener("click", circleOnClick);
    main.addEventListener('mouseover', taskMouseEnter);
    main.addEventListener('click', taskMouseEnter);
    main.addEventListener("mouseout", taskMouseLeave);
    main.addEventListener("click", onChevronClick);
    add_prjt_btn.addEventListener("click", addProjectBtnOnClick);
    form.addEventListener("click", cancelNewProject);

    


})();

function initializeProjects(){
    const projects = new Array();
    
}