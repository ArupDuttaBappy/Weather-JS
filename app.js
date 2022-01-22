window.addEventListener("load", () => {
  let latitude;
  let longitude;
  const api_key = "fa9453a812eb372fb8ff3d1bf67ed332";
  let 

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
          console.log(data.weather[0].description);
        })
    });
  }
});
