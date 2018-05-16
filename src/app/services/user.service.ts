import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  register(user){
    return this.http.post('http://159.65.151.126/api/user/add', user)
      .map(res => res.json());
  }

  login(user){
    return this.http.post('http://159.65.151.126/api/user/login', user)
      .map(res => res.json());
  }
}
