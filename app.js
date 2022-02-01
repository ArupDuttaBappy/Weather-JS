window.addEventListener("load", () => {
  const api_key = "fa9453a812eb372fb8ff3d1bf67ed332";
  const search_city_input = document.getElementById('searchCityInput');
  const search_city_btn = document.getElementById('searchCityBtn');
  const get_user_location_btn = document.getElementById('getUserLocationBtn');

  search_city_btn.addEventListener("click", function() {
    if(search_city_input.value == "") {
      alert("Enter a city name (e.g. dhaka).");
    }
    else {
      let search_box_city_name = search_city_input.value;
      alert(search_box_city_name);
    }
  });

  getUserLocation();

  get_user_location_btn.addEventListener("click", function() {
    getUserLocation();
  });

  function getUserLocation() {
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
    alert(latitude+", "+longitude)
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
