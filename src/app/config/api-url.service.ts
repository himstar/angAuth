import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {
  url: any = 'http://localhost';
  port: Number = 3200;
  constructor() { }

}
