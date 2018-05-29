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
  updateSuccess: boolean = false;
  updateError: boolean = false;
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

  updateFormSubmit() {
    this.formValues = this.updateForm.value;
    this.companyService.updateCompany(this.formValues)
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
      'password': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

}
