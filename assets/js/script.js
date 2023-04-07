var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial'
var forecastListEl = document.getElementById('forecast-list')
function getWeatherData(){
    fetch(requestUrl).
        then(function(response){
            if(response.status === 200){
                return response.json();
            }
        }).then(function (data){
            for(var i = 1; i < data.list.length; i++){
                console.log(data.list[i]);
                var forecastDay = data.list[i]; 
                var forecastDayLi = document.createElement('li');
                var date = document.createElement('p');
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');
                date.innerText = dayjs.unix(forecastDay.dt).format('M/DD/YYYY')
                temp.innerText = forecastDay.temp.day;
                wind.innerText = forecastDay.speed;
                humidity = forecastDay.humidity;
                forecastDayLi.append(date)
                forecastDayLi.append(temp);
                forecastDayLi.append(wind);
                forecastDayLi.append(humidity);

                forecastListEl.append(forecastDayLi);

            }
        });
}

getWeatherData();


