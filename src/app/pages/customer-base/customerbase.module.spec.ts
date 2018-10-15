import { CustomerBaseModule } from './customerbase.module';

describe('CustomerBaseModule', () => {
  let customerbaseModule: CustomerBaseModule;

  beforeEach(() => {
    customerbaseModule = new CustomerBaseModule();
  });

  it('should create an instance', () => {
    expect(customerbaseModule).toBeTruthy();
  });
});
