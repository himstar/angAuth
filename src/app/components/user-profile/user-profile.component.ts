import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  userData: any;
  updateSuccess: boolean = false;
  updateError: boolean = false;
  currentUser: any = this.authService.currentUser._id;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  updateUserForm = new FormGroup({
    userId: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    phone: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
    gender: new FormControl(''),
    country: new FormControl(''),
    password: new FormControl('', [Validators.required])
  });

  updateFormSubmit() {
    if (this.updateUserForm.valid) {
      this.user = this.updateUserForm.value;
      this.userService.updateUser(this.user)
        .subscribe(result => {
          if (result.message == "success") {
            this.updateSuccess = true;
          }
          else if (result.message == "alreadyRegistered") {
            this.updateSuccess = true;
            this.updateError = true;
          } else {
            this.updateError = true;
          }
        }, error => {
          this.updateError = true;
        });
    } else {
      this.user = this.updateUserForm.value;
    }
  }

  userDetails() {
    this.user = this.authService.currentUser._id;
    this.userService.getUser(this.user)
      .subscribe(
        data => {
          this.userData = data.json();
        }
      );
  }

  ngOnInit() {
    this.userDetails();
  }
}
