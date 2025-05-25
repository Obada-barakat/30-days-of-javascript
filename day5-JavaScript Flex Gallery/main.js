
const panels = document.querySelectorAll('.panel');

function openImage() {
        this.classList.toggle('open')
}

function openImageOnTouch() {
    e.preventDefault();
    if (!this.classList.contains('open')) {
        this.classList.add('open')
    } else {
        this.classList.remove('open')
    }
}

function showText(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open_active')
    }
}

panels.forEach(panel => panel.addEventListener('click', openImage))
panels.forEach(panel => panel.addEventListener('touchcancel', openImageOnTouch))

panels.forEach(panel => panel.addEventListener('transitionend', showText))
