import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGaurdService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    else {
      this.router.navigate(['u/login']);
        return false;
    }
  }


}
