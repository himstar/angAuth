import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class UserAuthGaurdService implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(){
    if(this.authService.currentUser.userLevel == 0){
      return true;
    } else {
      this.router.navigate(['/no-access']);
      return false;
    }
  }

}
