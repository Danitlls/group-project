import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { yelpToken } from './api-keys';

@Injectable()
export class HttpClientService {

  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + yelpToken);
    }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
}
