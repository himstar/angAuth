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
  updateStatus: Object = { active: null, message: null, css: null };
  userImageData: String;
  imgSize: Number;
  imgType: String;
  userId: any = this.authService.currentUser._id;

  private base64textString: String = "";

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
  imageUpload(event) {
    this.userImageData = event.src;
    this.imgSize = event.file.size;
    this.imgType = event.file.type;
  }
  profileImageUpate() {
    if (this.imgSize > 204800) {
      this.updateStatus["message"] = "Please select an image less tha 200 KB";
      this.updateStatus["active"] = false;
    } else if (this.imgType == 'image/jpeg' || this.imgType == 'image/png') {
      this.userService.updateProfileImage({ userId: this.userId, profile_image: this.userImageData })
        .subscribe(result => {
          if (result.message == "success") {
            this.updateStatus["message"] = "Profile image uploaded Successfully";
            this.updateStatus["active"] = true;
          }
          else if (result.message == "invalid user") {
            this.updateStatus["message"] = "Profile image uploaded failed";
            this.updateStatus["active"] = false;
          } else {
            this.updateStatus["message"] = "Profile image uploaded failed";
            this.updateStatus["active"] = false;
          }
        }, error => {
          this.updateStatus["message"] = "Server Error";
          this.updateStatus["active"] = false;
        });
    } else {
      this.updateStatus["message"] = "Please select an valid image type .jpg or .png";
      this.updateStatus["active"] = false;
    }
  }
  updateFormSubmit() {
    this.formValues = this.updateForm.value;
    this.userService.updateUser(this.formValues)
      .subscribe(result => {
        if (result.message == "success") {
          this.updateStatus["message"] = "Profile updated successfully";
          this.updateStatus["active"] = true;
        }
        else if (result.message == "invalid password") {
          this.updateStatus["message"] = "Invalid Password";
          this.updateStatus["active"] = false;          
        } else {
          this.updateStatus["message"] = "Profile update failed";
          this.updateStatus["active"] = false;
        }
      }, error => {
        this.updateStatus["message"] = "Server Error";
        this.updateStatus["active"] = false;
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
