
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
      let forecast_date_data = new Date(dailyunit.dt * 1000);
      let forecast_date = forecast_date_data.toUTCString();
      let forecast_date_str_arr = forecast_date.split(" ");

      let forecast_icon = dailyunit.weather[0].icon;
      let temp = ((dailyunit.temp.max + dailyunit.temp.min)/2).toFixed(2);

      daily_forecast_panel.innerHTML +=
      `<div class="dailyForecastCard d-flex flex-column" style="width:12.5%">
        <div class="text-center" style="opacity:0.8;font-size:15px;">${forecast_date_str_arr[1]+" "+forecast_date_str_arr[2]}</div>
        <div><i class="${weatherIconsMap[forecast_icon]}" style="font-size:20px;"></i></div>
        <div class="text-center"><b>${temp} °C</b></div>
        <div class="text-center"><h6>${dailyunit.weather[0].main}</h6></div>
        <div class="row text-center" style="opacity:0.6">
          <div class="col-4"><i class="fas fa-cloud-rain"></i></div>
          <div class="col-8"> ${dailyunit.rain || 0}mm</div>
        </div>
        <div class="row text-center" style="opacity:0.6">
          <div class="col-4"><i class="fas fa-wind"></i></div>
          <div class="col-8"> ${dailyunit.wind_speed || 0}m/s</div>
        </div>
        <div class="row text-center" style="opacity:0.6">
          <div class="col-4"><i class="fas fa-tint"></i></div>
          <div class="col-8"> ${dailyunit.humidity || 0}%</div>
        </div>
      </div>`;
    });
  })
}
