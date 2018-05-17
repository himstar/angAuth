import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  register(user){
    return this.http.post('http://159.65.151.126:3200/api/user/register', user)
      .map(response => response.json());
  }

  login(user){
    return this.http.post('http://159.65.151.126:3200/api/user/login', user)
      .map(response => response.json());
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return tokenNotExpired();
  }

}
