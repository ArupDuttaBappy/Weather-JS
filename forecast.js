
let api_key = config.secret_api_key;
let daily_forecast_panel = document.getElementById("dailyForecastPanel");

function populateForecastData(lat, lon){
  api_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

  fetch(api_call)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    data.daily.forEach((dailyunit) => {
      let forecast_icon = dailyunit.weather[0].icon;
      console.log(forecast_icon);
      daily_forecast_panel.innerHTML +=
      `<div class="dailyForecastCard d-flex flex-column">
        <div class="">Date ${dailyunit.dt}</div>
        <div class="">Temperature ${dailyunit.temp.max}</div>
        <div class="">Feels ${dailyunit.feels_like.day}</div>
        <div>${forecast_icon}</div>
      </div>`;
    });
  })
}
