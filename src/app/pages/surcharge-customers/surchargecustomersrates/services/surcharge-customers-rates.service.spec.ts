import { TestBed, inject } from '@angular/core/testing';

import { SurchargeCustomersRateService } from './surcharge-customers-rates.service';

describe('SurchargeCustomersRatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurchargeCustomersRateService]
    });
  });

  it('should be created', inject([SurchargeCustomersRateService], (service: SurchargeCustomersRateService) => {
    expect(service).toBeTruthy();
  }));
});
