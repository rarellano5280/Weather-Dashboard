const apiKey = "a0aca8a89948154a4182dcecc780b513";
const today = moment().format('L');
const historyList = [];


// Dispaly current weather conditions on a desired city
const currentWeather = (city) => {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResult) {
        console.log(cityWeatherResult);

        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();

        const iconCode = cityWeatherResult.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
        const lat = cityWeatherResult.coord.lat;
        const lon = cityWeatherResult.coord.lon;


 // Displaying weather conditions and injecting data into html.
        const currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResult.name} ${today} <img src="${iconURL}" alt"${cityWeatherResult.weather[0].description}" />
            </h2>
            <p>Temp: ${cityWeatherResult.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResult.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResult.wind.speed} MPH</p>
            </div>
            `)
            
        $("#cityDetail").append(currentCity);

        fiveDayForecast(lat, lon);
    });
}


// Function to display five day forecast
const fiveDayForecast = (lat,lon) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(forecastResult) {
        console.log(forecastResult);
        $("#fiveDay").empty();


 //For loop to grab all data for each card
        for (let i = 1; i < 6; i++) {
            const cityInfo = {
                date: forecastResult.daily[i].dt,
                icon: forecastResult.daily[i].weather[0].icon,
                temp: forecastResult.daily[i].temp.day,
                humidity: forecastResult.daily[i].humidity,
            };

            const date = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            const iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${forecastResult.daily[i].weather[0].main}" />`;

 //Injeting data into html
            const fiveDayForecastCard = $(`
                <div class="ml-5 pl-5">
                    <div class= "card text-white bg-primary mb-3" style="width: 18rem;">
                    <div class="card-header text-center">
                        <h2>${date}</h2>
                    </div>
                         <div class="card-body text-center">
                            <p>${iconURL}</p>
                            <h3>Temp: ${cityInfo.temp} °F</h3>
                            <h3>Humidity: ${cityInfo.humidity} \%</h3>
                         </div>
                    </div>
                </div>
        `)
        $("#fiveDay").append(fiveDayForecastCard);
            
        }
    })
}

//Event listener on search button 
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    const city = $("#enterCity").val().trim();
    currentWeather(city);
    if(!historyList.includes(city)) {
        historyList.push(city);
        const citySearch = $(`
        <li class="list-group-item">${city}</li>
            `)
        $("#searchHistory").append(citySearch);
    };

    localStorage.setItem("city,", JSON.stringify(historyList));
    console.log(historyList);
});

$(document).ready(function() {
    const searchResults = JSON.parse(localStorage.getItem("city"));

    if(searchResults !== null) {
        const previousSearchIndex = searchResults.length - 1;
        const previousSearchCity = searchResults[previousSearchIndex];
        currentWeather(previousSearchCity);
    }
});