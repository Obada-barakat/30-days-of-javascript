const allowedColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'black', 'white'];
const words = document.querySelector('.words');
const photoContainer = document.querySelector('section.photo_container');
const imageUrls = [
    './assets/ai-generated-8480452_1280.png',
    './assets/coast-9549731_1280.png',
    './assets/mount-fuji-9561799_1280.jpg',
    './assets/nature-8063737_1280.jpg',
    './assets/new-year-background-3608029_1920.jpg',
    './assets/space-8424187_1920.jpg',
    './assets/space-8424189_1920.jpg',
    './assets/tea-plantation-7344887_1920.jpg',
    './assets/woman-4906077_1280.jpg'
]

function debounce(func, delay = 500) {
    let timeout;
    return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
    };
}

function detectColor(transcript) {
    return allowedColors.find(color => transcript.includes(color));
}

function detectTarget(transcript) {
    if (transcript.includes('background')) return 'background';
    if (transcript.includes('text') || transcript.includes('font')) return 'text';
    return null;
}

function applyStyle(target, color) {
    if (!color || !target) return;

    if (target === 'background') {
        document.body.style.backgroundColor = color;
        console.log(`Background Color changed to ${color}`)
    } else if (target === 'text') {
        words.style.color = color;
        console.log(`text color changed to ${color}`)
    }
}

const debouncedApplyStyle = debounce(applyStyle, 1000)

function detectShowRequest(transcript) {
    if (transcript.includes('show picture') || 
    transcript.includes('show photo')) {
        return true;
    } else if (transcript.includes('remove photo') ||
                transcript.includes('remove picture')) {
                return 'remove';
            }
    return false;
}

function showSlide(show) {
    if (!show) return;
    if (show === 'remove') {
            photoContainer.innerHTML = '';
    } else {
        photoContainer.innerHTML = '';
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const img = document.createElement('img');
        img.src = imageUrls[randomIndex];
        img.alt = 'Random Photo';
        img.className = 'card'
        photoContainer.appendChild(img);
        setTimeout(() => {
            img.classList.add('show')
        }, 300)
    }
}

const debouncedShowSlide = debounce(showSlide, 600);


window.SpeechRecognition = window.SpeechRecognition 
|| window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")
        .toLowerCase();

        p.textContent = transcript;


            const target = detectTarget(transcript);
            const color = detectColor(transcript);

            debouncedApplyStyle(target, color);

            
            const showSlideRequest = detectShowRequest(transcript);
            debouncedShowSlide(showSlideRequest)
})


recognition.addEventListener('end', () => recognition.start());
recognition.start();
