import { CustomerInfoRoutingModule } from './customer-info-routing.module';

describe('CbRoutingModule', () => {
  let customerInfoRoutingModule: CustomerInfoRoutingModule;

  beforeEach(() => {
    customerInfoRoutingModule = new CustomerInfoRoutingModule();
  });

  it('should create an instance', () => {
    expect(customerInfoRoutingModule).toBeTruthy();
  });
});
