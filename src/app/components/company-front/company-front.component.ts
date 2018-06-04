import { Component, OnInit,  Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-front',
  templateUrl: './company-front.component.html',
  styleUrls: ['./company-front.component.css']
})
export class CompanyFrontComponent implements OnInit {

  results: Object[];
  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private companyService: CompanyService
  ) {}

  @Input()
  count: number = 0;  

  ngOnInit() {
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
}
