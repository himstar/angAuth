import { TestBed, inject } from '@angular/core/testing';

import { UserAuthGaurdService } from './user-auth-gaurd.service';

describe('UserAuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthGaurdService]
    });
  });

  it('should be created', inject([UserAuthGaurdService], (service: UserAuthGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
