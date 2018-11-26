import { TestBed, inject } from '@angular/core/testing';

import { ExportActionsService } from './export-actions.service';

describe('ExportActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportActionsService]
    });
  });

  it('should be created', inject([ExportActionsService], (service: ExportActionsService) => {
    expect(service).toBeTruthy();
  }));
});
