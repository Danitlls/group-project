import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass'],
  providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
  temp;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getCurrentWeather().subscribe(response => {
      this.temp = Math.floor((1.8 * (response.json().main.temp - 273)) + 32);
    });
  }


}
