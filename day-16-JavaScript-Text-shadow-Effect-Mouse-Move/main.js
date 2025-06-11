const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100;


function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;
    
    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    const r = Math.min(255, Math.abs(xWalk) * 10);
    const g = Math.min(255, Math.abs(yWalk) * 10);
    const b = 140;

    text.style.textShadow = `
        ${xWalk}px ${-yWalk}px 0 rgba(${r}, ${g}, ${b}, 0.2),
        ${-xWalk}px ${yWalk}px 0 rgba(${r}, ${g}, ${b}, 0.94)
    `
    text.style.color = `rgb(${255 - r}, ${255 - g}, ${255 - b})`
}


hero.addEventListener('mousemove', shadow)