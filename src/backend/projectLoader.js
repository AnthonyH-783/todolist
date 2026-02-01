import { TaskDOM } from "./domGen";

/**
 * 
 * @param {String} selection 
 * @param {Array} list 
 */
function load(){
    for(const index = 0; index < localStorage.length; index++){
        const key = localStorage.key(index);
        const value = localStorage.getItem(key);

        // Converting string to json
        const json = JSON.parse(value);
        
    }

    

}

export {load};