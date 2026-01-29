function dateBtnOnClick(event){
    // Targetting and validating
    const node = event.target;
    if(!validateDateBtn(node)) return;
    const date_picker = node.previousSibling;
    date_picker.showPicker();
    node.innerHTML = date_picker.value;
    console.log(date_picker.value);
}

function validateDateBtn(node){
    if(!node || !node.classList.includes("date-btn"))return false;
    return true;
}