import { CustomerInfoModule } from './customer-info.module';

describe('CustomerInfoModule', () => {
  let customerInfoModule: CustomerInfoModule;

  beforeEach(() => {
    customerInfoModule = new CustomerInfoModule();
  });

  it('should create an instance', () => {
    expect(customerInfoModule).toBeTruthy();
  });
});
