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

function loadProjectNamesToNavbar(projects, nav){

    for(const {title} of projects){
        const tab = createNavTab(title);
        nav.appendChild(tab);
    }
}

function loadProjectDOM(project, container){

    // Extracting project data
    const title = project.title;
    const todos = project.todos;
    const unorganized = project.unorganized_tasks;
    console.log(title, todos, unorganized, typeof unorganized);

    // Creating title
    const header = createProjectTitle(title);
    container.appendChild(header);
    // Creating button for adding unorganized tasks
    const add_unorganized_btn = createAddTaskButton();
    container.appendChild(add_unorganized_btn);
    // Listing any active unorganized tasks
    for(const task of unorganized){
        const dom = TaskDOM(task);
        container.appendChild(dom);
    }
    // Listing any active todo lists
    for(const list of todos){
        const dom = ToDoListDOM(list);
        container.appendChild(dom);
    }
    // Add Section Option
    const add_section_btn = addSectionButton();
    container.appendChild(add_section_btn);

}

function createNavTab(name){
    const div = document.createElement("div");
    div.classList.add("nav-item");
    div.dataset.name = name;
    const span = getIcon("tag");
    div.appendChild(span);
    div.appendChild(document.createTextNode(name));
}
export {loadSavedProjects, loadProjectNamesToNavbar, loadProjectDOM};