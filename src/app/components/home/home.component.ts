import { Component, OnInit } from '@angular/core';
import { CompanySearchService } from '../../services/search/company-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  results;

  constructor(
    private companySearch: CompanySearchService
  ) { }

  searchCompany(queryString) {
    if(this.results == undefined){
      this.companySearch.search()
      .subscribe(
        data => {
          this.results = data.json();
          localStorage.setItem('companyData', JSON.stringify(this.results));
        }
      );
    } else {
      this.results = JSON.parse(localStorage.getItem('companyData'));
    }
  }

  ngOnInit() {

  }

}
