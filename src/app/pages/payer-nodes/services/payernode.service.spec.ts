import { PayerNodeService } from './payernode.service';
import { TestBed, inject } from '@angular/core/testing';

describe('ZahlerknotenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayerNodeService]
    });
  });

  it('should be created', inject([PayerNodeService], (service: PayerNodeService) => {
    expect(service).toBeTruthy();
  }));
});
