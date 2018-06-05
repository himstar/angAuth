import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class AuthService {
  url = this.apiUrl.url;
  port = this.apiUrl.port;  
  serverUrl = this.url+':'+this.port;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService
  ) { }

  userRegister(user){
    return this.http.post(this.serverUrl+'/api/user/register', user)
      .map(response => response.json());
  }

  userLogin(user){  
    return this.http.post(this.serverUrl+'/api/user/login', user)
      .map(response => response.json());
  }

  companyRegister(company){
    return this.http.post(this.serverUrl+'/api/company/register', company)
      .map(response => response.json());
  }

  companyLogin(company){
    this.url = this.apiUrl.url;
    this.port = this.apiUrl.port;    
    return this.http.post(this.serverUrl+'/api/company/login', company)
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
  get currentCompany(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token); 
  }  

}
