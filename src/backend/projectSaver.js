
function saveProjects(projects){

    for(const project_idx in projects){
        // Serializing project and storing it to local storage
        const project = projects[project_idx];
        const serialized = project.toJSON();
        localStorage.setItem(project_idx, serialized);
    }
}

export {saveProjects};