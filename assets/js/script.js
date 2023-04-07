
//Initialize these variable on load
var forecastListEl = document.getElementById('forecast-list');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp')
var windEl = document.getElementById('wind')
var humidityEl = document.getElementById('humidity')
var cityName = "Dallas"


function getWeatherData(cName){
    //format the api call to include the city name when passed in the functoin
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=${cName}&cnt=6&units=imperial`).
        then(function(response){
            //
            if(response.status === 200){
                return response.json();
            }
            else{
                console.log("Error: " + response.status);
                return;
            }
        }).then(function (data){
            var currentDay = data.list[0];
            cityEl.innerText = `${cityName} (${dayjs.unix(currentDay.dt).format('M/DD/YYYY')})`;
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

getWeatherData("Seattle");


