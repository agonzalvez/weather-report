let lat;
let lon;
let key = "7a9e308d5f5da317f65c95353cf68b30"
let searchButton = document.querySelector('#searchBtn');
let searchInput = document.querySelector('.form-control');
let searchHistory = document.querySelector('#search-history');

// Search bar function + local storage
function handleSearchFormSubmit(event) {
    event.preventDefault();
    searchInputVal = document.querySelector('.form-control').value;
    console.log(searchInputVal)

    if (!searchInputVal) {
        console.error('You need to enter a city!');
        return;
    }else {    
        localStorage.setItem("City", searchInputVal);
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
        console.log(response);
        console.log(response.name);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        $('#selectedCity').text(response.name);
        $('#currentTemp').text('Temperature: ' + response.main.temp + '°F');
        $('#currentHum').text('Humidity: ' + response.main.humidity + ' %');
        $('#currentWind').text('Wind: ' + response.wind.speed + ' mph');
        // $('#currentUV').text('UV Index: ' + response.current.uvi);
    })
        .catch(function (err) {
            console.error(err);
        });
}


// Local Storage

// function renderLastSearch() {
// searchInputVal = document.querySelector('.form-control').value;
// localStorage.getItem("City");
//   searchHistory.li.appendChild = searchInputVal
//   }

