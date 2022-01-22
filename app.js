window.addEventListener("load", () => {
  let latitude;
  let longitude;
  const api_key = "fa9453a812eb372fb8ff3d1bf67ed332";
  let region_name = document.querySelector(".region-name");
  let temperature_value = document.querySelector(".temperature-value");
  let weather_condition = document.querySelector(".weather-condition");
  let weather_details = document.querySelector(".weather-details");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(geolocation => {
      latitude = geolocation.coords.latitude;
      longitude = geolocation.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
          console.log(data);
          region_name.textContent = data.name + ", " + data.sys.country;
          temperature_value.textContent = data.main.temp;
          weather_condition.textContent = data.weather.clear;
          weather_details.textContent = data.weather[0].description + ", temperature feels like " + data.main.feels_like + data.main.humidity + ", wind speed " + data.wind.speed + "km/h";
        })
    });
  }
});
