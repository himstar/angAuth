import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class UserService {
  url : any;
  port: Number;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService
  ) { }
  getUser(user){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;    
    return this.http.get(this.url+':'+this.port+'/api/user/'+user);
  }
}
