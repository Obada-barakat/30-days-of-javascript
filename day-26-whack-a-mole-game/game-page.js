const gameSection = document.querySelector('.game-section');
const currentPlayer = localStorage.getItem('whackCurrentPlayer');
const highestScore = localStorage.getItem(`${currentPlayer}HighestScore`) || 0;
let gameTime = 15;
let min;
let max;

const info = document.createElement('section');
info.classList.add('info');

info.innerHTML = `
    <div class="player-details">
        <p>Player:<span>${currentPlayer}</span></p>
        <p id="highest_score">Highest Score: <span>${highestScore}</span></p>
    </div>
    <div class="current-score">
        <p>Score: <span id="score">0</span></p>
        <p>Time: <span id="duration">${gameTime}</span></p>
    </div>
`;
gameSection.appendChild(info)

const goBtn = document.createElement('button');
goBtn.classList.add('go')
goBtn.textContent = "GO!";

gameSection.appendChild(goBtn)

const whackImg = document.createElement('img');
whackImg.setAttribute("src", './assets/wham.png');
whackImg.classList.add('wham');

gameSection.appendChild(whackImg);

const holesArea = document.createElement('section');
holesArea.classList.add('holes-area');

for (let i = 0; i < 6; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');

    const mole = document.createElement('div');
    mole.classList.add('mole');

    hole.appendChild(mole);
    holesArea.appendChild(hole)
}

gameSection.appendChild(holesArea)


const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreBoard = document.querySelector('.current-score span#score');
const bonkSound = new Audio('./assets/whack-sound.mp3')
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes)
    }
    lastHole = hole;
    return hole;
}

function popUp () {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up')

    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) popUp();
    }, time)
}

function startGame () {
    gameTime = 15;
    countTime();
    goBtn.setAttribute('disabled', "");
    goBtn.classList.add('game_on');
    scoreBoard.textContent = `0`;
    timeUp = false;
    score = 0;
    popUp();
    setTimeout(() => {
        timeUp = true;
        updateScore();
        goBtn.removeAttribute('disabled');
        goBtn.classList.remove('game_on');
    }, 15000)
}

let counter;
function countTime() {
    counter = setInterval(() => {
        if (gameTime == 0) {
            clearInterval(counter);
            gameTime = 15;
        } else {
            gameTime--;
        }
        document.querySelector('.current-score span#duration').textContent = gameTime;
    }, 1000)
}

function updateScore() {
    if (score > highestScore) localStorage.setItem(`${currentPlayer}HighestScore`, score);
    document.querySelector('#highest_score span').textContent = localStorage.getItem(`${currentPlayer}HighestScore`)
}

function bonkAMole (e) {
    if (!e.isTrusted) return;
    bonkSound.currentTime = 0;
    bonkSound.play();

    const mole = this;
    mole.classList.add('whacked');
    setTimeout(() => mole.classList.remove('whacked'), 300)

    whackImg.classList.add('whack')
        setTimeout(() => {
            whackImg.classList.remove('whack')
        }, 1000)

    score++;
    scoreBoard.classList.add('flash');
    setTimeout(() => scoreBoard.classList.remove('flash'), 300);

    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonkAMole))



goBtn.addEventListener('click', startGame)
