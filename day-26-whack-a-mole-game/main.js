const startBtn = document.getElementById('start')
const usernameField = document.getElementById('username')
const gameSection = document.querySelector('.game-section');
console.log(gameSection)


function checkUsername() {
    const username = usernameField.value.toLowerCase();
    console.log(username)
    localStorage.setItem('whackCurrentPlayer', username);
    startTheGame();
}


function startTheGame() {
    window.open('./game-page.html', "_self")
}

startBtn.addEventListener('click', checkUsername);


