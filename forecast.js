let api_key = config.secret_api_key;

function populateForecastData(lat, lon){
  api_fetch_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

  fetch(api_fetch_call)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
}
