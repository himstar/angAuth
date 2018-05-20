import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }
  register(user){
    return this.http.post('http://localhost:3200/api/user/register', user)
      .map(response => response.json());
  }

  login(user){
    return this.http.post('http://localhost:3200/api/user/login', user)
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
