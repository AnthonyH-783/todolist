
function taskMouseEnter(event){
    if(!isTaskContainer(event)) return;

    const container = event.target;
    const hiddens = container.querySelectorAll(".hidden");
    hiddens.forEach(element => {
        element.classList.remove("hidden");
    });
}

function taskMouseLeave(event){
    if(!isTaskContainer(event)) return;
    const node = event.target;
    const drag = node.querySelector(".drag");
    const edits = node.querySelector(".edit-task");
    drag.classList.add("hidden");
    edits.classList.add("hidden");
    
}


function isTaskContainer(event){
    return event.target.classList.contains("task-container");
}

function circleOnClick(event){
    if(!isCircle(event)) return;
    const node = event.target;
    // Toggle between circle and check cirle
    toggleCircles(node);
}

function isCircle(event){
    const node = event.target;
    const target_class = "material-symbols-outlined";
    const node_type = "DIV";
    const inner_text_1 = "circle";
    const inner_text_2 = "check_circle";
    
    return node.classList.contains(target_class) && node.nodeName === node_type &&
           (node.innerText === inner_text_1 || node.innerText === inner_text_2);
}
function toggleCircles(node){
        // Toggle between circle and check cirle
        const inner_text_1 = "circle";
        const inner_text_2 = "check_circle";
        node.innerText = (node.innerText === inner_text_1) ? inner_text_2 : inner_text_1;
        // Toggle colors
        if(node.innerText === inner_text_2){
            node.classList.add("checked-circle");
        }
        else{
            node.classList.remove("checked-circle");
        }
}
function selectProject(event){
    // Selecting and validating node
    const node = event.target;
    if(!isProjectTab(node)) return;
    // Removing previous selection highlighting
    const container = node.closest("#projects");
    container.querySelector(".active-tab").classList.remove(".active-tab");
    // Highlighting current selection
    node.classList.add("active-tab");

    // Loading Project into main page



}

function isProjectTab(node){
    if(!node || !node.closest("#projects")) return false;
    return true;

}
export {taskMouseEnter, taskMouseLeave, circleOnClick};