const apiKey = "d9c88807aaee92c5216a32bb98251ad2";
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

    })

    $("#searchBtn").on("click", function(event) {
        event.preventDefault();

        var city = $("enterCity").val().trim();
    })
}