import { UserActionsModule } from './user-actions.module';

describe('UserActionsModule', () => {
  let userActionsModule: UserActionsModule;

  beforeEach(() => {
    userActionsModule = new UserActionsModule();
  });

  it('should create an instance', () => {
    expect(userActionsModule).toBeTruthy();
  });
});
