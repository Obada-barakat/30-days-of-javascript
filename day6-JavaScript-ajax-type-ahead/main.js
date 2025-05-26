const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const searchInput = document.querySelector('#search_input');
const placesList = document.querySelector('.suggestions');

fetch(endpoint)
    .then(respo => respo.json())
    .then(respo => cities.push(...respo))

function findPlace(wordToMatch, cities) {
    return cities.filter(place => {
        const regEx = new RegExp(wordToMatch, 'ig');
        return place.city.match(regEx) || place.state.match(regEx) || "";
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    if (this.value.length > 2) {
        const matchArray = findPlace(this.value.trim(), cities)
        const html = matchArray.map(place => {
            const regEx = new RegExp(this.value, 'ig');
            const cityName = place.city.replace(regEx, `
                    <span class='hl'>${this.value}</span>
                `);
            const stateName = place.state.replace(regEx, `
                    <span class='hl'>${this.value}</span>
                `);
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
        placesList.innerHTML = html
        setTimeout(() => {
            placesList.style.transform = "translateX(0)";
            document.querySelectorAll('.suggestions li').forEach(e => {
                e.classList.add('show')
            });
        }, 500)
    }
}


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('touchend', displayMatches);
