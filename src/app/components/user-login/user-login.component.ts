import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  invalidLogin: boolean;
  user: any;
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
      this.user = this.loginForm.value;
      this.authService.userLogin(this.user)
        .subscribe(result => {
          if ((result.message == "success") && (result.token)) {
            localStorage.setItem('token', result.token);
            this.loginSuccess = true;
            setTimeout(() =>
              this.router.navigate(['u/dashboard']), 2000
            );
          }
          else if (result.message == "invalidPassword") {
            this.invalidLogin = true;
          } else {
            this.invalidLogin = true;
          }
        }, error => {
          this.unexpectedError = true;
        });
    } else {
      this.user = this.loginForm.value;
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['u/dashboard']);
    }
  }
}
