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
        .subscribe(result => {
          console.log(result);
          if (result.message == "success") {
            this.updateStatus["message"] = "Logo uploaded Successfully";
            this.updateStatus["active"] = true;
          }
          else if (result.message == "invalid company") {
            this.updateStatus["message"] = "Logo uploaded failed";
            this.updateStatus["active"] = false;
          } else {
            this.updateStatus["message"] = "Logo update failed";
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
    this.companyService.updateCompany(this.formValues)
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
