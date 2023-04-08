
//Initialize these variable on load
var forecastListEl = document.getElementById("forecast-list");
var cityEl = document.getElementById("city");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchButtonEl = $("#search-btn");
var searchBoxEl = $("#search-box");
var historyEl = $("#history");
var searchHistory = [];



function getWeatherData(cName){
    //format the api call to include the city name when passed in the functoin
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=${cName}&cnt=6&units=imperial`).
        then(function(response){
            //
            if(response.status === 200){
                searchHistory.push(cName);
                localStorage.setItem("history", JSON.stringify(searchHistory));
                updateSearchHistory();
                return response.json();
            }
            else{
                console.log("Error: " + response.status);
                return;
            }
        }).then(function (data){
            //Format the main div
            var currentDay = data.list[0];
            cityEl.innerText = `${cName} (${dayjs.unix(currentDay.dt).format('M/DD/YYYY')})`;
            tempEl.innerText = 'Temp: ' + currentDay.temp.day + ' °F';
            windEl.innerText = 'Wind: ' + currentDay.speed + ' MPH';
            humidityEl.innerText = 'Humidity: ' + currentDay.humidity + '%';
            //For loop that goes over the next 5 days 
            for(var i = 1; i < data.list.length; i++){
                console.log(data.list[i]);

                //Variable that holds current forecast day data
                var forecastDay = data.list[i]; 

                //Create Li and corresponding elements
                var forecastDayLi = document.createElement('li');
                var date = document.createElement('p');
                var weatherImg = document.createElement('img');
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');

                //Assign the values of each element in li
                date.innerText = dayjs.unix(forecastDay.dt).format('M/DD/YYYY');
                weatherImg.src = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`
                temp.innerText = 'Temp: ' + forecastDay.temp.day + ' °F';
                wind.innerText = 'Wind: ' + forecastDay.speed + ' MPH';
                humidity = 'Humidity: ' + forecastDay.humidity + '%';

                //Classes for the li and inner attributes
                forecastDayLi.classList.add('d-inline', 'border' ,'border-black' ,'bg-dark' ,'text-light', 'p-3');
                date.classList.add('fw-bold');
                //Append each attribute of the forecast to the forecast li
                forecastDayLi.append(date);
                forecastDayLi.append(weatherImg);
                forecastDayLi.append(temp);
                forecastDayLi.append(wind);
                forecastDayLi.append(humidity);
                //Append to forecast li to forecast-list
                forecastListEl.append(forecastDayLi);

            }
        });
}

function updateSearchHistory(){
    historyEl.children().remove();
    if(localStorage.getItem("history")){
        searchHistory = JSON.parse(localStorage.getItem("history"));
        searchHistory.forEach(search => {
            // <li class="btn btn-secondary">San Diego</li> History Button example
            var newBtn = $("<li>").text(search).addClass("btn btn-secondary my-1");
            newBtn.on("click", function(){
                getWeatherData(search);
            })
            historyEl.prepend(newBtn);
        });
    }
    else{
        console.log("No search history found!")
    }
}

//Event listener to that takes in the valune in the search box and passes it in getWeather data. 
searchButtonEl.on("click", function(){
    getWeatherData(searchBoxEl.val());
    console.log(searchHistory)
})

updateSearchHistory();
