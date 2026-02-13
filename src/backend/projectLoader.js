import {TaskDOM, ToDoListDOM, createProjectTitle, createAddTaskButton, addSectionButton, getIcon} from "./domGen";
import { Project } from "./project";

/**
 * 
 * @param {String} selection 
 * @param {Array} list 
 */
function loadSavedProjects(){
    const projects = [];
    for(const index = 0; index < localStorage.length; index++){
        const key = localStorage.key(index);
        const value = localStorage.getItem(key);
        // Extracting project attributes
        const import_obj = JSON.parse(value);
        const title = import_obj.title;
        const todos = import_obj.todos;
        const unorganized = import_obj.unorganized;
        // Creating Project object
        const project = new Project({title, todos, unorganized});
        projects.push(project);
    }
    return projects; 
}

function loadAllProjectsToNavbar(projects, nav){

    for(const project of projects){
        addProjectToNavbar(project, nav)
    }
}

function addProjectToNavbar(project, nav){
    const {project_id, title} = project;
    const tab = createProjectTab(project_id, title);
    nav.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
    tab.addEventListener("click", (evt) => {
        const EVENT = "project:select";
        //nav.querySelector(".active").classList.remove("active");
        const node = evt.target.closest(".nav-item");
        const project_id = node.dataset.project_id;
        PubSub.publish(EVENT, project_id);


    })
    nav.appendChild(tab);
}
function toggleTab(tab){
    tab.classList.toggle("active");
}



function loadProjectDOM(project, container){

    // Flushing current content
    container.querySelector(".project-dom").remove();
    const project_dom = document.createElement("div");
    project_dom.classList.add("project-dom");
    project_dom.dataset.project_id = project.project_id;
    // Extracting project data
    const title = project.title;
    const todos = project.todos;
    const unorganized = project.unorganized_tasks;
  

    // Creating title
    const header = createProjectTitle(title);
    project_dom.appendChild(header);
    // Creating button for adding unorganized tasks
    const add_unorganized_btn = createAddTaskButton();
    project_dom.appendChild(add_unorganized_btn);
    // Listing any active unorganized tasks
    for(const task of unorganized){
        const dom = TaskDOM(task);
        project_dom.appendChild(dom);
    }
    // Listing any active todo lists
    for(const list of todos){
        const dom = ToDoListDOM(list);
        project_dom.appendChild(dom);
    }
    // Add Section Option
    const add_section_btn = addSectionButton();
    project_dom.appendChild(add_section_btn);

    container.appendChild(project_dom);

}


function createProjectTab(project_id, title){

    const tab_container = document.createElement("div");
    const span = getIcon("tag");
    const text = document.createTextNode(title);
    
    tab_container.dataset.project_id = project_id;
    tab_container.classList.add("nav-item");
    tab_container.appendChild(span);
    tab_container.appendChild(text);
    // Delete button
    const remove = getIcon("delete");
    const remove_container = document.createElement("div");
    remove_container.appendChild(remove);
    tab_container.appendChild(remove_container);
    remove_container.classList.add("project-delete");
    
    remove.addEventListener("click", () => {
        const EVENT = "project:delete";
        PubSub.publish(EVENT, project_id);
        tab_container.previousElementSibling.classList.add("active");
        tab_container.remove();

    });


    return tab_container;

}
export {loadSavedProjects, addProjectToNavbar, loadAllProjectsToNavbar, loadProjectDOM};