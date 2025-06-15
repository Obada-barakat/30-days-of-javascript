const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo () {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
            
        })
        .catch(err => {
            console.error('OH NOO!!', err)
        })
        
}

function paintToCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        ctx.putImageData(pixels, 0, 0)
    }, 15)
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'beauty');
    link.innerHTML = `<img src="${data}" alt="Beauty" />`;
    strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
    const redBoost = document.getElementById('red_boost').value;
    const greenBoost = document.getElementById('green_boost').value;
    const blueBoost = document.getElementById('blue_factor').value;

    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + redBoost;
        pixels.data[i + 1] = pixels.data[i + 1] - greenBoost ;
        pixels.data[i + 2] = pixels.data[i + 2] * blueBoost;
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    return pixels;
}

getVideo()

video.addEventListener('loadedmetadata', () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    paintToCanvas(width, height)
})
