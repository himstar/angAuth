import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class ReviewService {
  url = this.apiUrl.url;
  port = this.apiUrl.port;  
  serverUrl = this.url+':'+this.port;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService       
  ) { }
  addReview(reviewData){
    return this.http.post(this.serverUrl+'/api/review/add', reviewData);
  }    
}
