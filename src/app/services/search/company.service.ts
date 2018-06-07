import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ApiUrlService } from '../../config/api-url.service';

@Injectable()
export class CompanyService {
  url = this.apiUrl.url;
  port = this.apiUrl.port;  
  serverUrl = this.url+':'+this.port;
  constructor(
    private http: Http,
    private apiUrl: ApiUrlService
  ) { }

  search(queryString: string){    
    return this.http.get(this.serverUrl+'/api/company/search'+queryString);
  }

}
