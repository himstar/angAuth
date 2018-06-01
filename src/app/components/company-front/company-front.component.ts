import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-front',
  templateUrl: './company-front.component.html',
  styleUrls: ['./company-front.component.css']
})
export class CompanyFrontComponent implements OnInit {

  constructor(
     private route: ActivatedRoute,
     private companyServices: CompanyService
  ) {}

  ngOnInit() {
    this.route.paramMap
    .subscribe(paramas =>{
      console.log(paramas);
    });
  }
}
