import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  invalidRegister: boolean;
  user: any;
  unexpectedError: boolean = false;
  registerSuccess: boolean = false;
  existingUser: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onFormSubmit() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.authService.userRegister(this.user)
        .subscribe(result => {
          if (result.message == "success") {
            this.registerSuccess = true;
            setTimeout(() =>
              this.router.navigate(['u/login']), 2000
            );
          }
          else if (result.message == "alreadyRegistered") {
            this.invalidRegister = true;
            this.existingUser = true;
          } else {
            this.invalidRegister = true;
          }
        }, error => {
          this.unexpectedError = true;
        });
    } else {
      this.user = this.registerForm.value;
    }
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['u/dashboard']);
    }
  }

}
