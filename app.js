window.addEventListener("load", () => {

  getUserLocationData();

  let api_key = config.secret_api_key;
  const search_city_input = document.getElementById('searchCityInput');
  const search_city_btn = document.getElementById('searchCityBtn');
  const get_user_location_btn = document.getElementById('getUserLocationBtn');
  let search_type;
  let search_key = [];

  // left panel selectors
  const loc_city_name = document.getElementById('locCityName');
  const loc_country_name = document.getElementById('locCountryName');
  const loc_longitude = document.getElementById('locLongitude');
  const loc_latitude = document.getElementById('locLatitude');
  const loc_date_time = document.getElementById('locDateTime');
  // const loc_time = document.getElementById('locTime');
  const loc_sunrise = document.getElementById('locSunrise');
  const loc_sunset = document.getElementById('locSunset');
  const refresh_btn = document.getElementById('refreshBtn');
  const refresh_icon = document.getElementById('refreshIcon');

  // center panel selectors
  const weather_icon = document.getElementById('weatherIcon'); // from main.weather.icon
  const loc_temp = document.getElementById('locTemp');
  const max_temp = document.getElementById('maxTemp');
  const min_temp = document.getElementById('minTemp');
  const to_celcius = document.getElementById('toCelcius');
  const to_farenheit = document.getElementById('toFarenheit');
  const loc_weather_main = document.getElementById('locWeatherMain');
  const loc_weather_desc = document.getElementById('locWeatherDesc');

  // right panel selectors
  const humidity = document.getElementById('humidity');
  const temp_feels_like = document.getElementById('tempFeelsLike');
  const visibility = document.getElementById('visibility');
  const cloud = document.getElementById('cloud');
  const wind_speed = document.getElementById('windSpeed');
  const wind_direction = document.getElementById('windDirection');
  const rain = document.getElementById('rain');
  const snow = document.getElementById('snow');

  function populateWeatherData(api_fetch_call) {
    fetch(api_fetch_call)
    .then(response => {
      return response.json();
    })
    .then(data => {
      refresh_icon.classList.remove("fa-spin");
      console.log(data);
      if(data.cod == 404){
        alert("code " + data.cod + " - " + data.message + "!");
      }
      else {
        // left panel
        loc_city_name.textContent = data.name;
        loc_country_name.textContent = data.sys.country;
        loc_longitude.textContent = data.coord.lon;
        loc_latitude.textContent = data.coord.lat;
        let local_date_and_time_data = new Date(data.dt * 1000);
        let local_date_and_time = local_date_and_time_data.toLocaleString();
        loc_date_time.textContent = local_date_and_time;
        let sunrise_data = new Date(data.sys.sunrise * 1000);
        let sunrise_time = sunrise_data.toLocaleTimeString();
        loc_sunrise.textContent = sunrise_time;
        let sunset_data = new Date(data.sys.sunset * 1000);
        let sunset_time = sunset_data.toLocaleTimeString();
        loc_sunset.textContent = sunset_time;
        // center panel
        loc_temp.textContent = data.main.temp.toFixed(2);
        max_temp.textContent = data.main.temp_max;
        min_temp.textContent = data.main.temp_min;
        loc_weather_main.textContent = data.weather[0].main;
        loc_weather_desc.textContent = data.weather[0].description;
        // right panel
        humidity.textContent = data.main.humidity;
        temp_feels_like.textContent = data.main.feels_like;
        visibility.textContent = (data.visibility/1000).toFixed(2);
        cloud.textContent = data.clouds.all;
        wind_speed.textContent = data.wind.speed;
        wind_direction.textContent = data.wind.deg;
        rain.textContent = data.rain;
        snow.textContent = data.snow;
      }
    })
  }

  // Refresh function
  refresh_btn.addEventListener("click", function() {
    refresh_icon.classList.add("fa-spin");

    if(search_type == 1)
    {
      console.log(search_key[0]);
      populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${search_key[0]}&appid=${api_key}&units=metric`);
    }
    else if(search_type == 2)
    {
      console.log(search_key[0] + " , " + search_key[1]);
      populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${search_key[0]}&lon=${search_key[1]}&appid=${api_key}&units=metric`);
    }
  });


  // converter - toCelcius toFarenheit
  to_celcius.addEventListener("click", function() {
    to_farenheit.classList.remove("active");
    to_celcius.classList.add("active");

    loc_temp.textContent = convertToCel(loc_temp.textContent);
    max_temp.textContent = convertToCel(max_temp.textContent);
    min_temp.textContent = convertToCel(min_temp.textContent);
    temp_feels_like.textContent = convertToCel(temp_feels_like.textContent);
  });

  to_farenheit.addEventListener("click", function() {
    to_celcius.classList.remove("active");
    to_farenheit.classList.add("active");

    loc_temp.textContent = convertToFar(loc_temp.textContent);
    max_temp.textContent = convertToFar(max_temp.textContent);
    min_temp.textContent = convertToFar(min_temp.textContent);
    temp_feels_like.textContent = convertToFar(temp_feels_like.textContent);
  });

  function convertToCel(farVal) {
    return ((farVal - 32) * 5 / 9).toFixed(2);
  }

  function convertToFar(celVal) {
    return ((celVal * 9 / 5) + 32).toFixed(2);
  }


  // "Enter" key
  search_city_input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      search_city_btn.click();
    }
  });


  search_city_btn.addEventListener("click", function() {
    if(search_city_input.value == "") {
      alert("Enter a city name (e.g. dhaka).");
    }
    else {
      let search_box_city_name = search_city_input.value;
      // alert(search_box_city_name);
      search_type = 1;
      search_key[0] = search_box_city_name;
      populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${search_box_city_name}&appid=${api_key}&units=metric`);
    }
  });


  get_user_location_btn.addEventListener("click", function() {
    search_city_input.value = "";
    getUserLocationData();
  });


  function getUserLocationData() {
    if (navigator.geolocation) {
      // returns a coordinates object to the function specified in the parameter -- getGeoPosition
      navigator.geolocation.getCurrentPosition(getGeoPosition, showGetPositionError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function getGeoPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    search_type = 2;
    search_key[0] = latitude;
    search_key[1] = longitude;
    populateWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`);
  }

  // user location: handling errors and rejections
  function showGetPositionError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
      case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
      case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
      case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }

});
