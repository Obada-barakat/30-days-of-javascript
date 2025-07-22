const input = document.querySelector('#qrValue');
const generateBtn = document.querySelector('#generate')
const imgBox = document.querySelector('#imgBox');
const qrImage = document.querySelector('#qrImage');

function generateQR() {
    if (input.value.length > 0) {
        qrImage.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
        encodeURIComponent(input.value);
        imgBox.classList.add('show');
    } else {
        input.classList.add('error');
        setTimeout(() => {
            input.classList.remove('error')
        }, 1000)
    }
}

generateBtn.addEventListener('click', generateQR)
