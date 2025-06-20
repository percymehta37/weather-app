const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img=document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkweather(city){
    const api= "559b9411e9de7784dac167a553ed3517"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`

    const weather_data= await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod=== `404`){
        location_not_found.style.display="flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    location_not_found.style.display="none";
    weather_body.style.display = "flex";
    temperature.innerHTML =`${Math.round
        (weather_data.main.temp-273.15)}°C`;
        description.innerHTML =`${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML =`${weather_data.wind.speed}km/h`;

        switch(weather_data.weather[0].main){
    case 'Clouds':
        weather_img.src = "media/cloud.png";
        break;
    case 'Clear':
        weather_img.src = "media/clear.png";
        break;
    case 'Rain':
        weather_img.src = "media/rain.png";
        break;
    case 'Mist':
        weather_img.src = "media/mist.png";
        break;
    case 'Snow':
        weather_img.src = "media/snow.png";
        break;
    }


}
searchBtn.addEventListener('click',()=>{
    checkweather(inputBox.value);
})
inputBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkweather(inputBox.value);
    }
});
