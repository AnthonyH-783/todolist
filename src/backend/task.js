class Task{
    #title = "untitled";
    #description = "Description";
    #due = null;
    #priority = null;
    #notes = "Notes";
    #completed = false;


    constructor({title="untitled",
          description="description",
          due=new Date(), priority=0, notes="notes", completed=false} ={}){
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
    }

    get title(){
        return this.#title;
    }

    set title(value){
        if(typeof value !== "string" || value.length === 0){
            throw new Error("Title must be a non-empty string");
        }
        if(value.length > 30){
            throw new Error("Title must be less than 30 chars");
        }
        this.#title = value;
    }
    get description(){
        return this.#description;
    }

    set description(value){
        if(typeof value !== "string" || value.length === 0){
            throw new Error("Value must be a non-empty string");
        }
        if(value.length > 30000){
            throw new Error("Input is limited to 30,000 chars");
        }
        this.#description = value;
    }

    get due(){
        return this.#due;
    }

    set due(value){
        if(!value instanceof Date){
            throw new Error("Due Date must an instance of Date");
        }
        this.#due = value;
    }

    get priority(){
        return this.#priority;
    }

    set priority(value){
        if(typeof value !== "number" || !(value >= 0 && value <= 3)){
            throw new Error("Priority must be a number within 0 and 3(inclusive)");
        }
        this.#priority = parseInt(value);
    }

    get notes(){
        return this.#notes;
    }
    set notes(value){
        if(typeof value !== "string" || value.length === 0){
            throw new Error("Value must be a non-empty string");
        }
        if(value.length > 300){
            throw new Error("Input is limited to 300 chars");
        }
        this.#notes = value;
    }

    get completed(){
        return this.#completed;
    }

    set completed(value){
        if(typeof value !== "boolean"){
            throw new Error("Value must be a boolean");
        }
        this.#completed = value;
    }
}

export {Task};