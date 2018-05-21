import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class AuthService {
  url : any;
  port: Number;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService
  ) { }
  register(user){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;
    return this.http.post(this.url+':'+this.port+'/api/user/register', user)
      .map(response => response.json());
  }

  login(user){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;    
    return this.http.post(this.url+':'+this.port+'/api/user/login', user)
      .map(response => response.json());
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  isLoggedIn(){
    return tokenNotExpired();
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token); 
  }

}
