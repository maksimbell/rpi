const body = document.body;
const time = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greeting = document.querySelector('.greeting-container__greeting');
const name = document.querySelector('.greeting-container__name');
const calendar = document.querySelector('.calendar');
const title = document.querySelector('.footer__title');
const explanation = document.querySelector('.footer__explanation');

let greet = 'Good';

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    const currentDate = date.toLocaleDateString('en', options);
    dateElement.textContent = currentDate;
}

function getDateCalendarString(date) {
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function fillCalendarDay() {
    const date = new Date();
    calendar.value = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    calendar.min = '1995-06-16';
    calendar.max = calendar.value;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 0 && hours < 6) {
        return 'night';
    } else {
        return 'evening';
    }
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `${greet} ${timeOfDay},`;
    greeting.textContent = greetingText;
}

function getLocalStorageItem() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

const addLocalStorageItem = () => {
    localStorage.setItem('name', name.value);
}

function getDataAsync() {
    const date = new Date(calendar.value);
    const url = `https://api.nasa.gov/planetary/apod?api_key=BBa6HP19YvGFhyWhXt3ZVL8ZYWbmhdacoy6zgofP&date=${getDateCalendarString(date)}`;

    let promise = fetch(url)
        .then(response => response.json())
        .then((data) => {
                console.log('ezclap');
                processData(data);
            },
            () => {
                console.log('no response');
            });
}

function processData(data) {
    console.log(data);

    body.style.backgroundImage = `url(${data.url})`;
    body.style.backgroundRepeat = `no-repeat`;
    body.style.backgroundSize = `cover`;
    body.style.backgroundPosition = `center`;
    title.textContent = `"${data.title}"`
}

function checkCalendarDate() {
    if (calendar.value.valueAsNumber < calendar.min.valueAsNumber || calendar.value.valueAsNumber > calendar.max.valueAsNumber) {
        calendar.value = '2022-04-12';
    }
}


fillCalendarDay();
getDataAsync();
showTime();

// window.addEventListener('beforeunload', addLocalStorageItem);
window.addEventListener('load', getLocalStorageItem);
name.addEventListener('input', addLocalStorageItem);
calendar.addEventListener('change', getDataAsync);
// calendar.addEventListener('change', checkCalendarDate);