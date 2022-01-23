const weather = document.querySelector("#weather");
const API_KEY = "3ea6028f8a11c7ef53edb12bca6ff01d";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${temperature} ℃ ${place}`;
    });
}

function savaCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude,
    };
    savaCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("cant access geo locaion");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS);

    if (loadCoords === null) {
    askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadCoords);

        console.log(parsedCoords);
        
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();