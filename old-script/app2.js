window.addEventListener("load", () => {
  let latitude;
  let longitude;
  const api_key = "fa9453a812eb372fb8ff3d1bf67ed332";
  let desired_location = document.getElementById("desired-location");
  let region_name = document.querySelector(".region-name");
  let temperature_value = document.querySelector(".temperature-value");
  let degree_unit = document.querySelector(".degree_unit");
  let weather_condition = document.querySelector(".weather-condition");
  let weather_details = document.querySelector(".weather-details");

  function populateWeatherData(fetch_api) {
    fetch(fetch_api)
      .then(response => {
          return response.json();
      })
      .then(data => {
        console.log(data);
        if(data.cod == 404){
          alert("Region/City not found. Try again.");
        }
        else {
          region_name.textContent = data.name + ", " + data.sys.country;
          temperature_value.textContent = (data.main.temp - 273.15).toFixed(2);
          weather_condition.textContent = data.weather.clear;
          weather_details.textContent = data.weather[0].description + ", temperature feels like " + data.main.feels_like + data.main.humidity + ", wind speed " + data.wind.speed + "km/h";
        }

      })
  }

  document.getElementById("my-location-btn").addEventListener("click", function() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(geolocation => {
        latitude = geolocation.coords.latitude;
        longitude = geolocation.coords.longitude;
        populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
      });
    }
  });

  document.getElementById("desired-location-btn").addEventListener("click", function() {
    if(desired_location.value == "") {
      alert("enter any location");
    }
    else {
      let region_city_name = desired_location.value;
      console.log(region_city_name);
      populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${region_city_name}&appid=${api_key}`);
    }
  });

});
