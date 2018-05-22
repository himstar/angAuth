import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  company: any;
  results: Object[];

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) { }

  companyDetails(){
    this.company = this.authService.currentCompany._id;
    this.companyService.getCompany(this.company)
      .subscribe(
        data => {
          this.results = data.json();
        }
      );    
  }
  ngOnInit() {
    this.companyDetails();
  }

}
