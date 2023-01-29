const apiKey = "a0aca8a89948154a4182dcecc780b513";
const today = moment().format('L');
const historyList = [];

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

        const currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResult.name} ${today} <img src="${iconURL}" alt"${cityWeatherResult.weather[0].description}" />
            </h2>
            <p>Temp: ${cityWeatherResult.main.temp} </p>
            <p>Humidity: ${cityWeatherResult.main.humidity} </p>
            <p>Wind Speed: ${cityWeatherResult.wind.speed} </p>
            `)
        $("#cityDetail").append(currentCity);
  
    });
}

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
})