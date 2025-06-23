const nav = document.querySelector('.links');
const topOfNav = nav.offsetTop;


function fixNav() {
    if (window.scrollY >= topOfNav) {
        console.log(nav.offsetHeight)
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav')
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }
}


window.addEventListener('scroll', fixNav)