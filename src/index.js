import "./styles/main-page.css";
import {Task} from "./backend/todo.js";


const task = new Task({title: "HI"});
console.log(task.title);

