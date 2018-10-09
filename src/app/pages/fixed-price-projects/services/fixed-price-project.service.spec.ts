import { TestBed, inject } from '@angular/core/testing';

import { FixedPriceProjectService } from './fixed-price-project.service';

describe('FixedPriceProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedPriceProjectService]
    });
  });

  it('should be created', inject([FixedPriceProjectService], (service: FixedPriceProjectService) => {
    expect(service).toBeTruthy();
  }));
});
