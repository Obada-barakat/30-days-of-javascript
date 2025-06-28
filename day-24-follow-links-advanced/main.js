const triggers = document.querySelectorAll('.info>li');
const background = document.querySelector('.dropdownBackground');
const header = document.querySelector('.links');

function handleEnter() {
    this.classList.add('trigger-enter')
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');
    console.log(this)
    getCoords(this.querySelector('.dropdown'))
}

function getCoords(dropdown) {
    const dropdownCoords = dropdown.getBoundingClientRect();
    const headerCoords = header.getBoundingClientRect();
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - headerCoords.top,
        left: dropdownCoords.left - headerCoords.left,
    }
    
    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
}

function handleLeave() {
        this.classList.remove('trigger-enter', 'trigger-enter-active')
        background.classList.remove('open');
}


triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));