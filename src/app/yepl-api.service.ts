import { Injectable } from '@angular/core';
import { yelpToken } from './api-keys';
// import { Http } from '@angular/http';

import { HttpClientService } from './http-client.service';

@Injectable()
export class YeplApiService {

  constructor(private http: HttpClientService) { }

  getRestaurants(term: string, location: string){
      return this.http.get("https://api.yelp.com/v3/businesses/search?term=restaurant&location=Portland").subscribe(response =>{
        console.log(response.json());
      })
  }

}
