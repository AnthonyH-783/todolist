import { getIcon, TaskDOM } from "./domGen";
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

    const todos = project.todos;
}

function createNavTab(name){
    const div = document.createElement("div");
    div.classList.add("nav-item");
    div.dataset.name = name;
    const span = getIcon("tag");
    div.appendChild(span);
    div.appendChild(document.createTextNode(name));
}
export {loadSavedProjects, loadProjectNamesToNavbar};