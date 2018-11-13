import { ExpRoutingModule } from './export-routing.module';

describe('ExpRoutingModule', () => {
  let expRoutingModule: ExpRoutingModule;

  beforeEach(() => {
    expRoutingModule = new ExpRoutingModule();
  });

  it('should create an instance', () => {
    expect(expRoutingModule).toBeTruthy();
  });
});
