import { Task } from "./task.js";
import {ToDoList} from "./todo.js";

class Project{
    #title = "";
    #to_dos = [];
    #unorganized_tasks = [];

    get toDos(){
        return this.#to_dos;
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