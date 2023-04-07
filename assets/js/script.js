var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial'

function getWeatherData(){
    fetch(requestUrl).
        then(function(response){
            if(response.status === 200){
                return response.json();
            }
        }).then(function (data){
            for(var i = 1; i < data.list.length; i++){
                console.log(data.list[i]);
            }
        });
}

getWeatherData();


