import { Component, OnInit } from '@angular/core';
import { MiddlewareService } from '../../services/middleware.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  formValues: any;
  results: any;
  companyVerified: Boolean;
  userSelectedUrl: String;
  currentCompanyId: String;
  currentCompanyName: String;
  currentUser = this.authService.currentUser['_id'];
  updateStatus: Object = { active: null, message: null, css: null };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private middleWareService: MiddlewareService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private companyService: CompanyService,
    private userService: UserService
  ) { }
  messageReturn(message, status) {
    this.updateStatus["message"] = message;
    this.updateStatus["active"] = status;
  }
  reviewData = new FormGroup({
    'companyId': new FormControl(this.currentCompanyId),
    'userId': new FormControl(this.currentUser),
    'reviewText': new FormControl('', [Validators.minLength(12), Validators.maxLength(455)]),
    'reviewTitle': new FormControl('', [Validators.minLength(12), Validators.maxLength(455)]),
    'rating': new FormControl('', [Validators.required])
  });  
  addReview() {
    this.formValues = this.reviewData.value;
    console.log(this.formValues);
    if (this.companyVerified == true) {
      this.reviewService.addReview(this.formValues)
        .subscribe(response => {
          let result = response.json();
          console.log(result);
          if (result.message == "success") {
            this.messageReturn("Review added successfully", true);
            let companyReviewData = {
              companyId: this.currentCompanyId,
              reviewId: result['0']._id
            }
            this.companyService.assignReview(companyReviewData)
              .subscribe(companyReviewResponse => {
                companyReviewResponse = companyReviewResponse.json();
              });
            let userReviewData = {
              userId: this.currentUser,
              reviewId: result['0']._id
            }
            this.userService.assignReview(userReviewData)
              .subscribe(companyReviewResponse => {
                companyReviewResponse = companyReviewResponse.json();
              });
          } else {
            this.messageReturn("Something Went wrong", false);
          }
        }, error => {
          this.messageReturn("Server Error", false);
          console.log(error);
        });
    }
  }
  verifyCompany() {
    this.route.paramMap
      .subscribe(paramas => {
        var companyUrl = paramas['params'].webUrl;
        if (this.userSelectedUrl == companyUrl) {
          this.companyVerified = true;
        } else {
          this.companyService.getCompanyByUrl(companyUrl)
            .subscribe(
              data => {
                this.results = data.json();
                if (this.results.length == 0) {
                  this.router.navigate(['company-not-found']);
                } else {
                  this.currentCompanyName = this.results['0'].companyName;
                  this.currentCompanyId = this.results['0']._id;
                  console.log(this.currentCompanyId);
                  this.companyVerified = true;
                }
              }
            );
        }
      });
  }
  ngOnInit() {
    this.userSelectedUrl = this.middleWareService.reviewUrl;
    this.currentCompanyId = this.middleWareService.currentUrlId;
    this.currentCompanyName = this.middleWareService.currentCompanyName;
    this.verifyCompany();        
  }

}
