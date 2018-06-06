import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class CompanyService {
  url = this.apiUrl.url;
  port = this.apiUrl.port;  
  serverUrl = this.url+':'+this.port;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService    
  ) { }
  getCompany(company){ 
    return this.http.get(this.serverUrl+'/api/company/'+company);
  }
  getCompanyByUrl(webUrl){    
    return this.http.get(this.serverUrl+'/api/company/url/'+webUrl);
  }  
  updateCompany(company){
    return this.http.post(this.serverUrl+'/api/company/profile/update', company);
  }
  updateProfileImage(imageData){
    return this.http.post(this.serverUrl+'/api/company/profile/image/update', imageData);
  }
  assignReview(reviewId){
    return this.http.post(this.serverUrl+'/api/company/profile/review/add', reviewId);
  }         
}
