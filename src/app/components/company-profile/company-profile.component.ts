import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  formValues: any;
  companyData: any;
  updateForm: FormGroup;
  updateStatus: Object = { active: null, message: null, css: null };
  companyImageData: String;
  imgSize: Number;
  imgType: String;
  companyId: any = this.authService.currentCompany._id;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService
  ) { }

  companyDetails() {
    this.companyService.getCompany(this.companyId)
      .subscribe(
        data => {
          this.companyData = data.json();
        }
      );
  }
  imageUpload(event) {
    this.companyImageData = event.src;
    this.imgSize = event.file.size;
    this.imgType = event.file.type;
  }
  profileImageUpate() {
    if (this.imgSize > 204800) {
      this.updateStatus["message"] = "Please select an image less tha 200 KB";
      this.updateStatus["active"] = false;
    } else if (this.imgType == 'image/jpeg' || this.imgType == 'image/png') {
      this.companyService.updateProfileImage({ companyId: this.companyId, logo: this.companyImageData })
        .subscribe(response => {
          let result = response.json();
          if (result.message == "success") {
            this.messageReturn("Logo uploaded Successfully", true);
          }
          else if (result.message == "invalid company") {
            this.messageReturn("Logo update failed", false);
          } else {
            this.messageReturn("Logo update failed", false);
          }
        }, error => {
          this.messageReturn("Server Error", false);
        });
    } else {
      this.messageReturn("Please select an valid image type .jpg or .png", false);
    }
  }

  messageReturn(message, status){
    this.updateStatus["message"] = message;
    this.updateStatus["active"] = status;   
  }

  updateFormSubmit() {
    this.formValues = this.updateForm.value;
    this.companyService.updateCompany(this.formValues)
      .subscribe(response => {
        let result = response.json();
        if (result.message == "success") {
          this.messageReturn("Profile updated successfully", true);
        }
        else if (result.message == "invalid password") {
          this.messageReturn("Invalid Password", false);
        } else {
          this.messageReturn("Profile update failed", false);
        }
      }, error => {
        this.messageReturn("Server Error", false);
      });
  }

  ngOnInit() {
    this.companyDetails();
    this.updateForm = new FormGroup({
      'companyId': new FormControl(this.companyId),
      'personName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'webUrl': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      'companyName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'email': new FormControl(null),
      'facebook': new FormControl(null),
      'googlePlus': new FormControl(null),
      'twitter': new FormControl(null),
      'linkedin': new FormControl(null),
      'description': new FormControl(null),
      'phone': new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      'country': new FormControl(null),
      'category': new FormControl(null),
      'password': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }
}
