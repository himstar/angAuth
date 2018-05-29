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
  formValues: any;
  userData: any;
  updateForm: FormGroup;
  updateSuccess: boolean = false;
  updateError: boolean = false;
  userId: any = this.authService.currentUser._id;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  userDetails() {
    this.userService.getUser(this.userId)
      .subscribe(
        data => {
          this.userData = data.json();
        }
      );
  }

  updateFormSubmit() {
    this.formValues = this.updateForm.value;
    this.userService.updateUser(this.formValues)
      .subscribe(result => {
        if (result.message == "success") {
          this.updateSuccess = true;
          this.updateError = false;
        }
        else if (result.message == "invalid password") {
          this.updateSuccess = false;
          this.updateError = true;
        } else {
          this.updateError = true;
        }
      }, error => {
        this.updateError = true;
      });
  }  

  ngOnInit() {
    this.userDetails();
    this.updateForm = new FormGroup({
      'userId': new FormControl(this.userId),
      'name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null),
      'phone': new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      'gender': new FormControl(null),
      'country': new FormControl(null),
      'password': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }
}
