import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  user: any[];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],),
    password: new FormControl('', [Validators.required])
  });

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

   onFormSubmit() {
    if(this.loginForm.valid) {
        this.user = this.loginForm.value;
        this.authService.login(this.user)
        .subscribe(result => {
          console.log(result.message);
          if ((result.message == "success") && (result.token)){
              localStorage.setItem('token', result.token)
              this.router.navigate(['/']);
          }
          else if(result.message == "Unauthorized Access"){
            this.invalidLogin = true;
            console.log(result);
          } else {
            this.invalidLogin = true;
            console.log(result);
          }
        });
    } else {
      this.user = this.loginForm.value;
      console.log
    }
}

  ngOnInit() {
  }
}
