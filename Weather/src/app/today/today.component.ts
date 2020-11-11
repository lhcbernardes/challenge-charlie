import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
lat;
lon;
weather;
img;
temp;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
    this.getBackground();
  }

  getLocation(){
    if ('geolocation' in navigator){
      navigator.geolocation.watchPosition((sucess) => {
        this.lat = sucess.coords.latitude;
        this.lon = sucess.coords.longitude;

        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      });
    }
  }

  getCity(city){
      this.weatherService.getWeatherByCity(city).subscribe(data => {
      this.weather = data;
    });
  }

   getBackground(){
    this.weatherService.getImageBing().subscribe(data => {
      this.img = data;
    });
  }

  getStyle(darkness = 0 ) {
    var resultado = '';
    darkness *= 10;
    if(this.weather.cod === 200){
      return resultado = 'rgba(0, 0, 0, 0.445)';
    } else if (this.weather.list[0].temp.day <= 15){
      resultado = 'rgba(0, '+(255-darkness)+', '+(255-darkness)+', 0.8)';
      return resultado;

    } else if (this.weather.list[0].temp.day >= 35){
      resultado = 'rgba(0, '+(255-darkness)+'​​, '+(60-darkness)+', 0.5)';
      return resultado;

    }else if (this.weather.list[0].temp.day > 15 && this.weather.list[0].temp.day < 35){
      resultado = 'rgba('+(255-darkness)+', '+(208-darkness)+', 0, 0.8)' ;
      return resultado;
    }
  }
}
