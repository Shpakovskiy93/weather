const apiKey = '1afed881e75047e8b3a174919232302';

const header = document.querySelector('.header');
const form = document.querySelector('.header__form');
const input = document.querySelector('.header__input');

// listen for form submission
form.addEventListener('submit', e => {
    // cancel form submission
    e.preventDefault();
    // get values ​​from input
    let city = input.value.trim();

    // server request
    const url =  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        console.log(data.location.name);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);
        
        // create weather card
        const cardHTML = `
        <section class="card">
            <h2 class="card__city">${data.location.name}<span class="card__country">${data.location.country}</span></h2>
            <div class="card__weather">
                <div class="card__value">${data.current.temp_c}<sup>°с</sup></div>
                <img class="card__img" src="./img/27 1.png" alt="sun">
            </div>
            <p class="card__description">${data.current.condition.text}</p>
        </section>`;

        // add card on page
        header.insertAdjacentHTML('afterend', cardHTML);


    })
    
})
