import { Task } from "./task.js";
import {ToDoList} from "./todo.js";

class Project{
    #title = "";
    #to_dos = [];
    #unorganized_tasks = [];
    #project_id;


    constructor({title, todos, unorganized} = {}) {
        this.title = title;
        this.todos = todos;
        this.unorganized_tasks = unorganized;
        this.#project_id = this.#uid();
        
        
    }

    forceIdToDefault(){
        this.#project_id = "default";
    }
    /**
     * Creates a unique identifier based on creation date and random numbers
     * @returns 
     */
   #uid(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    get project_id(){
        return this.#project_id;
    }
    
    get title(){
        return this.#title;
    }
    get todos(){
        return this.#to_dos;
    }

    get unorganized_tasks(){
        return this.#unorganized_tasks;
    }
    set title(value){
        if(!value || value.length > 100){
            throw new Error("Given value is either undefined or too long");
        }
        this.#title = value;
    }
    set todos(value){
        if(!value || !value instanceof Array){
            this.#to_dos = new Array();
        }
        else{
            this.#to_dos = value;
        }
    }
    set unorganized_tasks(value){
        if(!value || !value instanceof Array){
            this.#unorganized_tasks = new Array();
        }
        else{
            this.#unorganized_tasks = value;
        }
    }
/**
 * 
 * @param {ToDoList} to_do 
 */
    addToDo(to_do){
        if(!to_do instanceof ToDoList){
            throw new Error("Only todo or tasks can be added to projects");
        }
        this.#to_dos.push(to_do);
    }
/**
 * 
 * @param {ToDoList} to_do 
 */
    removeToDo(to_do){
        if(!to_do instanceof ToDoList){
            throw new Error("Only todo or tasks can be added to projects");
        }
        const index = this.#to_dos.findIndex((el) => el === to_do);
        this.#to_dos.splice(index, 1);

    }

    addTask(task){
        if(!task instanceof Task){
            throw new Error("Only todos or tasks can be added to projects");
        }
        this.#unorganized_tasks.push(task);
    }

    removeTask(task){
        if(!task instanceof Task){
            throw new Error("Only todos or tasks can be added to projects");
        }
        const index = this.#unorganized_tasks.findIndex((el) => el === task);
        this.#unorganized_tasks.splice(index, 1);
    }
    addTaskToList(task, list_id){
        if(!list_id){
            this.addTask(task);
            return;
        }
        const list = this.#to_dos.find((lst) => lst.getId === list_id);
        list.addTask(task);
       }
    removeTaskFromList(task_id, list_id){
        if(!list_id){
            const index = this.#unorganized_tasks.findIndex((el) => el.getId === task_id);
            this.#unorganized_tasks.splice(index, 1);
            return;
        }
        const list = this.#to_dos.find((lst) => lst.getId === list_id);
        const index = list.findIndex((el) => el.getId === task_id);
        list.splice(index, 1);
    }
    editTask(task_info, list_id){
        if(!list_id){
            const task = this.#unorganized_tasks.find((el) => el.getId === task_info.getId);
            task.update(task_info);
            return;
        }
        const list = this.#to_dos.find((lst) => lst.getId === list_id);
        const task = list.find((tsk) => tsk.getId === task_info.getId);
        task.update(task_info);
    }
    toJSON(){
        // Serializing todos
        const todos = this.#to_dos.map((todo) => todo.toJSON());
        // Serializing unorganized tasks
        const unorganized = this.#unorganized_tasks.map((task) => task.toJSON());
        // Creating export object
        const export_obj = {title: this.#title,
                            todos: todos,
                            unorganized: unorganized,

        }
        // Serializing export object
        const serialized = JSON.stringify(export_obj);
        return serialized;
    }
}
export {Project};