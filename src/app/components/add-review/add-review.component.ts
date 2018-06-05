import { Component, OnInit } from '@angular/core';
import { MiddlewareService } from '../../services/middleware.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  userSelectedUrl: String;
  currentCompanyId: String;
  reviewData: any;
  currentUser = this.authService.currentUser['_id'];
  updateStatus: Object = { active: null, message: null, css: null };

  constructor(
    private middleWareService: MiddlewareService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) { }

  messageReturn(message, status){
    this.updateStatus["message"] = message;
    this.updateStatus["active"] = status;   
  }

  addReview(){    
    this.reviewService.addReview(this.reviewData)
    .subscribe(response => {
      let result = response.json();
      if (result.message == "success") {
        this.messageReturn("Review added successfully", true);
        console.log('review added');
      } else {
        this.messageReturn("Something Went wrong", false);
      }
    }, error => {
      this.messageReturn("Server Error", false);
      console.log(error);
    });     
  }

  ngOnInit() {
    this.userSelectedUrl = this.middleWareService.reviewUrl;
    this.currentCompanyId = this.middleWareService.currentUrlId;
    if(this.userSelectedUrl == "undefined"){
      this.userSelectedUrl == " ";
    } else {
      this.reviewData = {
        rating: '3',
        reviewText: "This is a nice website",
        userId: this.currentUser,
        companyId: this.currentCompanyId
      };       
    }
  }

}
