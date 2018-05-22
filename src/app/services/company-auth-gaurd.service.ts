import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CompanyAuthGaurdService implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(){
    if(this.authService.currentCompany.activePlan == 0){
      return true;
    } else {
      this.router.navigate(['/no-access']);
      return false;
    }
  }
}
