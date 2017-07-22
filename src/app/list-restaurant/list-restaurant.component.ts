import { Component, OnInit } from '@angular/core';
import { YeplApiService } from '../yepl-api.service';
// import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.sass'],
  providers: [YeplApiService]
})

export class ListRestaurantComponent implements OnInit {
  term: string = "restaurant";
  location: string = "Portland";

  constructor(private yelpApiService: YeplApiService) { }

  ngOnInit() {
  }

  getRestaurantsFromAPI(term, location){
    this.yelpApiService.getRestaurants(term, location);
  }

}
