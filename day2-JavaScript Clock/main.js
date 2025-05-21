const hoursHand = document.querySelector('div.hour_hand')
const mimutesHand = document.querySelector('div.min_hand')
const secondsHand = document.querySelector('div.second_hand')


function updateClock () {
    const now = new Date();

    const ms = now.getMilliseconds();
    const sec = now.getSeconds() + ms / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr = now.getHours() % 12 + min / 60;

    const secDeg = sec * 6 + 90;
    const minDeg = min * 6 + 90;
    const hourDeg = hr * 30 + 90;

    secondsHand.style.transform = `rotate(${secDeg}deg)`;
    mimutesHand.style.transform = `rotate(${minDeg}deg)`;
    hoursHand.style.transform = `rotate(${hourDeg}deg)`;

    requestAnimationFrame(updateClock)
}

requestAnimationFrame(updateClock)


// setInterval(setDate, 1000);