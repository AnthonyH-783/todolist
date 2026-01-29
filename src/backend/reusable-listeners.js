function dateBtnOnClick(event) {
    // Any element within the date button
    const node = event.target.closest(".date-btn");
    if (!node) return;
    const date_picker = node.previousElementSibling;
    // Apply data changes when data picker changes values
    // Event listener is needed because of asyncronous behavior of date picker
    if (!date_picker.dataset.bound) {
        date_picker.addEventListener("change", () => {
            node.textContent = date_picker.value;
            node.dataset.value = date_picker.value;
        });
        date_picker.dataset.bound = "true";
    }
    // Show date picker
    date_picker.showPicker();
}

function priorBtnOnClick(event){
    const node = event.target.closest(".priority-btn");
    if(!node) return;
    const prior_picker = node.previousElementSibling;

    if(!prior_picker.dataset.bound){
        prior_picker.addEventListener("change", () =>{
            node.textContent =prior_picker.value;
            node.dataset.value = prior_picker.value;
        });
        prior_picker.dataset.bound = "true";
    }
    // Show picker
    prior_picker.showPicker();
}


export{dateBtnOnClick, priorBtnOnClick};