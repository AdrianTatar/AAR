import { TestBed, inject } from '@angular/core/testing';

import { SurchargeCustomersService } from './surcharge-customers.service';

describe('SurchargeCustomersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurchargeCustomersService]
    });
  });

  it('should be created', inject([SurchargeCustomersService], (service: SurchargeCustomersService) => {
    expect(service).toBeTruthy();
  }));
});
