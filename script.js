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
    let openWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + key;
    console.log(openWeather)
    $.ajax({
        'url': openWeather,
        'method': 'GET',
    }).then(function (response) {
        console.log(response);
      })
      .catch(function(err) {
          console.error(err);
      });
     }