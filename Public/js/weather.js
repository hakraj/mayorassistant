//get current location

// if (!navigator.geolation) {
//   console.log("yuuuu");
// }

window.addEventListener( "load", getDeviceLocation);

function getDeviceLocation () {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
      const geolocation = {
        lat: position.coords.latitude, 
        long: position.coords.longitude 
      };

      console.log(geolocation)

      fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(geolocation)
      })
      .then(response => response.json())
      .then((data) => {

        console.log(data.geo);

        document.querySelector(".cityName").textContent = data.cityName;
        document.querySelector(".cityName + p").textContent = data.dateTimeHr;
        document.querySelector(".weatherImg").setAttribute("src", data.imgUrl);
        document.querySelector(".description").textContent = data.description;
        document.querySelector(".temp").innerHTML = data.temp + "<sup>o</sup>";
        document.querySelector(".feels-like").innerHTML = "feels like " + data.feelsLike + "<sup>o</sup>";
        document.querySelector(".wind").innerHTML =  data.wind.toFixed(1) + "m/s";
        document.querySelector(".humidity").innerHTML =  data.humidity + "%";
        document.querySelector(".visibility").innerHTML =  (data.visibility/1000) + "km";

      });

      fetch('/api/forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(geolocation)
      })
      .then(response => response.json())
      .then((data) => {

        console.log(data);

        var day = document.querySelectorAll(".day");
        for (let i = 0; i < day.length; i++) {
          const element = day[i];
          element.innerHTML = data[i].time.slice(0,3) + "<br>" + data[i].time.slice(3,6);
        };

        var forecastImg = document.querySelectorAll(".forecast-img");
        for (let i = 0; i < forecastImg.length; i++) {
          const element = forecastImg[i];
          element.setAttribute("src", data[i].iconUrl);
        };

        var tempRange = document.querySelectorAll(".temp-range");
        for (let i = 0; i < tempRange.length; i++) {
          const element = tempRange[i];
          element.innerHTML = (data[i].temp).toFixed(1) + "<sup>o</sup>";
        };


      });

    

      res.write("success");
  }

  function error() {
      alert("unable to retrieve your location");
      // res.write("error '_' ")

      const geolocation = {
        code: 404,
      }
  };

}





  