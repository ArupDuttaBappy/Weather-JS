window.addEventListener("load", () => {
  const api_key = "fa9453a812eb372fb8ff3d1bf67ed332";

  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    alert(inputValue);
  });

  function getUserLocation() {
    if (navigator.geolocation) {
      // returns a coordinates object to the function specified in the parameter -- showPosition
      navigator.geolocation.getCurrentPosition(getGeoPosition, showGetPositionError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function getGeoPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
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
