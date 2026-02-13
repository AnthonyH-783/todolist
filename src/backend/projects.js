import { Project } from "./project";

class Projects{
    #list = [];

    constructor(saved_projects){
        if(saved_projects){
            this.#list.push(...saved_projects);
        }
        else{
            this.#list = [];
        }
    }
    isEmpty(){
        return this.#list.length === 0;
    }
    findById(project_id){
        if(!project_id || typeof project_id !== "string") return;
        const project = this.#list.find((el) => el.project_id === project_id);
        return project;
    }
    add(project){
        if(!project || !project instanceof Project) return;
        this.#list.push(project);
    }
    remove(project){
        if(!project || !project instanceof Project) return;
        const index = this.#list.findIndex((el) => el === project);
        this.#list.splice(index, 1);
    }
    removeById(project_id){
        if(!project_id || typeof project_id !== "string") return;
            const index = this.#list.findIndex((el) => el.project_id === project_id);
            this.#list.splice(index, 1);
    }
}

export {Projects};