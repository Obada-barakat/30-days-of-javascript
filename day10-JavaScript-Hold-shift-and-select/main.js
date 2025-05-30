const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));

let lastChecked;

function handleCheck (e) {
    if (e.shiftKey && this.checked) {
        let inBetween = false;
        checkboxes.forEach(checkbox => {

            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }


    lastChecked = this;
}


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleCheck);
});

