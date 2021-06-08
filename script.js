let key = "7a9e308d5f5da317f65c95353cf68b30"
let searchButton = document.querySelector('#searchBtn');
let searchInput = document.querySelector('.form-control');
let searchHistory = document.querySelector('#search-history');
let forecast = $('#days');
let today = moment().format('L');


// Search bar function + local storage
function handleSearchFormSubmit(event) {
    event.preventDefault();
    searchInputVal = document.querySelector('.form-control').value;

    if (!searchInputVal) {
        console.error('You need to enter a city!');
        alert('You need to enter a city')
        return;
    } else {
        localStorage.setItem("City", searchInputVal);
        let searchedCity = localStorage.getItem("City");
        console.log(searchedCity);

        let searchHistory = document.createElement('li');
        searchHistory.setAttribute("class", "buttonList");
        $(searchHistory).text(searchedCity);
        $('#search-history').append(searchHistory);
    }

    getWeather();
};

//Search button event listener
searchButton.addEventListener('click', handleSearchFormSubmit);


// Open weather API call

function getWeather() {
    let openWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + '&units=imperial' + "&appid=" + key;
    console.log(openWeather)
    $.ajax({
        'url': openWeather,
        'method': 'GET',
    }).then(function (response) {

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        console.log(response);
        console.log(response.name);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        $('#selectedCity').text(response.name + ' ' + today);
        $('#currentTemp').text('Temperature: ' + response.main.temp + '°F');
        $('#currentHum').text('Humidity: ' + response.main.humidity + ' %');
        $('#currentWind').text('Wind: ' + response.wind.speed + ' mph');

        getUvi(lat, lon);
        getForecast(searchInputVal);

    })
        .catch(function (err) {
            console.error(err);
        });
}

//This function gets the UV index

function getUvi(lat, lon) {
    $.ajax({
        url: ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key),
        method: 'GET',
    }).then(function (response) {
        $('#currentUV').text('UV Index: ' + response.current.uvi);
    })

        .catch(function (err) {
            console.error(err)
        });
}

// This function will get forecast for the next five days 

function getForecast(searchInputVal) {
    $.ajax({
        url: ('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&units=imperial' + '&cnt=5' + '&appid=' + key),
        method: 'GET',
    }).then(function (response) {
        forecast.html(' ');
        for (let i = 0; i < response.list.length; i++) {
            let days = response.list[i].dt;
            let date = moment.unix('').format("MM/DD/YYYY");

            forecast.append(`<div class="col mx-4">
            <div class="card" id="five-day-forecast">
              <div class="card-body">
                <h5 class="card-title" id="future-day">${date}</h5>
                <p class="card-text temp">Temp: ${response.list[i].main.temp}  °F</p>
                <p class="card-text wind">Wind: ${response.list[i].wind.speed} mph</p>
                <p class="card-text humi">Humidity: ${response.list[i].main.humidity} %</p>
              </div>
            </div>
          </div>`)
        }

    }).catch(function (err) {
        console.error(err);
    });
}