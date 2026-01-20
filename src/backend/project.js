import {ToDo} from "./todo.js";

class Project{
    #to_dos = [];

    get toDos(){
        return this.#to_dos;
    }
/**
 * 
 * @param {ToDo} to_do 
 */
    addToDo(to_do){
        if(!to_do instanceof ToDo){
            throw new Error("Only todo objects can be added to projects");
        }
        this.#to_dos.push(to_do);
    }
/**
 * 
 * @param {ToDo} to_do 
 */
    removeToDo(to_do){
        if(!to_do instanceof ToDo){
            throw new Error("Only todo objects can be added to projects");
        }
        const index = this.#to_dos.findIndex((el) => el === to_do);
        this.#to_dos.splice(index, 1);

    }
}
export {Project};