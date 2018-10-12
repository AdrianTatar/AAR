import { TestBed, inject } from '@angular/core/testing';

import { ZahlerknotenService } from './zahlerknoten.service';

describe('ZahlerknotenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZahlerknotenService]
    });
  });

  it('should be created', inject([ZahlerknotenService], (service: ZahlerknotenService) => {
    expect(service).toBeTruthy();
  }));
});
