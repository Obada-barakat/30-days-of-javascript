const sideBar = document.querySelector('.side_bar');
const sideNav = document.querySelector('header nav');
const sections = Array.from(document.querySelectorAll('section.stage'));
const NxtBtn = document.querySelector('.scroll')

function showSideNav() {
    sideBar.classList.toggle('open')
    sideNav.classList.toggle('active')
}
sideBar.addEventListener('click', showSideNav);


const slideImages = Array.from(document.querySelectorAll('.slide_in'));
const slideTexts = document.querySelectorAll('h2');

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};


function checkSlide(e) {
    
    slideImages.forEach(sliderImage => {
        const index = slideImages.indexOf(sliderImage);
        // All the way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 3;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        
        const isAllShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isAllShown && isNotScrolledPast) {
            sliderImage.classList.add('show')
            slideTexts[index].classList.add('active')
        } else {
            sliderImage.classList.remove('show');
            slideTexts[index].classList.remove('active')
        }

    })
}


window.addEventListener('load', () => {
    window.addEventListener('scroll', debounce(checkSlide));
})