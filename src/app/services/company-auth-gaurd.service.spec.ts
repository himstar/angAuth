import { TestBed, inject } from '@angular/core/testing';

import { CompanyAuthGaurdService } from './company-auth-gaurd.service';

describe('CompanyAuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyAuthGaurdService]
    });
  });

  it('should be created', inject([CompanyAuthGaurdService], (service: CompanyAuthGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
