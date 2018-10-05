import { FppRoutingModule } from './fpp-routing.module';

describe('FppRoutingModule', () => {
  let fppRoutingModule: FppRoutingModule;

  beforeEach(() => {
    fppRoutingModule = new FppRoutingModule();
  });

  it('should create an instance', () => {
    expect(fppRoutingModule).toBeTruthy();
  });
});
