import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  register(user){
    return this.http.post('http://localhost:3200/api/user/add', user)
      .map(response => response.json());
  }

  login(user){
    return this.http.post('http://localhost:3200/api/user/login', user)
      .map(response => response.json());
  }

}
