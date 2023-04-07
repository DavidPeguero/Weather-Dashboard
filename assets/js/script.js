var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial'
var forecastListEl = document.getElementById('forecast-list')
function getWeatherData(){
    fetch(requestUrl).
        then(function(response){
            if(response.status === 200){
                return response.json();
            }
        }).then(function (data){

            //For loop that goes over the next 5 days 
            for(var i = 1; i < data.list.length; i++){
                console.log(data.list[i]);

                //Variable that holds current forecast day data
                var forecastDay = data.list[i]; 

                //Create Li and corresponding elements
                var forecastDayLi = document.createElement('li');
                var date = document.createElement('p');
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');

                //Assign the values of each element in li
                date.innerText = dayjs.unix(forecastDay.dt).format('M/DD/YYYY')
                temp.innerText = forecastDay.temp.day;
                wind.innerText = forecastDay.speed;
                humidity = forecastDay.humidity;

                //Append each attribute of the forecast to the forecast li
                forecastDayLi.append(date)
                forecastDayLi.append(temp);
                forecastDayLi.append(wind);
                forecastDayLi.append(humidity);
                //Append to forecast li to forecast-list
                forecastListEl.append(forecastDayLi);

            }
        });
}

getWeatherData();


