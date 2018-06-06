import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { MiddlewareService } from '../../services/middleware.service';

@Component({
  selector: 'app-company-front',
  templateUrl: './company-front.component.html',
  styleUrls: ['./company-front.component.css']
})
export class CompanyFrontComponent implements OnInit {

  results: any;
  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private companyService: CompanyService,
     private middleWareService: MiddlewareService
  ) {}

  addReview(){
    this.middleWareService.reviewUrl = this.results[0].webUrl;
    this.middleWareService.currentUrlId = this.results[0]._id;
    this.middleWareService.currentCompanyName = this.results[0].companyName;
    this.router.navigate(['/company/add-review/'+this.results[0].webUrl]);
  }
  getCompanyDetails(){
    this.route.paramMap
    .subscribe(paramas =>{
      var companyUrl = paramas['params'].webUrl;
      this.companyService.getCompanyByUrl(companyUrl)
      .subscribe(
        data => {
          this.results = data.json();
          if(this.results.length == 0){
            this.router.navigate(['company-not-found']);
          }
        }
      );  
    });  
  }  
  ngOnInit() {
    this.getCompanyDetails();
  }
}
