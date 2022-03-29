
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
        <div class="text-center" style="opacity:0.8">9/12</div>
        <div class="text-center"><h3>00.00</h3></div>
        <div><i class="fas fa-cloud-sun" style="font-size:30px;"></i></div>
        <div class="text-center"><b>Main Desc.</b></div>
        <div class="row" style="opacity:0.6">
          <div class="col-6 text-start d-flex flex-column">
            <div>humidity</div>
            <div>rain</div>
          </div>
          <div class="col-6 text-end d-flex flex-column">
            <div>wind</div>
            <div>clouds</div>
          </div>
        </div>
      </div>`;
      // <div class="">${dailyunit.dt}</div>
      // <div class="">Temperature ${dailyunit.temp.max}</div>
      // <div class="">Feels ${dailyunit.feels_like.day}</div>
      // <div><i class="${weatherIconsMap[forecast_icon]}" style="font-size:50px;"></i></div>
    });
  })
}
