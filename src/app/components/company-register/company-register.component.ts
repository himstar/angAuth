import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  invalidRegister: boolean;
  company: any;
  unexpectedError: boolean = false;
  registerSuccess: boolean = false;
  existingUser: boolean = false;

  registerForm = new FormGroup({
    webUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.pattern('[a-z0-9._%+-]+\.[a-z]{2,3}$')
    ]),
    personName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });

  get personName() {
    return this.registerForm.get('personName');
  }
  get companyName() {
    return this.registerForm.get('companyName');
  }
  get webUrl() {
    return this.registerForm.get('webUrl');
  }
  get phone() {
    return this.registerForm.get('phone');
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
      this.company = this.registerForm.value;
      this.authService.companyRegister(this.company)
        .subscribe(result => {
          if (result.message == "success") {
              this.registerSuccess = true;
              setTimeout(() =>
                this.router.navigate(['c/login']), 2000
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
      this.company = this.registerForm.value;
    }
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['c/dashboard']);
    }
  }

}
