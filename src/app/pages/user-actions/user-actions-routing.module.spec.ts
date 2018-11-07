import { UserActionsRoutingModule } from './user-actions-routing.module';

describe('UserActionsRoutingModule', () => {
  let userActionsRoutingModule: UserActionsRoutingModule;

  beforeEach(() => {
    userActionsRoutingModule = new UserActionsRoutingModule();
  });

  it('should create an instance', () => {
    expect(userActionsRoutingModule).toBeTruthy();
  });
});
