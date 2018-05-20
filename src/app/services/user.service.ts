import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private router: Router
  ) { }
  getUser(user){
    return this.http.get('http://localhost:3200/api/user/'+user);
  }
}
