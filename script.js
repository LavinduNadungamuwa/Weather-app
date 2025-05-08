const apiKey = "6e234eff0af5877c5233ff5e2f4e3bf1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                document.querySelector(".weather-type").innerHTML = data.weather[0].main;

        }else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
                weatherIcon.src = "images/snow.png";
        }

        const nowUTC = new Date().getTime();
        const localTime = new Date(nowUTC + (data.timezone * 1000));
        const localHour = localTime.getUTCHours();

        let timeOfDay = "";
        if (localHour >= 5 && localHour < 12) {
            timeOfDay = "Morning";
        } else if (localHour >= 12 && localHour < 17) {
            timeOfDay = "Afternoon";
        } else if (localHour >= 17 && localHour < 21) {
            timeOfDay = "Evening";
        } else {
            timeOfDay = "Night";
        }

        document.querySelector(".time-label").innerHTML = timeOfDay;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather-type").innerHTML = data.weather[0].main;
        }
}

searchBtn.addEventListener("click", ()=>{
       checkWeather(searchBox.value); 
});

searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
});
    