import {parse, format} from "date-fns";


function dateBtnOnClick(event) {
    // Any element within the date button
    const node = event.target.closest(".date-btn");
    if (!node) return;
    const date_picker = node.previousElementSibling;
    // Apply data changes when data picker changes values
    // Event listener is needed because of asyncronous behavior of date picker
    if (!date_picker.dataset.bound) {
        date_picker.addEventListener("change", () => {
            const date = parse(date_picker.value, "yyyy-MM-dd'T'HH:mm", new Date());
            const formated = format(date, "EEE MMM do, h:mm aaaa");
            console.log(formated);
            node.textContent = formated;
            node.dataset.value = date;
        });
        date_picker.dataset.bound = "true";
    }
    // Show date picker
    date_picker.showPicker();
}

function addTaskBtnOnClick(event){
    // Any element within the add task button
    event.preventDefault();
    const node = event.target.closest(".submit-task");
    if(!node) return;
    const form = node.closest("form");
    const data = new FormData(form);
    const entries = data.entries();
    for(const pair of entries){
        console.log(pair[0], pair[1]);

    }
    return data;
}


export{dateBtnOnClick, addTaskBtnOnClick};