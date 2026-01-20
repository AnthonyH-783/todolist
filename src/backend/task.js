class Task{
    #info = "Undefined";
    #completed = false;

    constructor(info, completed){
        this.info = info;
        this.completed = completed;
    }

    get info(){
        return this.#info;
    }
    set info(value){
        if(typeof value !== "string" || value.length === 0){
            throw new Error("Value must be a non-empty string");
        }
        this.#info = value;
    }
    get completed(){
        return this.#completed;
    }
    set completed(value){
        if(typeof value !== boolean){
            throw new Error("Value must be a boolean");
        }
        this.#completed = value;
    }
}

export {Task};