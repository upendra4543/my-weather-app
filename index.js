let cityName = document.querySelector(".weather_city");

let citySearch = document.querySelector(".weater_search");
let dateTime = document.querySelector(".weather_date_time");
let w_forcast = document.querySelector(".weather_forcast");
let w_icon = document.querySelector(".weather_icon");
let w_temperture = document.querySelector(".weather_temperture");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let weather_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

// to get the atual country name
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type: "region"}).of(code);
};
// to get time and date
const getDateTime = (dt) => {
    // let dt = 1735922524710 ;
    const curDate = new Date(dt*1000);
    console.log(curDate);
    const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric" ,
    hour: "numeric",
    minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(curDate);
}

let city = "delhi"
// search functionlatity
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
});


const getWeatherData = async () => {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=4d7716f70839bc09d343bd3227eca108`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        w_temperture.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML =  `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_forcast.innerHTML = weather[0].main;
        w_icon.innerHTML =  ` <img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

        weather_feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML =  `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`;

    } catch (error) {
        console.log(error);
    }
};

document.body.addEventListener("load", getWeatherData());