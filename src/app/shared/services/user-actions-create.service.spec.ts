import { TestBed, inject } from '@angular/core/testing';

import { UserActionsCreateService } from './user-actions-create.service';

describe('UserActionsCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActionsCreateService]
    });
  });

  it('should be created', inject([UserActionsCreateService], (service: UserActionsCreateService) => {
    expect(service).toBeTruthy();
  }));
});
