import { Injectable } from '@angular/core';
import { weatherKey } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

  getCurrentWeather() {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?zip=97204&appid=" + weatherKey)
  }
}
