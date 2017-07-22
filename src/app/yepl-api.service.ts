import { Injectable } from '@angular/core';
import { yelpToken } from './api-keys';
// import { Http } from '@angular/http';

import { HttpClientService } from './http-client.service';

@Injectable()
export class YeplApiService {

  constructor(private http: HttpClientService) { }

}
