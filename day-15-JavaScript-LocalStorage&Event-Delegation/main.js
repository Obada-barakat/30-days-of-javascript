const addItems = document.querySelector('.add_items');
let itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const deleteAllBtn = document.querySelector('#delete_all');


function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    if (!text.trim()) return;
    if (items.some(item => item.text.toLowerCase() === text.toLowerCase())) return;
    const item = {
        text,
        done: false,
    };
    
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem("items", JSON.stringify(items));
        populateList(items, itemsList);
}


function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        let checked = plate.done ? "checked" : '';
        return `
            <li>
                <input type='checkbox' data-index=${i} id='item${i}' ${checked}/>
                <label for='item${i}'>${plate.text}</label>
            </li>
        `
    }).join('')
}

function deleteAll() {
    addItems.reset();
    localStorage.removeItem('items');
    itemsList.innerHTML = " ";
    items = [];
}


deleteAllBtn.addEventListener('click', deleteAll)
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone)
populateList(items, itemsList)