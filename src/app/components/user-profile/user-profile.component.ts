import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  userName: any = this.authService.currentUser.name;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.updateUserForm();
  }

  userDetails() {
    this.userService.getUser(this.userId)
      .subscribe(
        data => {
          this.userData = data.json();
        }
      );
  }
  updateUserForm() {
    this.updateForm = this.fb.group({
      userId: this.userId,
      name: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      phone: ['', Validators.minLength(3), Validators.maxLength(15)],
      gender: '',
      country: '',
      password: '',
    });
  }
  updateFormSubmit() {
    this.formValues = this.updateForm.value;
    console.log(this.formValues);
    this.userService.updateUser(this.formValues)
      .subscribe(result => {
        console.log(result);
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
  }
}
