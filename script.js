let lat;
let lon;
let key = "7a9e308d5f5da317f65c95353cf68b30"
let searchButton = document.querySelector('#searchBtn');
let searchInput = document.querySelector('.form-control');

// Search bar function
function handleSearchFormSubmit(event) {
    event.preventDefault();
    searchInput = document.querySelector('.form-control').value;
    console.log(searchInput)

    if (!searchInput) {
        console.error('You need to enter a city!');
        return;
    }

    getWeather();
}

//Search button event listener
searchButton.addEventListener('click', handleSearchFormSubmit);

// Open weather API call

function getWeather() {
    let openWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + '&units=imperial' + "&appid=" + key;
    console.log(openWeather)
    $.ajax({
        'url': openWeather,
        'method': 'GET',
    }).then(function (response) {
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        console.log(response.name);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        $('#selectedCity').text(response.name);
        $('#currentTemp').text('Temperature: ' + response.main.temp + ' degrees');
        $('#currentWind').text('Wind: ' + response.main.humidity);
        $('#currentHum').text('Humidity: ' + response.wind.speed);
        $('#currentUV').text('UV Index: ' + response.current.uvi);
      })
      .catch(function(err) {
          console.error(err);
      });
     }