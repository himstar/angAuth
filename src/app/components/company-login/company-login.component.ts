import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  invalidLogin: boolean;
  company: any;
  unexpectedError: boolean = false;
  loginSuccess: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required])
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onFormSubmit() {
    if (this.loginForm.valid) {
      this.company = this.loginForm.value;
      this.authService.companyLogin(this.company)
        .subscribe(result => {
          if ((result.message == "success") && (result.token)) {
            localStorage.setItem('token', result.token)
            this.loginSuccess = true;
            setTimeout(() =>
              this.router.navigate(['c/dashboard']), 2000
            );
          }
          else if (result.message == "Unauthorized Access") {
            this.invalidLogin = true;
          } else {
            this.invalidLogin = true;
            console.log(result);
          }
        }, error=>{
          this.unexpectedError = true;
        });
    } else {
      this.company = this.loginForm.value;
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['c/dashboard']);
    }
  }

}
