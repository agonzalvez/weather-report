let lat;
let lon;
let searchButton = document.querySelector('#searchBtn');
let searchInput;


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


//Geolocation

//   function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       console.log("cant get coordinates")
//     }
//   }
//   function showPosition(position) {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     console.log(lat, lon)

//   }
//   getLocation();

// One Call API Call

function getWeather() {
    let openWeather = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={7a9e308d5f5da317f65c95353cf68b30}' + searchInput;
    console.log(openWeather)
    $.ajax({
        'url': openWeather,
        'method': 'GET',
        'timeout': 0,
        'headers': {
            'Content-Type': 'application/json',
        }
    })
};


// + '&latitude=' + lat + '&longitude=' + lon