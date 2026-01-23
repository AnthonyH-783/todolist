import "./styles/main-page.css";
import {Task} from "./backend/task.js";
import { ToDoList } from "./backend/todo.js"; 
import { Project } from "./backend/project.js";
import { TaskDOM } from "./backend/domGen.js";
import { compareAsc, format } from "date-fns";
import "./styles/main-page.css";

const main = document.getElementById("main-body");
const task2 = new Task();
const container2 = TaskDOM(task2);

main.appendChild(container2);
const task3 = new Task();
const container3 = TaskDOM(task3);

main.appendChild(container3);
const task4 = new Task();
const container4 = TaskDOM(task4);

main.appendChild(container4);