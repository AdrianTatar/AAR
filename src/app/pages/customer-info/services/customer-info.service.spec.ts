import { CustomerInfoService } from './customer-info.service';
import { TestBed, inject } from '@angular/core/testing';

describe('CustomerInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerInfoService]
    });
  });

  it('should be created', inject([CustomerInfoService], (service: CustomerInfoService) => {
    expect(service).toBeTruthy();
  }));
});
