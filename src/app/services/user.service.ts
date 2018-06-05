import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { ApiUrlService } from '../config/api-url.service';

@Injectable()
export class UserService {
  url = this.apiUrl.url;
  port = this.apiUrl.port;
  serverUrl = this.url+':'+this.port;
  constructor(
    private http: Http,
    private router: Router,
    private apiUrl: ApiUrlService
  ) { }
  getUser(user){    
    return this.http.get(this.serverUrl+'/api/user/'+user);
  }
  updateUser(user){
    return this.http.post(this.serverUrl+'/api/user/profile/update', user)
      .map(response =>
        response.json()
      );
  }
  updateProfileImage(imageData){
    return this.http.post(this.serverUrl+'/api/user/profile/image/update', imageData)
      .map(response =>
        response.json()
      );
  }  
}
