import $ from 'jquery';

class WeatherSearch {
  constructor() {
    this.searchBtn = $(".search-btn");
    this.events();        
  }
 
  events() {
    this.searchBtn.click(this.ajaxRequest.bind(this));
    
    $(document).keyup(this.keyPressHandler.bind(this));
  }
  
   keyPressHandler(enter) {
    if (enter.keyCode == 13) {
      this.ajaxRequest();
    }
  }
  
  ajaxRequest() {
    const city = $("#city").val();
    if(city !=''){
      $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=323bd50f1b78d02b6251c431f0a710d8`,
        datatype: "jsonp",
        success: data => {
          const display = this.dataDisplay(data);          
            $(".show").html(display);
            $("#city").val('');
          }   
      });
    }else{
      alert("City Name field is empty");
    }
  } 
  
  dataDisplay(data) {
    return `<h3 class = 'list__title'>Weather for ${data.name}, ${data.sys.country}</h3>
    <ul class = 'list list__content'>
    <li><span>Weather:</span> ${data.weather[0].main}</li> 
    <li><span>Description:</span> <img class='list--img' src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'> ${data.weather[0].description}</li> 
    <li><span>Temperature:</span> ${data.main.temp}&deg;C</li> 
    <li><span>Pressure:</span> ${data.main.pressure} hPa</li> 
    <li><span>Humidity:</span> ${data.main.humidity}%</li> 
    <li><span>Min Temp:</span> ${data.main.temp_min}&deg;C</li>  
    <li><span>Max Temp:</span> ${data.main.temp_max}&deg;C</li> 
    <li><span>Wind speed:</span> ${data.wind.speed} m/s</li> 
    <li><span>Wind speed:</span> ${data.wind.deg}&deg;</li>   
    </ul>
    `
  }
  
}

export default WeatherSearch;