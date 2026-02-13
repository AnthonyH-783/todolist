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
import { load, loadProjectDOM } from "./backend/projectLoader.js";
import { addProjectModal } from "./backend/projectModal.js";
import { addProjectBtnOnClick, cancelNewProject } from "./backend/reusable-handlers.js";
import { loadSavedProjects } from "./backend/projectLoader.js";
import {Projects} from "./backend/projects.js";





(function ScreenController(){

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
    const saved_projects = loadSavedProjects();
    const projects = new Projects(saved_projects);
    const home = setUpHome();
    home.forceIdToDefault();
    if(projects.isEmpty()) projects.add(home);
    // Subsccribing to project addition
    const PROJECT_ADD = "project:add";
    const projectAddSubscriber = function(event, data){
        projects.add(data);
        
    }
    const token_add = PubSub.subscribe(PROJECT_ADD, projectAddSubscriber);
    // Subscribing to project deletion
    const PROJECT_DELETE = "project:delete";
    const projectRemoveSubscriber = function(event, data) {
        if(typeof data === "string"){
            projects.removeById(data);
            // Loading another project
            const current_id = project_tabs.querySelector(".active").dataset.project_id;
            const project = projects.findById(current_id);
            loadProjectDOM(project, main);
            
        }

    }
    const token_remove = PubSub.subscribe(PROJECT_DELETE, projectRemoveSubscriber);

    const PROJECT_SELECT = "project:select";
    const projectSelectSubscriber = function(event, data){
        if(typeof data === "string"){
          const current_id = project_tabs.querySelector(".active").dataset.project_id;
          const project = projects.findById(data);
          loadProjectDOM(project, main);
        }

    }

    const token_select = PubSub.subscribe(PROJECT_SELECT, projectSelectSubscriber);
    
    const TASK_ADD = "task:add";
    const taskAddSubscriber = function(event, data){
        const {task, list_id, project_id} = data;
        const project = projects.findById(project_id);
        project.addTaskToList(task, list_id);
    }
    const token_add_task = PubSub.subscribe(TASK_ADD, taskAddSubscriber);

    const TASK_DELETE = "task:delete";
    const taskDeleteSubscriber = function(event, data){
        const {task_id, list_id, project_id} = data;
        const project = projects.findById(project_id);
        project.removeTaskFromList(task_id, list_id);
    }
    const token_delete_task = PubSub.subscribe(TASK_DELETE, taskDeleteSubscriber);
    
    const TASK_EDIT = "task:edit";
    const taskEditSubscriber = function(event, data){
        const {task_info, list_id, project_id} = data;
        const project = projects.findById(project_id);
        project.editTask(task_info, list_id);
        console.log(project);
    }
    const token_edit_task = PubSub.subscribe(TASK_EDIT, taskEditSubscriber);


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


function setUpHome(){
    const home = new Project({title: "Home"});
    return home;
    
}

