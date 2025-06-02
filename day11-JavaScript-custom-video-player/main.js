// Get Elements
const videoPlayer = document.querySelector('section.player');
const video = videoPlayer.querySelector('.video_player');
const videoSource = video.querySelector('source')
const thumbnail = videoPlayer.querySelector('#video_thumbnail');
const mainIcon = videoPlayer.querySelector('.main');
const controlers = document.querySelector('div.controlers');
const volumeControler = document.querySelector('.volume_controlers');
const toggle = controlers.querySelector('.toggle');
const progress = controlers.querySelector('.progress');
const progressBar = controlers.querySelector('.progress_bar');
const volumeRange = volumeControler.querySelector('.volume_range');
const skipButtons = videoPlayer.querySelectorAll('[data-skip]');
const fullScreen = videoPlayer.querySelector('#fullscreen');
const sideList = document.querySelector('.video_side_list');

const videoList = ['./assets/vedio3.mp4', './assets/vedio1.mp4', './assets/vedio2.webm'];
const thumbnails = ['./assets/first-thumbnail.png', './assets/second-thumbnail.png', './assets/third-thumbnail.png']
createSideListContent();

function createSideListContent () {
    for (let i = 0; i < videoList.length; i++) {
            const div = document.createElement('div');
    div.classList.add('video');
    i == 0 ? div.classList.add('active') : "";
        div.innerHTML = `
            <div class="thumbnail"></div>
            <div class="describtion">Sit back and enjoy the video content, it's time to press play and watch.</div>
        `;
        div.querySelector('.thumbnail').style.backgroundImage = `url(${thumbnails[i]})`;
        sideList.appendChild(div);
    }
};


const sideVideos = Array.from(document.querySelectorAll('div.video'));

// build out functions

function showControlers() {
    controlers.classList.add('show');
    volumeControler.classList.add('show');
}

function hideControlers() {
    controlers.classList.remove('show');
    volumeControler.classList.remove('show');
}

function togglePlay() {
    video.paused ? video.play() : video.pause();
    mainIcon.classList.toggle('start', !video.paused)
}

function updateButton() {
    const icon = this.paused ? '<i class="fa-solid fa-play play_pause"></i>' : '<i class="fa-solid fa-pause"></i>';
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleVolumeUpdate() {
    this.classList.toggle('active')
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

function handleScrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
    video.currentTime = scrubTime;
}

function handleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function displayVideo () {

    const newVideoIndex = sideVideos.indexOf(this);
    video.pause();
    videoSource.setAttribute('src', videoList[newVideoIndex]);
    video.setAttribute('poster', thumbnails[newVideoIndex]);
    sideVideos.forEach(video => video.classList.remove('active'))
    sideVideos[newVideoIndex].classList.add('active')
    video.load();
}


// Hook up the event listeners

// listen to show the controlers
videoPlayer.addEventListener('mousemove', showControlers)
videoPlayer.addEventListener('mouseleave', hideControlers)
videoPlayer.addEventListener('touchend', showControlers);

// listen to play/pause the video 
video.addEventListener('click', togglePlay)
// video.addEventListener('touchcancel', togglePlay);

// listen for the first play
mainIcon.addEventListener('click', togglePlay)
mainIcon.addEventListener('touchcancel', togglePlay)

// listen to the video pause/play and update the button
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay)
toggle.addEventListener('touchcancel', togglePlay)

// listen for skip events
skipButtons.forEach(button => {
    button.addEventListener('click', skip)
})

// listen for volume change
volumeRange.addEventListener('change', handleVolumeUpdate);
volumeRange.addEventListener('mousemove', handleVolumeUpdate);

// listen for the progress bar change
let mouseDown = false;
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => mouseDown && handleScrub(e));

// listen for fullscreen request 
fullScreen.addEventListener('click', handleFullscreen)


sideVideos.forEach(video => {
    video.addEventListener('click', displayVideo)
})