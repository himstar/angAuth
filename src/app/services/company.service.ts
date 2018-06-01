import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class CompanyService {
  url : any;
  port: Number;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService    
  ) { }
  getCompany(company){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;    
    return this.http.get(this.url+':'+this.port+'/api/company/'+company);
  }
  getCompanyByUrl(webUrl){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;    
    return this.http.get(this.url+':'+this.port+'/api/company/url/'+webUrl);
  }  
  updateCompany(company){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;
    return this.http.post(this.url+':'+this.port+'/api/company/profile/update', company)
      .map(response =>
        response.json()
      );
  }
  updateProfileImage(imageData){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;
    return this.http.post(this.url+':'+this.port+'/api/company/profile/image/update', imageData)
      .map(response =>
        response.json()
      );
  }      
}
