const apiKey = '1afed881e75047e8b3a174919232302';

const header = document.querySelector('.header');
const form = document.querySelector('.header__form');
const input = document.querySelector('.header__input');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if(prevCard) prevCard.remove();
}
function showCardError(messege) {
    const cardHTML = `<section class="card">${messege}</section>`;
    header.insertAdjacentHTML('afterend', cardHTML);
}
function showCardWeather(data) {
    const cardHTML = `
    <section class="card">
        <h2 class="card__city">${data.location.name}<span class="card__country">${data.location.country}</span></h2>
        <div class="card__weather">
            <div class="card__value">${Math.round(data.current.temp_c)}<sup>°с</sup></div>
            <img class="card__img" src="./img/27 1.png" alt="sun">
        </div>
        <p class="card__description">${data.current.condition.text}</p>
    </section>`;
    header.insertAdjacentHTML('afterend', cardHTML);
}

async function getWeather(city) {
    const url =  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const respons = await fetch(url);
    const data = await respons.json();

    console.log(data);

    return data;
}

// listen for form submission
form.addEventListener('submit', async (e) => {
    // cancel form submission
    e.preventDefault();
    // get values ​​from input
    let city = input.value.trim();

    // get data from server
    const data = await getWeather(city);
    
    if(data.error) {
        removeCard();
        showCardError(data.error.message)
    } else {
        removeCard();
        showCardWeather(data);
    }  
})
