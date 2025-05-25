
const panels = document.querySelectorAll('.panel');

function openImage() {
    if (this.classList.contains('open')) {
        this.classList.remove('open')
    } else {
        this.classList.add('open')
    }
}

// function openImageOnTouch() {
//     if (this.classList.contains('open')) {
//         this.classList.remove('open')
//     } else {
//         this.classList.add('open')
//     }
// }

function showText(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open_active')
    }
}

panels.forEach(panel => panel.addEventListener('click', openImage))
panels.forEach(panel => panel.addEventListener('touchstart', openImage))

panels.forEach(panel => panel.addEventListener('transitionend', showText))
panels.forEach(panel => panel.addEventListener('transitionend', showText))